import * as THREE from 'three';
import { terrainHeight } from './noise';

/**
 * Everything that makes the route feel travelled rather than empty: boulders, cairns
 * marking the way, tents at the camps, a fixed rope through the steep section, and a
 * line of prayer flags near the top.
 *
 * Scattered among them is abandoned hardware — server racks half sunk in the snow,
 * laptops still lit, dead monitors, comms dishes and a run of fibre. The climb is a
 * backend career, so the debris on the route is the kit that career is made of.
 *
 * All of it is placed by sampling the same height field the terrain mesh uses, so props
 * sit on the ground instead of hovering over it or sinking into it.
 */

export interface PropsHandle {
  group: THREE.Group;
  /** Called each frame; drives the flag wave. */
  update: (time: number, wind: number) => void;
  dispose: () => void;
}

/** Deterministic pseudo-random, so the scene is identical on every load. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const FLAG_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uWind;
  varying vec2 vUv;
  varying float vShade;

  void main() {
    vUv = uv;
    vec3 p = position;

    // The further along the bunting a vertex is, the more it can swing: the line is
    // fixed at both ends, so the wave is scaled by distance from the nearer anchor.
    float grip = sin(uv.x * 3.14159);
    float t = uTime * (2.2 + uWind * 3.0);
    p.z += sin(p.x * 0.9 + t) * 0.5 * grip * (0.5 + uWind);
    p.y += sin(p.x * 1.7 + t * 1.3) * 0.22 * grip;

    vShade = 0.72 + 0.28 * cos(p.x * 0.9 + t);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const FLAG_FRAG = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec2 vUv;
  varying float vShade;

  void main() {
    // Five colours repeating along the line, the way a bunting string reads.
    float band = floor(fract(vUv.x * 9.0) * 2.0);
    vec3 col = mix(uColorA, uColorB, band);
    gl_FragColor = vec4(col * vShade, 1.0);
  }
`;

/** Drop an object onto the terrain at (x, z). */
function ground(x: number, z: number, lift = 0) {
  return terrainHeight(x, z) + lift;
}

export function buildProps(route: THREE.CatmullRomCurve3, lowPower: boolean): PropsHandle {
  const group = new THREE.Group();
  const disposables: { dispose: () => void }[] = [];
  const track = <T extends { dispose: () => void }>(o: T): T => {
    disposables.push(o);
    return o;
  };

  const rand = rng(20260929);
  const at = (u: number) => route.getPointAt(THREE.MathUtils.clamp(u, 0, 1));

  /* ------------------------------------------------ boulders & seracs */
  {
    const count = lowPower ? 150 : 420;
    const geo = track(new THREE.IcosahedronGeometry(1, 0));
    const mat = track(
      new THREE.MeshStandardMaterial({ color: '#9aa6bb', roughness: 0.85, metalness: 0.0, flatShading: true }),
    );
    const mesh = new THREE.InstancedMesh(geo, mat, count);
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const e = new THREE.Euler();
    const pos = new THREE.Vector3();
    const scl = new THREE.Vector3();

    for (let i = 0; i < count; i++) {
      const u = rand();
      const p = at(u);
      // Scatter to the sides of the path, never on it.
      const side = (rand() < 0.5 ? -1 : 1) * (14 + rand() * 150);
      const along = (rand() - 0.5) * 60;
      const x = p.x + side;
      const z = p.z + along;
      const s = 1.4 + rand() * rand() * 9;

      pos.set(x, ground(x, z) + s * 0.35, z);
      scl.set(s * (0.7 + rand() * 0.6), s * (0.5 + rand() * 0.7), s * (0.7 + rand() * 0.6));
      e.set(rand() * 3.14, rand() * 3.14, rand() * 3.14);
      q.setFromEuler(e);
      m.compose(pos, q, scl);
      mesh.setMatrixAt(i, m);
    }
    mesh.instanceMatrix.needsUpdate = true;
    mesh.frustumCulled = false;
    group.add(mesh);
  }

  /* ------------------------------------------------ route cairns */
  {
    const marks = lowPower ? 16 : 30;
    const geo = track(new THREE.CylinderGeometry(0.9, 1.5, 3.4, 6));
    const mat = track(new THREE.MeshStandardMaterial({ color: '#5d6879', roughness: 0.85, flatShading: true }));
    const capGeo = track(new THREE.SphereGeometry(0.85, 8, 6));
    const capMat = track(
      new THREE.MeshStandardMaterial({ color: '#e2e8f0', roughness: 0.6, emissive: '#38bdf8', emissiveIntensity: 0.35 }),
    );

    const stack = new THREE.InstancedMesh(geo, mat, marks);
    const caps = new THREE.InstancedMesh(capGeo, capMat, marks);
    const m = new THREE.Matrix4();
    const one = new THREE.Vector3(1, 1, 1);
    const noRot = new THREE.Quaternion();
    const p = new THREE.Vector3();

    for (let i = 0; i < marks; i++) {
      const u = 0.02 + (i / marks) * 0.96;
      const c = at(u);
      const side = (i % 2 === 0 ? 1 : -1) * (7 + rand() * 6);
      const x = c.x + side;
      const z = c.z + (rand() - 0.5) * 8;
      const g = ground(x, z);

      m.compose(p.set(x, g + 1.7, z), noRot, one);
      stack.setMatrixAt(i, m);
      m.compose(p.set(x, g + 3.9, z), noRot, one);
      caps.setMatrixAt(i, m);
    }
    stack.instanceMatrix.needsUpdate = true;
    caps.instanceMatrix.needsUpdate = true;
    stack.frustumCulled = false;
    caps.frustumCulled = false;
    group.add(stack, caps);
  }

  /* ------------------------------------------------ camps */
  {
    const tentGeo = track(new THREE.ConeGeometry(3.2, 4.4, 4));
    const doorGeo = track(new THREE.CircleGeometry(1.1, 12));
    const doorMat = track(new THREE.MeshStandardMaterial({ color: '#0b1120', roughness: 0.9, side: THREE.DoubleSide }));
    const colours = ['#f97316', '#eab308', '#ef4444', '#22d3ee'];

    // Four camps on the way up, each a small cluster.
    [0.05, 0.34, 0.62, 0.85].forEach((u, campIdx) => {
      const c = at(u);
      const tents = 2 + Math.floor(rand() * 3);
      const mat = track(
        new THREE.MeshStandardMaterial({ color: colours[campIdx % colours.length], roughness: 0.85, flatShading: true }),
      );

      for (let i = 0; i < tents; i++) {
        const x = c.x + (rand() - 0.5) * 46 + (i - tents / 2) * 11;
        const z = c.z + (rand() - 0.5) * 40;
        const g = ground(x, z);

        const tent = new THREE.Mesh(tentGeo, mat);
        tent.position.set(x, g + 2.1, z);
        tent.rotation.y = rand() * Math.PI;
        group.add(tent);

        const door = new THREE.Mesh(doorGeo, doorMat);
        door.position.set(x, g + 1.2, z + 2.2);
        group.add(door);
      }
    });
  }

  /* ------------------------------------------------ fixed rope through the steep bit */
  {
    const samples: THREE.Vector3[] = [];
    for (let i = 0; i <= 40; i++) {
      const u = 0.3 + (i / 40) * 0.2;
      const p = at(u);
      const x = p.x + 5.5;
      const z = p.z;
      // Sags between anchors, the way a fixed line actually hangs.
      const sag = Math.sin((i / 40) * Math.PI * 7) * 0.45;
      samples.push(new THREE.Vector3(x, ground(x, z) + 2.4 + sag, z));
    }
    const curve = new THREE.CatmullRomCurve3(samples);
    const geo = track(new THREE.TubeGeometry(curve, lowPower ? 90 : 180, 0.22, 5, false));
    const mat = track(new THREE.MeshStandardMaterial({ color: '#f59e0b', roughness: 0.8 }));
    group.add(new THREE.Mesh(geo, mat));

    // Anchor stakes along it
    const stakeGeo = track(new THREE.CylinderGeometry(0.16, 0.16, 2.6, 5));
    const stakeMat = track(new THREE.MeshStandardMaterial({ color: '#94a3b8', roughness: 0.5, metalness: 0.6 }));
    const stakes = new THREE.InstancedMesh(stakeGeo, stakeMat, 9);
    const m = new THREE.Matrix4();
    const one = new THREE.Vector3(1, 1, 1);
    const noRot = new THREE.Quaternion();
    for (let i = 0; i < 9; i++) {
      const p = samples[Math.floor((i / 8) * 40)];
      m.compose(new THREE.Vector3(p.x, p.y - 1.2, p.z), noRot, one);
      stakes.setMatrixAt(i, m);
    }
    stakes.instanceMatrix.needsUpdate = true;
    group.add(stakes);
  }

  /* ------------------------------------------------ abandoned hardware
     The route is a career in backend engineering, so the wreckage along it is server
     kit rather than climbing kit. Screens and LEDs are emissive, which the bloom pass
     picks up and turns into the only warm points in a cold scene. */

  // --- Server racks, half sunk and tilted, with a lit status strip ---
  {
    const count = lowPower ? 18 : 42;
    const bodyGeo = track(new THREE.BoxGeometry(6.5, 16, 5.5));
    const bodyMat = track(new THREE.MeshStandardMaterial({ color: '#1b2430', roughness: 0.5, metalness: 0.7 }));
    const ledGeo = track(new THREE.PlaneGeometry(4.4, 12.5));
    const ledMat = track(
      new THREE.MeshStandardMaterial({
        color: '#031018',
        emissive: '#22d3ee',
        emissiveIntensity: 0.9,
        roughness: 0.3,
        side: THREE.DoubleSide,
      }),
    );

    const racks = new THREE.InstancedMesh(bodyGeo, bodyMat, count);
    const leds = new THREE.InstancedMesh(ledGeo, ledMat, count);
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const e = new THREE.Euler();
    const pos = new THREE.Vector3();
    const one = new THREE.Vector3(1, 1, 1);

    for (let i = 0; i < count; i++) {
      const c = at(0.04 + rand() * 0.92);
      const x = c.x + (rand() < 0.5 ? -1 : 1) * (12 + rand() * 26);
      const z = c.z + (rand() - 0.5) * 70;
      const g = ground(x, z);
      const tilt = (rand() - 0.5) * 0.9;
      const spin = rand() * Math.PI * 2;
      // Sunk to a random depth, so they read as half buried rather than placed.
      const sink = 2.5 + rand() * 5.5;

      e.set(tilt, spin, (rand() - 0.5) * 0.35);
      q.setFromEuler(e);
      m.compose(pos.set(x, g + 8 - sink, z), q, one);
      racks.setMatrixAt(i, m);

      // The lit strip sits just proud of the rack's front face.
      const front = new THREE.Vector3(0, 0, 2.85).applyQuaternion(q);
      m.compose(pos.set(x + front.x, g + 8 - sink + front.y, z + front.z), q, one);
      leds.setMatrixAt(i, m);
    }
    racks.instanceMatrix.needsUpdate = true;
    leds.instanceMatrix.needsUpdate = true;
    racks.frustumCulled = false;
    leds.frustumCulled = false;
    group.add(racks, leds);
  }

  // --- Laptops lying open in the snow, screens still on ---
  {
    const count = lowPower ? 20 : 46;
    const baseGeo = track(new THREE.BoxGeometry(4.6, 0.34, 3.2));
    const shellMat = track(new THREE.MeshStandardMaterial({ color: '#6a7688', roughness: 0.3, metalness: 0.8 }));
    const lidGeo = track(new THREE.BoxGeometry(4.6, 3.05, 0.22));
    const screenGeo = track(new THREE.PlaneGeometry(4.1, 2.6));
    const screenMat = track(
      new THREE.MeshStandardMaterial({
        color: '#020a18',
        emissive: '#38bdf8',
        emissiveIntensity: 1.35,
        roughness: 0.25,
        side: THREE.DoubleSide,
      }),
    );

    const bases = new THREE.InstancedMesh(baseGeo, shellMat, count);
    const lids = new THREE.InstancedMesh(lidGeo, shellMat, count);
    const screens = new THREE.InstancedMesh(screenGeo, screenMat, count);
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const qLid = new THREE.Quaternion();
    const e = new THREE.Euler();
    const pos = new THREE.Vector3();
    const one = new THREE.Vector3(1, 1, 1);
    const lidOffset = new THREE.Vector3();

    for (let i = 0; i < count; i++) {
      const c = at(0.03 + rand() * 0.94);
      const x = c.x + (rand() < 0.5 ? -1 : 1) * (6 + rand() * 20);
      const z = c.z + (rand() - 0.5) * 52;
      const g = ground(x, z);
      const spin = rand() * Math.PI * 2;

      e.set(0, spin, (rand() - 0.5) * 0.25);
      q.setFromEuler(e);
      m.compose(pos.set(x, g + 0.3, z), q, one);
      bases.setMatrixAt(i, m);

      // Lid hinged open behind the base, leaning back.
      const lean = 1.15 + rand() * 0.3;
      e.set(-lean, spin, 0);
      qLid.setFromEuler(e);
      lidOffset.set(0, 1.3, -1.6).applyQuaternion(q);
      m.compose(pos.set(x + lidOffset.x, g + 0.3 + lidOffset.y, z + lidOffset.z), qLid, one);
      lids.setMatrixAt(i, m);

      const screenOffset = new THREE.Vector3(0, 0, 0.16).applyQuaternion(qLid);
      m.compose(
        pos.set(x + lidOffset.x + screenOffset.x, g + 0.3 + lidOffset.y + screenOffset.y, z + lidOffset.z + screenOffset.z),
        qLid,
        one,
      );
      screens.setMatrixAt(i, m);
    }
    [bases, lids, screens].forEach((mesh) => {
      mesh.instanceMatrix.needsUpdate = true;
      mesh.frustumCulled = false;
    });
    group.add(bases, lids, screens);
  }

  // --- Dead monitors, face down or tipped over ---
  {
    const count = lowPower ? 14 : 30;
    const geo = track(new THREE.BoxGeometry(5.2, 4.2, 3.9));
    const mat = track(new THREE.MeshStandardMaterial({ color: '#262f3d', roughness: 0.65, metalness: 0.3 }));
    const mesh = new THREE.InstancedMesh(geo, mat, count);
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const e = new THREE.Euler();
    const pos = new THREE.Vector3();
    const one = new THREE.Vector3(1, 1, 1);

    for (let i = 0; i < count; i++) {
      const c = at(rand());
      const x = c.x + (rand() < 0.5 ? -1 : 1) * (8 + rand() * 24);
      const z = c.z + (rand() - 0.5) * 60;
      const g = ground(x, z);
      e.set((rand() - 0.5) * 2.4, rand() * Math.PI * 2, (rand() - 0.5) * 1.6);
      q.setFromEuler(e);
      m.compose(pos.set(x, g + 1.1, z), q, one);
      mesh.setMatrixAt(i, m);
    }
    mesh.instanceMatrix.needsUpdate = true;
    mesh.frustumCulled = false;
    group.add(mesh);
  }

  // --- Comms dishes on masts, pointing off at the sky ---
  {
    const dishGeo = track(new THREE.SphereGeometry(7.5, 20, 14, 0, Math.PI * 2, 0, Math.PI * 0.42));
    const dishMat = track(
      new THREE.MeshStandardMaterial({ color: '#cbd5e1', roughness: 0.45, metalness: 0.5, side: THREE.DoubleSide }),
    );
    const mastGeo = track(new THREE.CylinderGeometry(0.6, 0.85, 22, 8));
    const mastMat = track(new THREE.MeshStandardMaterial({ color: '#64748b', roughness: 0.6, metalness: 0.5 }));

    [0.12, 0.29, 0.46, 0.63, 0.79, 0.93].forEach((u) => {
      const c = at(u);
      const x = c.x + (rand() < 0.5 ? -1 : 1) * (26 + rand() * 34);
      const z = c.z + (rand() - 0.5) * 30;
      const g = ground(x, z);

      const mast = new THREE.Mesh(mastGeo, mastMat);
      mast.position.set(x, g + 11, z);
      group.add(mast);

      const dish = new THREE.Mesh(dishGeo, dishMat);
      dish.position.set(x, g + 23, z);
      dish.rotation.set(-0.85 + rand() * 0.3, rand() * Math.PI * 2, 0);
      group.add(dish);
    });
  }

  // --- A run of fibre threading along the route, still carrying light ---
  {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 70; i++) {
      const u = i / 70;
      const p = at(u);
      const wob = Math.sin(u * 34) * 5.5;
      const x = p.x - 9 + wob;
      const z = p.z + Math.cos(u * 27) * 2.4;
      pts.push(new THREE.Vector3(x, ground(x, z) + 0.8, z));
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    const geo = track(new THREE.TubeGeometry(curve, lowPower ? 160 : 340, 0.55, 6, false));
    const mat = track(
      new THREE.MeshStandardMaterial({
        color: '#0b1a2a',
        emissive: '#22d3ee',
        emissiveIntensity: 0.8,
        roughness: 0.4,
      }),
    );
    group.add(new THREE.Mesh(geo, mat));
  }

  /* ------------------------------------------------ prayer flags near the top */
  const flagUniforms = {
    uTime: { value: 0 },
    uWind: { value: 0 },
    uColorA: { value: new THREE.Color('#38bdf8').convertSRGBToLinear() },
    uColorB: { value: new THREE.Color('#f43f5e').convertSRGBToLinear() },
  };
  {
    const a = at(0.93);
    const b = at(0.985);
    const span = a.distanceTo(b);
    const geo = track(new THREE.PlaneGeometry(span, 2.1, 90, 1));
    const mat = track(
      new THREE.ShaderMaterial({
        vertexShader: FLAG_VERT,
        fragmentShader: FLAG_FRAG,
        uniforms: flagUniforms,
        side: THREE.DoubleSide,
      }),
    );
    const bunting = new THREE.Mesh(geo, mat);
    bunting.position.set((a.x + b.x) / 2, Math.max(a.y, b.y) + 5.5, (a.z + b.z) / 2);
    bunting.rotation.y = Math.atan2(b.x - a.x, b.z - a.z) + Math.PI / 2;
    bunting.frustumCulled = false;
    group.add(bunting);

    // Two poles holding it up
    const poleGeo = track(new THREE.CylinderGeometry(0.22, 0.28, 9, 6));
    const poleMat = track(new THREE.MeshStandardMaterial({ color: '#64748b', roughness: 0.7, metalness: 0.3 }));
    for (const p of [a, b]) {
      const pole = new THREE.Mesh(poleGeo, poleMat);
      pole.position.set(p.x, ground(p.x, p.z) + 4.5, p.z);
      group.add(pole);
    }
  }

  return {
    group,
    update: (time, wind) => {
      flagUniforms.uTime.value = time;
      flagUniforms.uWind.value = wind;
    },
    dispose: () => {
      disposables.forEach((d) => d.dispose());
      group.clear();
    },
  };
}
