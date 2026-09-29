import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import DeveloperCharacter from './DeveloperCharacter';

/**
 * WebGL stage for the developer standing beside the rack.
 *
 * The render loop is demand-driven while the section is off screen, so a visitor who
 * never scrolls this far pays nothing for it beyond the (lazily loaded) chunk.
 */
export default function DeveloperScene() {
  const wrapper = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  // Only run the loop while the room is actually on screen.
  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '150px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Track the cursor across the whole room so the head turns toward the visitor.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = wrapper.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      pointer.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.current.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <div ref={wrapper} className="absolute inset-0" aria-hidden="true">
      <Canvas
        shadows
        // Cap the pixel ratio: a 3x phone screen would otherwise render 9x the pixels.
        dpr={[1, 2]}
        frameloop={visible ? 'always' : 'never'}
        // The slot is tall and narrow; three's fov is vertical, so the distance is set
        // to fit a ~2.2 unit figure head to toe with a little air above and below.
        camera={{ position: [0, 0.18, 5.2], fov: 30 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        onCreated={({ gl }) => {
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
          gl.toneMappingExposure = 1.0;
        }}
      >
        {/* Room ambience, kept dim so the rim lights do the shaping */}
        <ambientLight intensity={0.5} color="#8e9ad6" />
        <hemisphereLight args={['#6d7fe0', '#0a1024', 0.55]} />

        {/* Key light standing in for the cyan ceiling bar */}
        <directionalLight
          position={[2.4, 4.2, 2.6]}
          intensity={1.25}
          color="#dff2ff"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0012}
          shadow-camera-near={0.5}
          shadow-camera-far={12}
          shadow-camera-left={-3}
          shadow-camera-right={3}
          shadow-camera-top={3}
          shadow-camera-bottom={-3}
        />
        {/* Violet rim from the other ceiling bar, separating him from the far wall */}
        <directionalLight position={[-3, 2.6, -2.2]} intensity={1.1} color="#9d8cff" />
        {/* Cool bounce off the floor */}
        <pointLight position={[0, -1.4, 1.4]} intensity={0.7} color="#22d3ee" distance={5} decay={2} />

        <DeveloperCharacter pointer={pointer} reducedMotion={reducedMotion} />

        {/* Floor catching his shadow — shadow only, no surface of its own */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.995, 0]} receiveShadow>
          <planeGeometry args={[7, 7]} />
          <shadowMaterial opacity={0.55} />
        </mesh>
      </Canvas>
    </div>
  );
}
