import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

import { Stars } from '@react-three/drei';
import * as THREE from 'three';

function RotatingTorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.12;
    meshRef.current.rotation.y = t * 0.18;
    meshRef.current.rotation.z = t * 0.08;
  });

  return (
    <mesh ref={meshRef} position={[3, 0, -3]}>
      <torusKnotGeometry args={[1.0, 0.28, 128, 16]} />
      <meshStandardMaterial
        color="#7c3aed"
        wireframe
        opacity={0.2}
        transparent
      />
    </mesh>
  );
}

function FloatingRing() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.3) * 0.2;
    meshRef.current.rotation.z = t * 0.1;
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.3;
  });

  return (
    <mesh ref={meshRef} position={[-3.5, 0.5, -2.5]}>
      <torusGeometry args={[0.8, 0.04, 16, 60]} />
      <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.5} opacity={0.5} transparent />
    </mesh>
  );
}

export default function SkillsDecor() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[4, 4, 4]} intensity={0.6} color="#7c3aed" />
      <pointLight position={[-4, -2, 2]} intensity={0.4} color="#06b6d4" />
      <Stars radius={60} depth={30} count={1200} factor={3} saturation={0} fade speed={0.3} />
      <RotatingTorusKnot />
      <FloatingRing />
    </>
  );
}
