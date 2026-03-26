import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

// Floating wireframe icosahedron on the right
function FloatingIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.15;
    meshRef.current.rotation.y = t * 0.22;
    meshRef.current.position.y = Math.sin(t * 0.6) * 0.25;
  });

  return (
    <mesh ref={meshRef} position={[3.2, 0, -1]}>
      <icosahedronGeometry args={[1.1, 1]} />
      <meshStandardMaterial
        color="#818cf8"
        wireframe
        opacity={0.35}
        transparent
      />
    </mesh>
  );
}

// Floating small orbs
function FloatingOrbs() {
  const orbData = useMemo(() => [
    { pos: [-3.5, 1.8, -2] as [number, number, number],  color: '#6366f1', size: 0.12, speed: 0.9 },
    { pos: [2.2, -1.8, -1.5] as [number, number, number], color: '#a78bfa', size: 0.09, speed: 1.2 },
    { pos: [-2.8, -1.2, -2.5] as [number, number, number], color: '#67e8f9', size: 0.1,  speed: 0.7 },
    { pos: [3.8, 1.2, -2] as [number, number, number],    color: '#818cf8', size: 0.08, speed: 1.4 },
    { pos: [0.5, 2.4, -2] as [number, number, number],    color: '#c4b5fd', size: 0.07, speed: 0.8 },
    { pos: [-1.2, -2.3, -1.8] as [number, number, number], color: '#22d3ee', size: 0.11, speed: 1.1 },
  ], []);

  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const d = orbData[i];
      mesh.position.y = d.pos[1] + Math.sin(t * d.speed + i) * 0.3;
      mesh.position.x = d.pos[0] + Math.cos(t * d.speed * 0.5 + i) * 0.15;
    });
  });

  return (
    <>
      {orbData.map((orb, i) => (
        <mesh
          key={i}
          ref={(el) => { meshRefs.current[i] = el; }}
          position={orb.pos}
        >
          <sphereGeometry args={[orb.size, 16, 16]} />
          <meshStandardMaterial color={orb.color} emissive={orb.color} emissiveIntensity={0.8} />
        </mesh>
      ))}
    </>
  );
}

// Network graph — nodes + edges representing microservices
function NetworkGraph() {
  const groupRef = useRef<THREE.Group>(null);

  const { nodePositions, edges } = useMemo(() => {
    const rng = (seed: number) => {
      let s = seed;
      return () => { s = (s * 16807 + 0) % 2147483647; return (s - 1) / 2147483646; };
    };
    const rand = rng(42);

    const count = 22;
    const nodePositions: [number, number, number][] = Array.from({ length: count }, () => [
      (rand() - 0.5) * 9,
      (rand() - 0.5) * 5,
      (rand() - 0.5) * 3 - 3,
    ]);

    // Connect nearby nodes
    const edges: [number, number][] = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = nodePositions[i][0] - nodePositions[j][0];
        const dy = nodePositions[i][1] - nodePositions[j][1];
        const dz = nodePositions[i][2] - nodePositions[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 3.2 && edges.length < 32) {
          edges.push([i, j]);
        }
      }
    }
    return { nodePositions, edges };
  }, []);

  // Build line segments geometry
  const lineGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (const [a, b] of edges) {
      points.push(new THREE.Vector3(...nodePositions[a]));
      points.push(new THREE.Vector3(...nodePositions[b]));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, [edges, nodePositions]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Edges */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#4f46e5" opacity={0.25} transparent />
      </lineSegments>

      {/* Nodes */}
      {nodePositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.065, 10, 10]} />
          <meshStandardMaterial color="#818cf8" emissive="#6366f1" emissiveIntensity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

// Mouse parallax camera rig
function CameraRig() {
  const mouse = useRef({ x: 0, y: 0 });

  useMemo(() => {
    const handler = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  useFrame(({ camera }) => {
    camera.position.x += (mouse.current.x * 0.4 - camera.position.x) * 0.03;
    camera.position.y += (mouse.current.y * 0.25 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#6366f1" />
      <pointLight position={[-5, -3, 3]} intensity={0.5} color="#06b6d4" />

      <Stars radius={80} depth={40} count={2500} factor={4} saturation={0} fade speed={0.5} />

      <NetworkGraph />
      <FloatingIcosahedron />
      <FloatingOrbs />
      <CameraRig />
    </>
  );
}
