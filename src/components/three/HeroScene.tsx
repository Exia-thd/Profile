import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

// ─── Ambient particle field ───────────────────────────────────────────────────
function ParticleField() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const COUNT = 180;

  const particles = useMemo(() =>
    Array.from({ length: COUNT }, () => ({
      pos: new THREE.Vector3((Math.random() - 0.5) * 18, (Math.random() - 0.5) * 11, (Math.random() - 0.5) * 8 - 4),
      speed: Math.random() * 0.4 + 0.15,
      offset: Math.random() * Math.PI * 2,
    })), []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    particles.forEach((p, i) => {
      dummy.position.set(
        p.pos.x + Math.sin(t * p.speed * 0.35 + p.offset) * 0.6,
        p.pos.y + Math.cos(t * p.speed * 0.45 + p.offset) * 0.5,
        p.pos.z,
      );
      const s = 0.4 + Math.abs(Math.sin(t * p.speed + p.offset)) * 0.6;
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]}>
      <sphereGeometry args={[0.022, 5, 5]} />
      <meshBasicMaterial
        color="#818cf8"
        transparent
        opacity={0.55}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

// ─── Network graph ────────────────────────────────────────────────────────────
function useNetworkData() {
  return useMemo(() => {
    const rng = (seed: number) => {
      let s = seed;
      return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    };
    const rand = rng(42);
    const count = 24;
    const nodePositions: [number, number, number][] = Array.from({ length: count }, () => [
      (rand() - 0.5) * 9,
      (rand() - 0.5) * 5.5,
      (rand() - 0.5) * 3 - 3,
    ]);
    const edges: [number, number][] = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const [ax, ay, az] = nodePositions[i];
        const [bx, by, bz] = nodePositions[j];
        const dist = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2 + (az - bz) ** 2);
        if (dist < 3.0 && edges.length < 34) edges.push([i, j]);
      }
    }
    return { nodePositions, edges };
  }, []);
}

function DataPulse({ from, to, offset }: { from: [number, number, number]; to: [number, number, number]; offset: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = ((clock.getElapsedTime() * 0.28 + offset) % 1);
    meshRef.current.position.set(
      from[0] + (to[0] - from[0]) * t,
      from[1] + (to[1] - from[1]) * t,
      from[2] + (to[2] - from[2]) * t,
    );
    const scale = Math.sin(t * Math.PI) * 1.2 + 0.1;
    meshRef.current.scale.setScalar(Math.max(0, scale));
  });
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color="#67e8f9" transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  );
}

function NetworkGraph() {
  const groupRef = useRef<THREE.Group>(null);
  const { nodePositions, edges } = useNetworkData();

  const lineGeometry = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (const [a, b] of edges) {
      pts.push(new THREE.Vector3(...nodePositions[a]));
      pts.push(new THREE.Vector3(...nodePositions[b]));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [edges, nodePositions]);

  const pulseOffsets = useMemo(
    () => edges.slice(0, 18).map((_, i) => (i / 18)),
    [edges],
  );

  useFrame(({ clock }) => {
    if (groupRef.current) groupRef.current.rotation.y = clock.getElapsedTime() * 0.035;
  });

  return (
    <group ref={groupRef}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#4f46e5" opacity={0.22} transparent />
      </lineSegments>
      {nodePositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.07, 10, 10]} />
          <meshBasicMaterial color="#818cf8" transparent opacity={0.85} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      ))}
      {edges.slice(0, 18).map(([a, b], i) => (
        <DataPulse key={i} from={nodePositions[a]} to={nodePositions[b]} offset={pulseOffsets[i]} />
      ))}
    </group>
  );
}

// ─── Double-layer wireframe icosahedron ───────────────────────────────────────
function FloatingIcosahedron() {
  const innerRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const y = Math.sin(t * 0.6) * 0.28;
    if (innerRef.current) {
      innerRef.current.rotation.x = t * 0.17;
      innerRef.current.rotation.y = t * 0.24;
      innerRef.current.position.y = y;
    }
    if (outerRef.current) {
      outerRef.current.rotation.x = -t * 0.10;
      outerRef.current.rotation.y = -t * 0.14;
      outerRef.current.position.y = y;
    }
  });

  return (
    <group position={[3.4, 0, -1]}>
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshBasicMaterial color="#818cf8" wireframe transparent opacity={0.45} />
      </mesh>
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.55, 1]} />
        <meshBasicMaterial color="#6366f1" wireframe transparent opacity={0.14} />
      </mesh>
    </group>
  );
}

// ─── DNA double helix ─────────────────────────────────────────────────────────
function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null);

  const points = useMemo(() => {
    const COUNT = 32;
    return Array.from({ length: COUNT }, (_, i) => {
      const angle = (i / COUNT) * Math.PI * 4;
      const y = (i / COUNT) * 4.5 - 2.25;
      return {
        a: [Math.cos(angle) * 0.55, y, Math.sin(angle) * 0.55] as [number, number, number],
        b: [Math.cos(angle + Math.PI) * 0.55, y, Math.sin(angle + Math.PI) * 0.55] as [number, number, number],
        bar: i % 4 === 0,
      };
    });
  }, []);

  // Build bar line segments
  const barGeometry = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (const p of points) {
      if (p.bar) {
        pts.push(new THREE.Vector3(...p.a));
        pts.push(new THREE.Vector3(...p.b));
      }
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [points]);

  useFrame(({ clock }) => {
    if (groupRef.current) groupRef.current.rotation.y = clock.getElapsedTime() * 0.22;
  });

  return (
    <group ref={groupRef} position={[-3.8, 0, -3.5]}>
      {points.map((p, i) => (
        <group key={i}>
          <mesh position={p.a}>
            <sphereGeometry args={[0.07, 8, 8]} />
            <meshBasicMaterial color="#6366f1" transparent opacity={0.8} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
          <mesh position={p.b}>
            <sphereGeometry args={[0.07, 8, 8]} />
            <meshBasicMaterial color="#22d3ee" transparent opacity={0.8} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
        </group>
      ))}
      <lineSegments geometry={barGeometry}>
        <lineBasicMaterial color="#a78bfa" opacity={0.3} transparent />
      </lineSegments>
    </group>
  );
}

// ─── Floating orbs ────────────────────────────────────────────────────────────
function FloatingOrbs() {
  const orbData = useMemo(() => [
    { pos: [-3.0, 1.9, -2] as [number, number, number],  color: '#6366f1', size: 0.13, speed: 0.9 },
    { pos: [2.0, -1.9, -1.5] as [number, number, number], color: '#a78bfa', size: 0.10, speed: 1.2 },
    { pos: [-2.5, -1.3, -2.5] as [number, number, number], color: '#67e8f9', size: 0.11, speed: 0.7 },
    { pos: [4.0, 1.4, -2] as [number, number, number],   color: '#818cf8', size: 0.09, speed: 1.4 },
    { pos: [0.5, 2.6, -2.2] as [number, number, number], color: '#c4b5fd', size: 0.08, speed: 0.8 },
    { pos: [-1.0, -2.4, -1.8] as [number, number, number], color: '#22d3ee', size: 0.12, speed: 1.1 },
    { pos: [1.5, 2.0, -3] as [number, number, number],   color: '#f472b6', size: 0.07, speed: 0.6 },
    { pos: [-2.0, 0.5, -2] as [number, number, number],  color: '#fb923c', size: 0.08, speed: 1.3 },
  ], []);

  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const d = orbData[i];
      mesh.position.y = d.pos[1] + Math.sin(t * d.speed + i) * 0.35;
      mesh.position.x = d.pos[0] + Math.cos(t * d.speed * 0.5 + i) * 0.18;
    });
  });

  return (
    <>
      {orbData.map((orb, i) => (
        <mesh key={i} ref={(el) => { meshRefs.current[i] = el; }} position={orb.pos}>
          <sphereGeometry args={[orb.size, 14, 14]} />
          <meshBasicMaterial color={orb.color} transparent opacity={0.75} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      ))}
    </>
  );
}

// ─── Mouse parallax camera ────────────────────────────────────────────────────
function CameraRig() {
  const mouse = useRef({ x: 0, y: 0 });

  useMemo(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame(({ camera }) => {
    camera.position.x += (mouse.current.x * 0.45 - camera.position.x) * 0.035;
    camera.position.y += (mouse.current.y * 0.28 - camera.position.y) * 0.035;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─── Scene root ───────────────────────────────────────────────────────────────
export default function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.7} color="#6366f1" />
      <pointLight position={[-5, -3, 3]} intensity={0.5} color="#06b6d4" />
      <pointLight position={[0, -5, 2]} intensity={0.3} color="#f472b6" />

      <Stars radius={90} depth={50} count={3000} factor={4} saturation={0} fade speed={0.4} />

      <ParticleField />
      <NetworkGraph />
      <FloatingIcosahedron />
      <DNAHelix />
      <FloatingOrbs />
      <CameraRig />
    </>
  );
}
