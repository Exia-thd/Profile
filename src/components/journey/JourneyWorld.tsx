import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { terrainHeight } from './noise';
import { buildProps, type PropsHandle } from './journeyProps';
import { ATMOSPHERE, PACE, type AtmosphereKey } from './journeyChapters';

/**
 * One persistent procedural world. Scroll moves the camera along a route through it and
 * drives an atmosphere profile (sky, fog, sun) keyed to progress.
 *
 * Written against three.js directly rather than through React Three Fiber: the render
 * loop is coupled to scroll rather than to React state, and the scene is built once.
 */

const FAR = 9000;

/* ------------------------------------------------------------------ helpers */

/** Hex → linear-space THREE.Color, so shader uniforms are not washed out. */
function linColor(hex: string) {
  return new THREE.Color(hex).convertSRGBToLinear();
}

/** Interpolate the atmosphere keyframes at a given progress. */
function sampleAtmosphere(p: number): AtmosphereKey {
  const keys = ATMOSPHERE;
  if (p <= keys[0].at) return keys[0];
  if (p >= keys[keys.length - 1].at) return keys[keys.length - 1];

  let i = 0;
  while (i < keys.length - 2 && keys[i + 1].at < p) i++;
  const a = keys[i];
  const b = keys[i + 1];
  const t = (p - a.at) / Math.max(1e-6, b.at - a.at);
  const s = t * t * (3 - 2 * t); // smoothstep, so keyframe seams are not visible

  const mix = (x: number, y: number) => x + (y - x) * s;
  const mixHex = (x: string, y: string) =>
    '#' + new THREE.Color(x).lerp(new THREE.Color(y), s).getHexString();

  return {
    at: p,
    fogColor: mixHex(a.fogColor, b.fogColor),
    fogDensity: mix(a.fogDensity, b.fogDensity),
    skyTop: mixHex(a.skyTop, b.skyTop),
    skyBottom: mixHex(a.skyBottom, b.skyBottom),
    sunColor: mixHex(a.sunColor, b.sunColor),
    sunIntensity: mix(a.sunIntensity, b.sunIntensity),
    night: mix(a.night, b.night),
  };
}

/** Non-linear pacing: some chapters rest, others push. */
function paceCurve(p: number): number {
  let acc = 0;
  const segs: number[] = [];
  for (let i = 0; i < PACE.length - 1; i++) {
    const w = (PACE[i + 1][0] - PACE[i][0]) * PACE[i][1];
    segs.push(w);
    acc += w;
  }
  let travelled = 0;
  for (let i = 0; i < PACE.length - 1; i++) {
    const a = PACE[i][0];
    const b = PACE[i + 1][0];
    if (p <= b) {
      const local = (p - a) / Math.max(1e-6, b - a);
      return (travelled + segs[i] * local) / acc;
    }
    travelled += segs[i];
  }
  return 1;
}

/* ------------------------------------------------------------------ shaders */

const SKY_VERT = /* glsl */ `
  varying vec3 vWorld;
  void main() {
    vWorld = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const SKY_FRAG = /* glsl */ `
  uniform vec3 uTop;
  uniform vec3 uBottom;
  uniform vec3 uSunDir;
  uniform vec3 uSunColor;
  uniform float uSunIntensity;
  uniform float uNight;
  varying vec3 vWorld;

  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  void main() {
    vec3 dir = normalize(vWorld);
    float h = clamp(dir.y * 0.5 + 0.5, 0.0, 1.0);
    vec3 col = mix(uBottom, uTop, pow(h, 0.85));

    // Sun disc plus a wide glow that bleeds into the gradient.
    float sun = max(dot(dir, normalize(uSunDir)), 0.0);
    col += uSunColor * pow(sun, 900.0) * 6.0 * uSunIntensity;
    col += uSunColor * pow(sun, 8.0) * 0.28 * uSunIntensity;

    // Hash-based stars, only above the horizon and only once night rises.
    if (uNight > 0.001 && dir.y > 0.0) {
      vec3 cell = floor(dir * 320.0);
      float s = hash(cell);
      float star = smoothstep(0.9975, 1.0, s);
      float twinkle = 0.65 + 0.35 * sin(s * 90.0);
      col += vec3(star * twinkle) * uNight * dir.y;
    }

    gl_FragColor = vec4(col, 1.0);
  }
`;

const SNOW_VERT = /* glsl */ `
  attribute vec3 aOffset;
  attribute float aScale;
  attribute float aPhase;
  uniform float uTime;
  uniform vec3 uCamPos;
  uniform float uWind;
  uniform float uBox;
  varying float vAlpha;

  void main() {
    vec3 p = aOffset;

    // Fall, drift, and wrap inside a box that follows the camera, so the field is
    // endless without ever growing the particle count.
    p.y -= uTime * (7.0 + aScale * 16.0);
    p.x += sin(uTime * 0.7 + aPhase) * 5.0 + uWind * (12.0 + aScale * 26.0);
    p.z += cos(uTime * 0.55 + aPhase * 1.7) * 4.0;

    vec3 rel = mod(p - uCamPos + uBox * 0.5, uBox) - uBox * 0.5;
    vec3 world = uCamPos + rel;

    vec4 mv = modelViewMatrix * vec4(world, 1.0);
    float dist = -mv.z;
    vAlpha = smoothstep(uBox * 0.5, uBox * 0.12, dist) * 0.85;
    gl_PointSize = (aScale * 26.0 + 5.0) * (220.0 / max(dist, 1.0));
    gl_Position = projectionMatrix * mv;
  }
`;

const SNOW_FRAG = /* glsl */ `
  varying float vAlpha;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = dot(c, c);
    if (d > 0.25) discard;
    float a = smoothstep(0.25, 0.02, d) * vAlpha;
    gl_FragColor = vec4(vec3(1.0), a);
  }
`;

const POST_FRAG = /* glsl */ `
  uniform sampler2D tDiffuse;
  uniform float uTime;
  uniform float uGrain;
  varying vec2 vUv;

  void main() {
    vec3 col = texture2D(tDiffuse, vUv).rgb;

    // Vignette
    vec2 d = vUv - 0.5;
    col *= 1.0 - smoothstep(0.34, 0.86, dot(d, d) * 2.0) * 0.40;

    // Film grain
    float n = fract(sin(dot(vUv * 1.5 + uTime * 0.6, vec2(12.9898, 78.233))) * 43758.5453);
    col += (n - 0.5) * uGrain;

    gl_FragColor = vec4(col, 1.0);
  }
`;

/* ------------------------------------------------------------------ component */

interface JourneyWorldProps {
  /** 0 → 1 scroll progress through the journey. */
  progressRef: React.RefObject<number>;
  /** Boot progress, 0 → 1, while the world is being built. */
  onBootProgress?: (t: number) => void;
  onReady?: () => void;
}

export default function JourneyWorld({ progressRef, onBootProgress, onReady }: JourneyWorldProps) {
  const mount = useRef<HTMLDivElement>(null);
  const readyRef = useRef(onReady);
  readyRef.current = onReady;
  const bootRef = useRef(onBootProgress);
  bootRef.current = onBootProgress;

  useEffect(() => {
    const container = mount.current;
    if (!container) return;

    const probe = document.createElement('canvas');
    if (!probe.getContext('webgl2') && !probe.getContext('webgl')) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowPower = window.innerWidth < 900;

    let width = container.clientWidth;
    let height = container.clientHeight;

    /* -------------------------------------------------- renderer & scene */
    const renderer = new THREE.WebGLRenderer({ antialias: !lowPower, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    let pixelRatio = Math.min(window.devicePixelRatio, lowPower ? 1.25 : 1.75);
    renderer.setPixelRatio(pixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const fog = new THREE.FogExp2(0x9fb4d0, 0.00035);
    scene.fog = fog;

    const camera = new THREE.PerspectiveCamera(58, width / height, 0.7, FAR);

    /* -------------------------------------------------- sky dome */
    const skyUniforms = {
      uTop: { value: linColor('#2a4d86') },
      uBottom: { value: linColor('#cfe0f2') },
      uSunDir: { value: new THREE.Vector3(0.45, 0.28, -1).normalize() },
      uSunColor: { value: linColor('#ffd9a0') },
      uSunIntensity: { value: 1 },
      uNight: { value: 0 },
    };
    const sky = new THREE.Mesh(
      new THREE.SphereGeometry(FAR * 0.6, 40, 28),
      new THREE.ShaderMaterial({
        vertexShader: SKY_VERT,
        fragmentShader: SKY_FRAG,
        uniforms: skyUniforms,
        side: THREE.BackSide,
        depthWrite: false,
        fog: false,
      }),
    );
    scene.add(sky);

    /* -------------------------------------------------- terrain */
    const SIZE = 7000;
    const SEG = lowPower ? 180 : 320;
    const terrainGeo = new THREE.PlaneGeometry(SIZE, SIZE, SEG, SEG);
    terrainGeo.rotateX(-Math.PI / 2);

    const pos = terrainGeo.attributes.position as THREE.BufferAttribute;
    const colors = new Float32Array(pos.count * 3);
    const rock = new THREE.Color('#8d9ab1');
    const snowCol = new THREE.Color('#f2f7ff');
    const scree = new THREE.Color('#b3bdcd');
    const tmp = new THREE.Color();

    // 320x320 segments is ~103k vertices. Doing them in one pass locks the tab for a
    // visible beat, so the boot queue below walks the buffer a slice at a time.
    const TERRAIN_SLICES = 10;
    const sliceSize = Math.ceil(pos.count / TERRAIN_SLICES);
    const buildTerrainSlice = (slice: number) => {
      const from = slice * sliceSize;
      const to = Math.min(pos.count, from + sliceSize);
      for (let i = from; i < to; i++) {
        const x = pos.getX(i);
        const z = pos.getZ(i);
        const y = terrainHeight(x, z);
        pos.setY(i, y);

        // Snow line rises with altitude; scree in the middle band.
        const t = THREE.MathUtils.clamp((y + 40) / 700, 0, 1);
        tmp.copy(rock).lerp(scree, THREE.MathUtils.smoothstep(t, 0.04, 0.34));
        tmp.lerp(snowCol, THREE.MathUtils.smoothstep(t, 0.24, 0.72));
        tmp.convertSRGBToLinear();
        colors[i * 3] = tmp.r;
        colors[i * 3 + 1] = tmp.g;
        colors[i * 3 + 2] = tmp.b;
      }
    };
    const finishTerrain = () => {
      terrainGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      terrainGeo.computeVertexNormals();
      pos.needsUpdate = true;
    };

    const terrain = new THREE.Mesh(
      terrainGeo,
      new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.82, metalness: 0.0, flatShading: false }),
    );
    scene.add(terrain);

    /* -------------------------------------------------- route */
    // Waypoints climb from the valley floor out toward the high ground at +z.
    const waypoints: THREE.Vector3[] = [];
    const plan: [number, number][] = [
      [0, -2600], [140, -2150], [-90, -1700], [220, -1250], [-160, -800],
      [180, -340], [-120, 120], [240, 560], [-60, 980], [160, 1390],
      [-140, 1760], [80, 2100], [0, 2420],
    ];
    for (const [x, z] of plan) {
      waypoints.push(new THREE.Vector3(x, terrainHeight(x, z) + 14, z));
    }
    const route = new THREE.CatmullRomCurve3(waypoints, false, 'catmullrom', 0.4);
    // Arc-length table, so scroll maps to distance rather than to control-point index.
    route.arcLengthDivisions = 2200;
    route.updateArcLengths();

    /* -------------------------------------------------- lights */
    const hemi = new THREE.HemisphereLight(0xe8f3ff, 0x8d97aa, 1.8);
    scene.add(hemi);

    // Fill from the opposite side, so shaded faces keep some shape.
    const fill = new THREE.DirectionalLight(0xbcd4f2, 0.6);
    fill.position.set(-700, 380, 900);
    scene.add(fill);

    scene.add(new THREE.AmbientLight(0xa8bcd6, 0.9));
    const sun = new THREE.DirectionalLight(0xffd9a0, 2.1);
    sun.position.set(900, 700, -1600);
    scene.add(sun);

    /* -------------------------------------------------- snow */
    const SNOW_BOX = 460;
    const SNOW_COUNT = reduced ? 0 : lowPower ? 900 : 3200;
    let snow: THREE.Points | null = null;
    const snowUniforms = {
      uTime: { value: 0 },
      uCamPos: { value: new THREE.Vector3() },
      uWind: { value: 0 },
      uBox: { value: SNOW_BOX },
    };
    if (SNOW_COUNT > 0) {
      const g = new THREE.BufferGeometry();
      const offsets = new Float32Array(SNOW_COUNT * 3);
      const scales = new Float32Array(SNOW_COUNT);
      const phases = new Float32Array(SNOW_COUNT);
      for (let i = 0; i < SNOW_COUNT; i++) {
        offsets[i * 3] = (Math.random() - 0.5) * SNOW_BOX;
        offsets[i * 3 + 1] = (Math.random() - 0.5) * SNOW_BOX;
        offsets[i * 3 + 2] = (Math.random() - 0.5) * SNOW_BOX;
        scales[i] = Math.random();
        phases[i] = Math.random() * Math.PI * 2;
      }
      g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(SNOW_COUNT * 3), 3));
      g.setAttribute('aOffset', new THREE.BufferAttribute(offsets, 3));
      g.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
      g.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
      g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e6);

      snow = new THREE.Points(
        g,
        new THREE.ShaderMaterial({
          vertexShader: SNOW_VERT,
          fragmentShader: SNOW_FRAG,
          uniforms: snowUniforms,
          transparent: true,
          depthWrite: false,
          blending: THREE.NormalBlending,
        }),
      );
      scene.add(snow);
    }

    /* -------------------------------------------------- post */
    // HalfFloat targets so bloom has real headroom above 1.0 to pick up — the sun,
    // the snow catching light and the cairn caps are all meant to bleed.
    const composer = new EffectComposer(
      renderer,
      new THREE.WebGLRenderTarget(1, 1, {
        type: THREE.HalfFloatType,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
      }),
    );
    composer.addPass(new RenderPass(scene, camera));

    const bloom = new UnrealBloomPass(
      new THREE.Vector2(1, 1),
      lowPower ? 0.38 : 0.62, // strength
      0.85, // radius
      0.72, // threshold — only genuinely bright things bloom
    );
    composer.addPass(bloom);

    const grainPass = new ShaderPass({
      uniforms: {
        tDiffuse: { value: null },
        uTime: { value: 0 },
        uGrain: { value: lowPower ? 0.03 : 0.055 },
      },
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
      fragmentShader: POST_FRAG,
    });
    composer.addPass(grainPass);

    // Tone mapping and the sRGB conversion happen last, on the composited image.
    composer.addPass(new OutputPass());
    const postUniforms = grainPass.uniforms;

    /* -------------------------------------------------- sizing */
    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height);
      composer.setSize(width, height);
      composer.setPixelRatio(pixelRatio);
      bloom.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);

    /* -------------------------------------------------- pointer wind */
    let gust = 0;
    let lastX = 0;
    let lastPointer = 0;
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const now = performance.now();
      const dt = Math.max(16, now - lastPointer);
      lastPointer = now;
      const v = Math.abs(e.clientX - lastX) / dt;
      lastX = e.clientX;
      gust = Math.min(1, gust + v * 0.05);
    };
    if (!reduced) window.addEventListener('pointermove', onPointerMove, { passive: true });

    /* -------------------------------------------------- props (built by the boot queue) */
    let props: PropsHandle | null = null;

    /* -------------------------------------------------- loop */
    const camPos = new THREE.Vector3();
    const lookTarget = new THREE.Vector3();
    let uCur = 0;
    let time = 0;
    let last = performance.now();
    let frameAvg = 16;
    let raf = 0;
    let announced = false; // set once the boot queue drains

    const tick = () => {
      raf = requestAnimationFrame(tick);

      const now = performance.now();
      // Clamp: a backgrounded tab returns with a huge delta and snaps the camera.
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      time += dt;
      frameAvg += ((now - last + dt * 1000) - frameAvg) * 0.05;

      const p = THREE.MathUtils.clamp(progressRef.current ?? 0, 0, 1);
      const target = paceCurve(p);
      // Always damp toward the target; never assign straight from scrollY.
      uCur += (target - uCur) * (1 - Math.exp(-dt * 4));

      route.getPointAt(THREE.MathUtils.clamp(uCur, 0, 1), camPos);
      route.getPointAt(THREE.MathUtils.clamp(uCur + 0.012, 0, 1), lookTarget);

      // Keep the camera above the ground it is flying over.
      const ground = terrainHeight(camPos.x, camPos.z) + 12;
      camera.position.set(camPos.x, Math.max(camPos.y, ground), camPos.z);
      lookTarget.y = Math.max(lookTarget.y, terrainHeight(lookTarget.x, lookTarget.z) + 12) + 26;
      camera.lookAt(lookTarget);

      // Atmosphere
      const atm = sampleAtmosphere(p);
      fog.color.set(atm.fogColor);
      fog.density = atm.fogDensity;
      skyUniforms.uTop.value.copy(linColor(atm.skyTop));
      skyUniforms.uBottom.value.copy(linColor(atm.skyBottom));
      skyUniforms.uSunColor.value.copy(linColor(atm.sunColor));
      skyUniforms.uSunIntensity.value = atm.sunIntensity;
      skyUniforms.uNight.value = atm.night;
      sun.color.set(atm.sunColor);
      sun.intensity = atm.sunIntensity * 2.2;
      hemi.intensity = 0.95 + (1 - atm.night) * 1.0;
      fill.intensity = 0.28 + (1 - atm.night) * 0.45;
      sky.position.copy(camera.position);

      if (snow) {
        gust *= Math.exp(-dt * 1.6);
        snowUniforms.uTime.value = time;
        snowUniforms.uWind.value = gust;
        snowUniforms.uCamPos.value.copy(camera.position);
        snow.position.copy(camera.position).setY(0);
      }
      props?.update(time, gust);
      postUniforms.uTime.value = time;

      composer.render();

      // Adaptive quality: drop resolution rather than drop frames.
      if (frameAvg > 22 && pixelRatio > 0.8) {
        pixelRatio = Math.max(0.8, pixelRatio - 0.15);
        renderer.setPixelRatio(pixelRatio);
        composer.setPixelRatio(pixelRatio);
        frameAvg = 16;
      }

    };

    /* -------------------------------------------------- boot queue
       Heavy work is split into jobs run one per frame. Doing it in a single pass
       locks the tab for long enough to be visible, and there is a loading screen
       waiting on this progress anyway. */
    const jobs: (() => void)[] = [];
    for (let i = 0; i < TERRAIN_SLICES; i++) jobs.push(() => buildTerrainSlice(i));
    jobs.push(finishTerrain);
    jobs.push(() => {
      props = buildProps(route, lowPower);
      scene.add(props.group);
    });
    jobs.push(() => {
      // Compile shaders before the first frame, so the reveal is not a stutter.
      renderer.compile(scene, camera);
    });

    let job = 0;
    const runJobs = () => {
      const started = performance.now();
      // Spend at most ~12ms per frame so the loading screen keeps animating.
      while (job < jobs.length && performance.now() - started < 12) {
        jobs[job++]();
      }
      bootRef.current?.(job / jobs.length);

      if (job < jobs.length) {
        raf = requestAnimationFrame(runJobs);
        return;
      }
      announced = true;
      readyRef.current?.();
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(runJobs);

    /* -------------------------------------------------- teardown */
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else mat?.dispose();
      });
      props?.dispose();
      bloom.dispose();
      composer.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
    };
  }, [progressRef]);

  return <div ref={mount} className="fixed inset-0 z-0" aria-hidden="true" />;
}
