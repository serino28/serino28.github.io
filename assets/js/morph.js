/* The symbol: one wide cloud of points that never stops changing.

   Every position is an analytic function of time, so there is no loop to
   restart and nothing to pause. Three "states" are blended with softmax
   weights driven by sines at unrelated frequencies, so transitions are smooth
   and the whole never repeats:

     polygon   an irregular polygon whose vertices wander, points sliding along it
     cloud     a few drifting clusters of loose points
     manifold  a wireframe surface (torus, sphere, vase) that keeps rippling

   Edges fade in and out with their state. The shape is stretched wide and
   tilted by oscillating rotations, so it stays spread across the canvas. */
(() => {
  'use strict';

  const COLS = 44, ROWS = 8, N = COLS * ROWS, TAU = Math.PI * 2;
  const INK = '22, 22, 20';
  const FOCAL = 6;

  const canvas = document.querySelector('.morph');
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext('2d');
  const still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Fixed random layout for the cloud state
  function mulberry(seed) {
    return () => {
      seed = (seed + 0x6D2B79F5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const rand = mulberry(7);
  const dir = [], rad = [];
  for (let i = 0; i < N; i++) {
    const z = rand() * 2 - 1, a = rand() * TAU, r = Math.sqrt(1 - z * z);
    dir.push([r * Math.cos(a), r * Math.sin(a), z]);
    rad.push(0.25 + 0.75 * Math.cbrt(rand()));
  }

  // Edge families (pairs of point indices)
  const ring = [], gridU = [], gridV = [], wrapV = [];
  for (let i = 0; i < N; i++) ring.push([i, (i + 1) % N]);
  for (let j = 0; j < ROWS; j++) {
    for (let c = 0; c < COLS; c++) {
      gridU.push([j * COLS + c, j * COLS + ((c + 1) % COLS)]);
      if (j < ROWS - 1) gridV.push([j * COLS + c, (j + 1) * COLS + c]);
    }
  }
  for (let c = 0; c < COLS; c++) wrapV.push([(ROWS - 1) * COLS + c, c]);

  const smooth = (a, b, x) => {
    const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
  };
  const softmax = (l, beta) => {
    const e = l.map(v => Math.exp(beta * v)), s = e[0] + e[1] + e[2];
    return [e[0] / s, e[1] / s, e[2] / s];
  };

  const P = new Float32Array(N * 3);   // blended positions
  const Q = new Float32Array(N * 3);   // after rotation

  function compute(t, stretch) {
    // Which state dominates right now
    const [wp, wc, wm] = softmax([
      Math.sin(0.19 * t + 0.4) + 0.6 * Math.sin(0.41 * t + 2.0),
      Math.sin(0.23 * t + 2.3) + 0.6 * Math.sin(0.37 * t + 4.1),
      Math.sin(0.17 * t + 4.4) + 0.6 * Math.sin(0.47 * t + 0.9)
    ], 3.0);
    // Which surface the manifold is
    const [wsph, wtor, wvase] = softmax([
      Math.sin(0.21 * t + 1.1), Math.sin(0.27 * t + 3.3), Math.sin(0.15 * t + 5.2)
    ], 2.2);

    // Polygon: K wandering vertices, points slide along the perimeter
    const K = 7, V = [];
    for (let j = 0; j < K; j++) {
      const th = TAU * j / K + 0.45 * Math.sin(0.23 * t + j * 1.7);
      const r = 0.66 + 0.3 * Math.sin(0.31 * t + j * 2.3) + 0.12 * Math.sin(0.53 * t + j * 0.9);
      V.push([r * Math.cos(th), r * Math.sin(th), 0.45 * Math.sin(0.27 * t + j * 1.1)]);
    }

    // Cloud: three drifting cluster centers
    const C = [];
    for (let k = 0; k < 3; k++) {
      C.push([
        0.55 * Math.sin(0.19 * t + k * 2.1),
        0.5 * Math.cos(0.23 * t + k * 1.7),
        0.5 * Math.sin(0.17 * t + k * 0.9 + 1)
      ]);
    }

    for (let i = 0; i < N; i++) {
      const col = i % COLS, row = (i / COLS) | 0;

      // polygon
      const u = (((i / N + 0.04 * t) % 1) + 1) % 1 * K, j = Math.floor(u), f = u - j;
      const A = V[j % K], B = V[(j + 1) % K];
      const pp = [A[0] + (B[0] - A[0]) * f, A[1] + (B[1] - A[1]) * f, A[2] + (B[2] - A[2]) * f];

      // cloud
      const c = C[Math.min(2, (i * 3 / N) | 0)], d = dir[i];   // contiguous clusters keep neighbors close
      const sp = rad[i] * (0.42 + 0.1 * Math.sin(0.37 * t + i * 1.9));
      const pc = [
        c[0] + d[0] * sp + 0.07 * Math.sin(0.6 * t + i * 0.7),
        c[1] + d[1] * sp + 0.07 * Math.sin(0.5 * t + i * 1.3),
        c[2] + d[2] * sp + 0.07 * Math.sin(0.45 * t + i * 2.1)
      ];

      // manifold
      const ang = TAU * col / COLS, vt = row / (ROWS - 1);
      const cu = Math.cos(ang), su = Math.sin(ang);
      const th = Math.PI * (row + 0.5) / ROWS, va = TAU * row / ROWS;
      const rr = 0.62 + 0.3 * Math.cos(va) + 0.04 * Math.sin(0.5 * t);
      const tor = [rr * cu, 0.3 * Math.sin(va) * (1 + 0.2 * Math.sin(0.4 * t)), rr * su];
      const sph = [0.9 * Math.sin(th) * cu, 0.9 * Math.cos(th), 0.9 * Math.sin(th) * su];
      const rv = 0.5 + 0.32 * Math.cos(TAU * vt + 0.5 * t);
      const vase = [rv * cu, (vt - 0.5) * 1.9, rv * su];
      const ripple = 1 + 0.16 * Math.sin(3 * ang + 0.6 * t + 2.1 * vt) * Math.cos(2.2 * Math.PI * vt - 0.45 * t);
      const pm = [
        (wsph * sph[0] + wtor * tor[0] + wvase * vase[0]) * ripple,
        (wsph * sph[1] + wtor * tor[1] + wvase * vase[1]) * ripple,
        (wsph * sph[2] + wtor * tor[2] + wvase * vase[2]) * ripple
      ];

      for (let a = 0; a < 3; a++) P[i * 3 + a] = wp * pp[a] + wc * pc[a] + wm * pm[a];
    }

    // Stretch wide, then tilt with rotations that oscillate and never settle
    const ay = 0.55 * Math.sin(0.17 * t) + 0.25 * Math.sin(0.31 * t + 1);
    const ax = 0.35 + 0.3 * Math.sin(0.13 * t + 2);
    const az = 0.12 * Math.sin(0.11 * t + 4);
    const cy = Math.cos(ay), sy = Math.sin(ay), cx = Math.cos(ax), sx = Math.sin(ax), cz = Math.cos(az), sz = Math.sin(az);
    for (let i = 0; i < N; i++) {
      let x = P[i * 3] * stretch, y = P[i * 3 + 1] * 0.85, z = P[i * 3 + 2] * 0.9, t1;
      t1 = x * cy + z * sy; z = -x * sy + z * cy; x = t1;       // around y
      t1 = y * cx - z * sx; z = y * sx + z * cx; y = t1;        // around x
      t1 = x * cz - y * sz; y = x * sz + y * cz; x = t1;        // around z
      Q[i * 3] = x; Q[i * 3 + 1] = y; Q[i * 3 + 2] = z;
    }
    return { wp, wc, wm, wtor };
  }

  let W = 0, H = 0, dpr = 1;
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = Math.round(canvas.clientWidth * dpr);
    H = Math.round(canvas.clientHeight * dpr);
    canvas.width = W;
    canvas.height = H;
  }

  const sx = new Float32Array(N), sy = new Float32Array(N), sc = new Float32Array(N), da = new Float32Array(N);
  let kSmooth = 0;
  const BUCKETS = 6;

  function draw(t) {
    const stretch = Math.min(3.4, Math.max(1.4, 0.8 * W / H));
    const w = compute(t, stretch);
    ctx.clearRect(0, 0, W, H);

    // Perspective, then scale so the shape always fits the canvas
    let maxX = 0.001, maxY = 0.001;
    for (let i = 0; i < N; i++) {
      const z = Q[i * 3 + 2], s = FOCAL / (FOCAL - z);
      sc[i] = s;
      sx[i] = Q[i * 3] * s;
      sy[i] = Q[i * 3 + 1] * s;
      da[i] = Math.min(1, Math.max(0.3, 0.62 + 0.4 * z));
      maxX = Math.max(maxX, Math.abs(sx[i]));
      maxY = Math.max(maxY, Math.abs(sy[i]));
    }
    // Fit exactly (never clip); grow gently so the zoom breathes instead of jumping
    const kFit = Math.min(0.47 * W / maxX, 0.46 * H / maxY, H);
    kSmooth = kSmooth ? Math.min(kFit, kSmooth + (kFit - kSmooth) * 0.05) : kFit;
    const k = kSmooth;
    for (let i = 0; i < N; i++) { sx[i] = W / 2 + sx[i] * k; sy[i] = H / 2 + sy[i] * k; }

    // Edges, batched by opacity so a frame costs a handful of strokes
    ctx.lineWidth = 0.85 * dpr;
    ctx.lineCap = 'round';
    const edges = (list, alpha) => {
      if (alpha < 0.02) return;
      const paths = Array.from({ length: BUCKETS }, () => new Path2D());
      for (const [a, b] of list) {
        const e = Math.min(0.999, alpha * (da[a] + da[b]) / 2);
        const p = paths[(e * BUCKETS) | 0];
        p.moveTo(sx[a], sy[a]); p.lineTo(sx[b], sy[b]);
      }
      for (let b = 0; b < BUCKETS; b++) {
        ctx.strokeStyle = `rgba(${INK}, ${(0.5 * (b + 0.5) / BUCKETS).toFixed(3)})`;
        ctx.stroke(paths[b]);
      }
    };
    // Lines only show once a state clearly dominates; in between, just points drifting
    const aPoly = smooth(0.7, 0.93, w.wp), aMesh = smooth(0.7, 0.93, w.wm);
    edges(ring, aPoly);
    edges(gridU, aMesh);
    edges(gridV, aMesh);
    edges(wrapV, aMesh * smooth(0.35, 0.75, w.wtor));

    // Points
    const r0 = (0.8 + 0.7 * w.wc) * dpr;
    const dots = Array.from({ length: BUCKETS }, () => new Path2D());
    for (let i = 0; i < N; i++) {
      const p = dots[Math.min(BUCKETS - 1, (da[i] * BUCKETS) | 0)];
      const r = r0 * sc[i];
      p.moveTo(sx[i] + r, sy[i]);
      p.arc(sx[i], sy[i], r, 0, TAU);
    }
    for (let b = 0; b < BUCKETS; b++) {
      ctx.fillStyle = `rgba(${INK}, ${(0.95 * (b + 0.5) / BUCKETS).toFixed(3)})`;
      ctx.fill(dots[b]);
    }
  }

  resize();
  if (window.ResizeObserver) {
    new ResizeObserver(() => { resize(); if (still) draw(5); }).observe(canvas);
  }

  if (still) { draw(5); return; }
  const loop = () => { draw(performance.now() / 1000); requestAnimationFrame(loop); };
  requestAnimationFrame(loop);
})();
