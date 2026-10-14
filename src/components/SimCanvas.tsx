'use client';

import { useEffect, useRef } from 'react';
import { setCanvasFont } from '@/lib/format';
import { THEMES } from '@/lib/themes';
import type { CanvasTheme, Sim, SimParams, Theme } from '@/lib/types';

interface Props {
  sim: Sim;
  params: SimParams;
  playing: boolean;
  theme: Theme;
  /** Change this value to rewind the scene to t = 0. */
  resetToken: number;
}

/** Size the backing store to the element and hand back a ready 2D context. */
function prepare(cv: HTMLCanvasElement): { ctx: CanvasRenderingContext2D; w: number; h: number } | null {
  const dpr = window.devicePixelRatio || 1;
  const w = cv.clientWidth;
  const h = cv.clientHeight;
  if (!w || !h) return null;
  if (cv.width !== Math.round(w * dpr) || cv.height !== Math.round(h * dpr)) {
    cv.width = Math.round(w * dpr);
    cv.height = Math.round(h * dpr);
  }
  const ctx = cv.getContext('2d');
  if (!ctx) return null;
  // Canvas labels use the page's own UI face.
  setCanvasFont(getComputedStyle(cv).fontFamily);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  return { ctx, w, h };
}

export default function SimCanvas({ sim, params, playing, theme, resetToken }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timeRef = useRef(0);
  const latest = useRef<Props>({ sim, params, playing, theme, resetToken });
  latest.current = { sim, params, playing, theme, resetToken };

  useEffect(() => {
    timeRef.current = 0;
  }, [resetToken]);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const paint = () => {
      const cv = canvasRef.current;
      if (!cv) return;
      const ready = prepare(cv);
      if (!ready) return;
      const s = latest.current;
      s.sim.draw(ready.ctx, ready.w, ready.h, s.params, timeRef.current, THEMES[s.theme]);
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (latest.current.playing) timeRef.current += dt;
      paint();
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={canvasRef} className="sim-canvas" />;
}

/** A still of a scene, painted once at a moment that shows it at work. */
export function SimThumb({ sim, palette, at = 1.4 }: { sim: Sim; palette: CanvasTheme; at?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    // Paint the full-size scene and shrink it, so the still keeps the
    // composition of the real frame instead of crowding its labels.
    const W = 720;
    const paint = () => {
      const ready = prepare(cv);
      if (!ready) return;
      const k = ready.w / W;
      const dpr = window.devicePixelRatio || 1;
      ready.ctx.setTransform(dpr * k, 0, 0, dpr * k, 0, 0);
      sim.draw(ready.ctx, W, ready.h / k, sim.defaults, at, palette);
    };
    paint();
    const ro = new ResizeObserver(paint);
    ro.observe(cv);
    // Repaint once the webfont lands so canvas labels pick it up.
    document.fonts?.ready.then(paint).catch(() => {});
    return () => ro.disconnect();
  }, [sim, palette, at]);

  return <canvas ref={canvasRef} className="slide-canvas" aria-hidden="true" />;
}
