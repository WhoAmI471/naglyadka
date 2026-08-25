import { ballistics } from './ballistics';
import { pendulum } from './pendulum';
import { titration } from './titration';
import type { Sim, SimId, SimParams } from '../types';

export const SIMS: Record<SimId, Sim> = { ballistics, pendulum, titration };

/** Fresh copy of every simulation default set. */
export function defaultParams(): Record<SimId, SimParams> {
  return {
    ballistics: { ...SIMS.ballistics.defaults },
    pendulum: { ...SIMS.pendulum.defaults },
    titration: { ...SIMS.titration.defaults },
  };
}

/** Clamp a value to a control range and snap it to the control step. */
export function clampToControl(sim: Sim, key: string, raw: number): number | null {
  const c = sim.controls.find((x) => x.key === key);
  if (!c || !isFinite(raw)) return null;
  const snapped = Math.round(raw / c.step) * c.step;
  return Math.min(c.max, Math.max(c.min, Number(snapped.toFixed(6))));
}

/**
 * Read simulation parameters out of a URL query, ignoring anything that is not
 * a known control. Used so a shared link restores the sliders it was made with.
 */
export function paramsFromQuery(
  simId: SimId,
  query: Record<string, string | string[] | undefined>,
): SimParams {
  const sim = SIMS[simId];
  const p: SimParams = { ...sim.defaults };
  sim.controls.forEach((c) => {
    const raw = query[c.key];
    const value = Array.isArray(raw) ? raw[0] : raw;
    if (value === undefined) return;
    const parsed = clampToControl(sim, c.key, parseFloat(value));
    if (parsed !== null) p[c.key] = parsed;
  });
  return p;
}
