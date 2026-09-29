import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * The developer standing beside the rack, built procedurally rather than loaded from a
 * GLTF: no asset to license or ship, and every surface is themed to the site palette.
 *
 * Everything is laid out in "head units" off a floor at y = 0, on the classic 7.5-heads
 * figure, so limbs stay in proportion when any one measurement is nudged.
 */

const TOTAL_H = 2.2;
const HEAD = TOTAL_H / 7.5; // one head unit ≈ 0.293

/** Base pose the idle animation offsets from, rather than overwrites. */
const BASE_Y = -0.92;
const BASE_TURN = -0.26;

const SKIN = '#c98f66';
const SKIN_SHADE = '#b37a52';
const HAIR = '#14141f';
const SHIRT = '#4338ca';
const SHIRT_SHADE = '#312e81';
const JEANS = '#293449';
const SHOES = '#0b1120';
const SHELL = '#475569';
const SCREEN = '#38bdf8';

/** Rounded box — keeps limbs from reading as hard CG cubes. */
function roundedBox(w: number, h: number, d: number, r = 0.04, seg = 2) {
  // bevelSize expands the outline outward, so inset the shape by it first — otherwise
  // every part ends up larger than the dimensions it was asked for.
  const bevel = Math.min(r * 0.5, w / 4, h / 4, d / 4);
  const iw = w - bevel * 2;
  const ih = h - bevel * 2;
  const rr = Math.max(Math.min(r - bevel, iw / 2, ih / 2), 0.001);

  const shape = new THREE.Shape();
  shape.moveTo(-iw / 2 + rr, -ih / 2);
  shape.lineTo(iw / 2 - rr, -ih / 2);
  shape.quadraticCurveTo(iw / 2, -ih / 2, iw / 2, -ih / 2 + rr);
  shape.lineTo(iw / 2, ih / 2 - rr);
  shape.quadraticCurveTo(iw / 2, ih / 2, iw / 2 - rr, ih / 2);
  shape.lineTo(-iw / 2 + rr, ih / 2);
  shape.quadraticCurveTo(-iw / 2, ih / 2, -iw / 2, ih / 2 - rr);
  shape.lineTo(-iw / 2, -ih / 2 + rr);
  shape.quadraticCurveTo(-iw / 2, -ih / 2, -iw / 2 + rr, -ih / 2);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: d - bevel * 2,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: seg,
    curveSegments: seg + 3,
  });
  geo.translate(0, 0, -d / 2 + bevel);
  geo.computeVertexNormals();
  return geo;
}

interface DeveloperCharacterProps {
  pointer: React.RefObject<{ x: number; y: number }>;
  reducedMotion: boolean;
}

export default function DeveloperCharacter({ pointer, reducedMotion }: DeveloperCharacterProps) {
  const root = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const chest = useRef<THREE.Group>(null);
  const armL = useRef<THREE.Group>(null);
  const armR = useRef<THREE.Group>(null);
  const foreL = useRef<THREE.Group>(null);
  const foreR = useRef<THREE.Group>(null);
  const screen = useRef<THREE.Mesh>(null);

  const g = useMemo(
    () => ({
      torso: roundedBox(0.40, 0.62, 0.23, 0.11, 3),
      hips: roundedBox(0.35, 0.17, 0.22, 0.07),
      neck: roundedBox(0.118, 0.175, 0.118, 0.045),
      head: roundedBox(0.215, 0.27, 0.215, 0.09, 3),
      upperArm: roundedBox(0.105, 0.33, 0.105, 0.05),
      foreArm: roundedBox(0.093, 0.29, 0.093, 0.045),
      hand: roundedBox(0.092, 0.105, 0.06, 0.03),
      thigh: roundedBox(0.155, 0.48, 0.175, 0.07),
      shin: roundedBox(0.128, 0.45, 0.145, 0.06),
      shoe: roundedBox(0.155, 0.085, 0.25, 0.04),
      deck: roundedBox(0.33, 0.022, 0.23, 0.012),
      lid: roundedBox(0.33, 0.215, 0.016, 0.012),
    }),
    [],
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const amp = reducedMotion ? 0 : 1;

    if (root.current) {
      root.current.position.y = BASE_Y + Math.sin(t * 1.1) * 0.01 * amp;
      root.current.rotation.y = BASE_TURN + Math.sin(t * 0.42) * 0.04 * amp;
    }
    if (chest.current) {
      const breathe = 1 + Math.sin(t * 1.1) * 0.014 * amp;
      chest.current.scale.set(breathe, 1, breathe);
    }

    // Head follows the cursor, easing back toward centre.
    if (head.current) {
      const p = pointer.current ?? { x: 0, y: 0 };
      const yaw = THREE.MathUtils.clamp(p.x, -1, 1) * 0.4;
      const pitch = THREE.MathUtils.clamp(-p.y, -1, 1) * 0.18;
      head.current.rotation.y = THREE.MathUtils.lerp(head.current.rotation.y, yaw, 0.06);
      head.current.rotation.x = THREE.MathUtils.lerp(
        head.current.rotation.x,
        pitch + Math.sin(t * 0.9) * 0.015 * amp,
        0.06,
      );
    }

    // Typing: forearms tick out of phase.
    if (foreL.current && foreR.current) {
      foreL.current.rotation.x = 0.62 + Math.sin(t * 7.4) * 0.05 * amp;
      foreR.current.rotation.x = 0.62 + Math.sin(t * 7.4 + 1.8) * 0.05 * amp;
    }
    if (armL.current && armR.current) {
      armL.current.rotation.x = -0.52 + Math.sin(t * 3.7) * 0.015 * amp;
      armR.current.rotation.x = -0.52 + Math.sin(t * 3.7 + 1.1) * 0.015 * amp;
    }

    if (screen.current) {
      const mat = screen.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.72 + Math.sin(t * 5.5) * 0.16 * amp + Math.sin(t * 17) * 0.05 * amp;
    }
  });

  return (
    <group ref={root} position={[0, BASE_Y, 0]} rotation={[0, BASE_TURN, 0]}>
      {/* ------------------------- Legs ------------------------- */}
      {[-0.098, 0.098].map((x, i) => (
        <group key={i} position={[x, 0, 0]}>
          <mesh geometry={g.thigh} castShadow position={[0, 0.79, 0]}>
            <meshStandardMaterial color={JEANS} roughness={0.9} />
          </mesh>
          <mesh geometry={g.shin} castShadow position={[0, 0.335, 0.008]}>
            <meshStandardMaterial color={JEANS} roughness={0.92} />
          </mesh>
          <mesh geometry={g.shoe} castShadow position={[0, 0.045, 0.048]}>
            <meshStandardMaterial color={SHOES} roughness={0.5} metalness={0.2} />
          </mesh>
        </group>
      ))}

      {/* ------------------------- Hips ------------------------- */}
      <mesh geometry={g.hips} castShadow position={[0, 1.1, 0]}>
        <meshStandardMaterial color={JEANS} roughness={0.9} />
      </mesh>

      {/* ------------------------- Torso ------------------------ */}
      <group ref={chest} position={[0, 1.49, 0]}>
        <mesh geometry={g.torso} castShadow>
          <meshStandardMaterial color={SHIRT} roughness={0.78} metalness={0.05} />
        </mesh>
        {/* Lanyard and badge */}
        <mesh position={[0.02, -0.04, 0.12]}>
          <boxGeometry args={[0.022, 0.34, 0.008]} />
          <meshStandardMaterial color={SHIRT_SHADE} roughness={0.9} />
        </mesh>
        <mesh position={[0.02, -0.25, 0.125]}>
          <boxGeometry args={[0.075, 0.105, 0.01]} />
          <meshStandardMaterial color="#0f172a" emissive={SCREEN} emissiveIntensity={0.3} roughness={0.5} />
        </mesh>
      </group>

      {/* ------------------------- Neck & head ------------------ */}
      <mesh geometry={g.neck} castShadow position={[0, 1.875, 0]}>
        <meshStandardMaterial color={SKIN_SHADE} roughness={0.75} />
      </mesh>

      <group ref={head} position={[0, 2.055, 0]}>
        <mesh geometry={g.head} castShadow>
          <meshStandardMaterial color={SKIN} roughness={0.68} />
        </mesh>

        {/* Hair: cap over the crown plus a short fringe */}
        <mesh position={[0, 0.022, -0.004]} scale={[1, 1.12, 1.03]}>
          <sphereGeometry args={[0.113, 24, 18, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
          <meshStandardMaterial color={HAIR} roughness={0.96} />
        </mesh>
        {/* Hairline sweeping across the brow */}
        <mesh position={[0, 0.082, 0.028]} rotation={[0.12, 0, 0]}>
          <boxGeometry args={[0.202, 0.034, 0.18]} />
          <meshStandardMaterial color={HAIR} roughness={0.96} />
        </mesh>
        {/* Sideburns, so the hairline reads from the side too */}
        {[-0.103, 0.103].map((x, i) => (
          <mesh key={i} position={[x, 0.01, -0.01]}>
            <boxGeometry args={[0.022, 0.1, 0.16]} />
            <meshStandardMaterial color={HAIR} roughness={0.96} />
          </mesh>
        ))}

        {/* Brows */}
        {[-0.052, 0.052].map((x, i) => (
          <mesh key={i} position={[x, 0.032, 0.107]} rotation={[0, 0, x < 0 ? 0.08 : -0.08]}>
            <boxGeometry args={[0.048, 0.011, 0.01]} />
            <meshStandardMaterial color={HAIR} roughness={0.9} />
          </mesh>
        ))}

        {/* Glasses: frames, bridge, and lenses catching the screen */}
        {[-0.052, 0.052].map((x, i) => (
          <mesh key={i} position={[x, -0.002, 0.108]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.038, 0.0075, 8, 22]} />
            <meshStandardMaterial color="#111827" roughness={0.3} metalness={0.7} />
          </mesh>
        ))}
        <mesh position={[0, -0.002, 0.108]}>
          <boxGeometry args={[0.032, 0.007, 0.007]} />
          <meshStandardMaterial color="#111827" roughness={0.3} metalness={0.7} />
        </mesh>
        {[-0.052, 0.052].map((x, i) => (
          <mesh key={`lens-${i}`} position={[x, -0.002, 0.109]}>
            <circleGeometry args={[0.035, 20]} />
            <meshStandardMaterial
              color="#0b1220"
              emissive={SCREEN}
              emissiveIntensity={0.45}
              transparent
              opacity={0.42}
              roughness={0.12}
              metalness={0.3}
            />
          </mesh>
        ))}
        {/* Temple arms */}
        {[-0.088, 0.088].map((x, i) => (
          <mesh key={`temple-${i}`} position={[x, -0.002, 0.055]}>
            <boxGeometry args={[0.008, 0.008, 0.1]} />
            <meshStandardMaterial color="#111827" metalness={0.7} roughness={0.3} />
          </mesh>
        ))}

        {/* Ears */}
        {[-0.112, 0.112].map((x, i) => (
          <mesh key={`ear-${i}`} position={[x, -0.01, 0]} scale={[0.5, 1, 0.7]}>
            <sphereGeometry args={[0.032, 10, 10]} />
            <meshStandardMaterial color={SKIN_SHADE} roughness={0.75} />
          </mesh>
        ))}
      </group>

      {/* ------------------------- Arms -------------------------
          Shoulder rotates the whole arm forward; the elbow group bends the forearm
          up to the keyboard, which is what the typing animation drives. */}
      {([
        [-0.238, armL, foreL, 0.12],
        [0.238, armR, foreR, -0.12],
      ] as const).map(([x, armRef, foreRef, roll], i) => (
        <group key={i} ref={armRef} position={[x, 1.74, 0]} rotation={[-0.52, 0, roll]}>
          <mesh position={[0, -0.01, 0]} scale={[1, 0.9, 1]}>
            <sphereGeometry args={[0.072, 16, 12]} />
            <meshStandardMaterial color={SHIRT} roughness={0.8} />
          </mesh>
          <mesh geometry={g.upperArm} castShadow position={[0, -0.165, 0]}>
            <meshStandardMaterial color={SHIRT} roughness={0.8} />
          </mesh>
          {/* Rolled-up cuff */}
          <mesh position={[0, -0.32, 0]}>
            <boxGeometry args={[0.115, 0.045, 0.115]} />
            <meshStandardMaterial color={SHIRT_SHADE} roughness={0.85} />
          </mesh>

          <group ref={foreRef} position={[0, -0.315, 0]} rotation={[0.62, 0, 0]}>
            <mesh geometry={g.foreArm} castShadow position={[0, -0.145, 0]}>
              <meshStandardMaterial color={SKIN} roughness={0.7} />
            </mesh>
            <mesh geometry={g.hand} castShadow position={[0, -0.335, 0.012]} rotation={[0.35, 0, 0]}>
              <meshStandardMaterial color={SKIN_SHADE} roughness={0.72} />
            </mesh>
          </group>
        </group>
      ))}

      {/* ------------------------- Laptop ------------------------ */}
      <group position={[0, 1.145, 0.315]}>
        <mesh geometry={g.deck} castShadow>
          <meshStandardMaterial color={SHELL} roughness={0.35} metalness={0.75} />
        </mesh>
        <mesh position={[0, 0.015, 0.012]}>
          <boxGeometry args={[0.28, 0.003, 0.16]} />
          <meshStandardMaterial color="#0b1120" roughness={0.65} />
        </mesh>
        <group position={[0, 0.1, -0.108]} rotation={[-0.36, 0, 0]}>
          <mesh geometry={g.lid} castShadow>
            <meshStandardMaterial color={SHELL} roughness={0.35} metalness={0.75} />
          </mesh>
          <mesh ref={screen} position={[0, 0, 0.011]}>
            <planeGeometry args={[0.295, 0.185]} />
            <meshStandardMaterial color="#031024" emissive={SCREEN} emissiveIntensity={0.72} roughness={0.35} />
          </mesh>
        </group>
        {/* Screen light thrown back onto the face and chest */}
        <pointLight position={[0, 0.22, 0.04]} color={SCREEN} intensity={0.55} distance={1.0} decay={2} />
      </group>
    </group>
  );
}
