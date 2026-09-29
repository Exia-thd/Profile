import { lazy, Suspense, useEffect, useRef, useState } from 'react';

const DeveloperScene = lazy(() => import('./DeveloperScene'));

/**
 * Holds the spot the developer stands in, and only mounts the WebGL scene once that
 * spot is near the viewport — so the three.js chunk is fetched when a visitor actually
 * scrolls to the room, not while the page is still painting.
 */
export default function DeveloperStage({ className = '' }: { className?: string }) {
  const slot = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const el = slot.current;
    if (!el) return;

    // No WebGL, no scene — the room still reads fine without him.
    const canvas = document.createElement('canvas');
    const hasWebGL = Boolean(
      canvas.getContext('webgl2') || canvas.getContext('webgl'),
    );
    if (!hasWebGL) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={slot} className={className} aria-hidden="true">
      {shouldMount && (
        <Suspense fallback={null}>
          <DeveloperScene />
        </Suspense>
      )}
    </div>
  );
}
