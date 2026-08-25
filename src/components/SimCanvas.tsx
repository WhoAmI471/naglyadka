'use client';

import { useEffect, useRef } from 'react';
import { THEMES } from '@/lib/themes';
import type { Sim, SimParams, Theme } from '@/lib/types';

interface Props {
  sim: Sim;
  params: SimParams;
  playing: boolean;
  theme: Theme;
  /** Change this value to rewind the scene to t = 0. */
  resetToken: number;
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
      const dpr = window.devicePixelRatio || 1;
      const w = cv.clientWidth;
      const h = cv.clientHeight;
      if (!w || !h) return;
      if (cv.width !== Math.round(w * dpr)) {
        cv.width = Math.round(w * dpr);
        cv.height = Math.round(h * dpr);
      }
      const ctx = cv.getContext('2d');
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const s = latest.current;
      s.sim.draw(ctx, w, h, s.params, timeRef.current, THEMES[s.theme]);
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

  return (
    <canvas ref={canvasRef} className="sim-canvas" />
  );
}
