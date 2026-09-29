/**
 * Value noise + fBm + ridged noise, written out rather than pulled from a package:
 * the terrain needs the exact same function on the CPU (to place the route on the
 * ground) and nothing else in the project needs a noise library.
 */

function hash2(x: number, y: number): number {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return s - Math.floor(s);
}

const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Value noise in [-1, 1]. */
export function noise2(x: number, y: number): number {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;

  const a = hash2(xi, yi);
  const b = hash2(xi + 1, yi);
  const c = hash2(xi, yi + 1);
  const d = hash2(xi + 1, yi + 1);

  const u = fade(xf);
  const v = fade(yf);
  return lerp(lerp(a, b, u), lerp(c, d, u), v) * 2 - 1;
}

/** Fractal Brownian motion — the broad shape of the range. */
export function fbm(x: number, y: number, octaves = 5, lacunarity = 2.02, gain = 0.5): number {
  let sum = 0;
  let amp = 0.5;
  let freq = 1;
  let norm = 0;
  for (let i = 0; i < octaves; i++) {
    sum += amp * noise2(x * freq, y * freq);
    norm += amp;
    amp *= gain;
    freq *= lacunarity;
  }
  return sum / norm;
}

/** Ridged noise — sharp crests, which is what reads as a mountain rather than a dune. */
export function ridged(x: number, y: number, octaves = 5, lacunarity = 2.07, gain = 0.5): number {
  let sum = 0;
  let amp = 0.5;
  let freq = 1;
  let norm = 0;
  for (let i = 0; i < octaves; i++) {
    const n = 1 - Math.abs(noise2(x * freq, y * freq));
    sum += amp * n * n;
    norm += amp;
    amp *= gain;
    freq *= lacunarity;
  }
  return sum / norm;
}

/**
 * The height field. Shared by the terrain mesh and by the route sampler, so the camera
 * path always sits on the ground it can see.
 */
export function terrainHeight(x: number, z: number): number {
  const base = fbm(x * 0.0014, z * 0.0014, 5) * 210;
  const crest = ridged(x * 0.0026, z * 0.0026, 6) * 820;
  const detail = fbm(x * 0.012, z * 0.012, 3) * 22;

  // A valley carved along x ≈ 0 so the route has somewhere to start low and climb out of.
  const valley = Math.exp(-(x * x) / (2 * 620 * 620));
  const massif = Math.max(0, (z + 1500) / 3400); // ground rises toward +z

  return (base + crest * (0.35 + massif * 0.95) + detail) * (1 - valley * 0.72) - 60;
}
