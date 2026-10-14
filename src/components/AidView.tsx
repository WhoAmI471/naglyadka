'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import SimCanvas from './SimCanvas';
import { FilmStrip } from './Slide';
import { useApp } from '@/context/AppContext';
import { aidsOf } from '@/lib/data';
import { fmt } from '@/lib/format';
import { frameLabel, TYPES } from '@/lib/i18n';
import { SIMS } from '@/lib/sims';
import type { Aid, SimId, SimParams, Subject } from '@/lib/types';

interface Props {
  aid: Aid;
  subject: Subject;
  simId: SimId;
  initialParams: SimParams;
}

/** How long the moved slider and the numbers it changed keep the reserved colour. */
const CAUSE_HOLD_MS = 2200;

export default function AidView({ aid, subject, simId, initialParams }: Props) {
  const { lang, ru, t, theme, showToast } = useApp();
  const sim = SIMS[simId];

  const [params, setParams] = useState<SimParams>(initialParams);
  const [playing, setPlaying] = useState(true);
  const [resetToken, setResetToken] = useState(0);
  // Cause and effect: the control last moved, and the readouts it changed.
  const [cause, setCause] = useState<{ key: string; changed: string[] } | null>(null);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (holdTimer.current) clearTimeout(holdTimer.current);
  }, []);

  const frames = aidsOf(subject.id);
  const index = frames.findIndex((a) => a.id === aid.id) + 1;

  const readouts = sim.readouts(params, ru);
  const formulas = sim.formulas(params, ru);
  const caption = sim.caption(params, ru);

  const move = (key: string, value: number) => {
    const next = { ...params, [key]: value };
    const before = sim.readouts(params, ru);
    const after = sim.readouts(next, ru);
    const changed = after.filter((r, i) => r.value !== before[i]?.value).map((r) => r.label);
    setParams(next);
    setCause({ key, changed });
    if (holdTimer.current) clearTimeout(holdTimer.current);
    holdTimer.current = setTimeout(() => setCause(null), CAUSE_HOLD_MS);
  };

  const reset = () => {
    setParams({ ...sim.defaults });
    setCause(null);
    setResetToken((n) => n + 1);
  };

  const share = () => {
    const query = sim.controls.map((c) => `${c.key}=${params[c.key]}`).join('&');
    const origin = typeof window === 'undefined' ? '' : window.location.origin;
    const url = `${origin}/${aid.s}/${aid.id}?${query}`;
    if (navigator.clipboard) navigator.clipboard.writeText(url).catch(() => {});
    showToast(t.shared);
  };

  return (
    <div className="aid">
      <section className="aid-stage" aria-labelledby="aid-title">
        <h1 className="aid-title" id="aid-title">
          {aid[lang].title}
        </h1>
        <div className="furniture">
          <Link href={`/${subject.id}`}>{subject[lang].name}</Link>
          <span>{aid.grade + ' ' + t.grade}</span>
          <span>{TYPES[aid.type][lang]}</span>
          <span>{frameLabel(t, index, frames.length)}</span>
        </div>

        <div className="frame aid-frame" key={aid.id}>
          <SimCanvas sim={sim} params={params} playing={playing} theme={theme} resetToken={resetToken} />
          <div className="legend">
            {sim.legend.map((l) => (
              <span key={l.ru}>
                <i style={{ background: l.c }} aria-hidden="true" />
                {l[lang]}
              </span>
            ))}
          </div>
        </div>

        <p className="caption">
          {caption.map((part, i) => (typeof part === 'string' ? part : <b key={i}>{part.v}</b>))}
        </p>

      </section>

      {/* Under one column this follows the panel, so the sliders sit right under the scene. */}
      <div className="aid-more">
        <FilmStrip subjectId={subject.id} currentId={aid.id} />

        <div className="theory">
          <h2>{t.how}</h2>
          <p>{aid[lang].summary}</p>
          {aid[lang].theory && <p>{aid[lang].theory}</p>}
        </div>
      </div>

      <aside className="aid-panel" aria-label={t.params}>
        <div>
          <h2 className="panel-title">{t.params}</h2>
          {sim.controls.map((c) => {
            const unit = ru ? c.unit : c.unitEn || c.unit;
            const pct = ((params[c.key] - c.min) / (c.max - c.min)) * 100;
            const active = cause?.key === c.key;
            return (
              <div key={c.key} className={active ? 'control is-active' : 'control'}>
                <div className="control-head">
                  <label htmlFor={`ctl-${c.key}`}>{c[lang]}</label>
                  <span className="control-value">{fmt(params[c.key], c.d) + (unit === '°' ? '°' : ' ' + unit)}</span>
                </div>
                <input
                  id={`ctl-${c.key}`}
                  className="range"
                  type="range"
                  min={c.min}
                  max={c.max}
                  step={c.step}
                  value={params[c.key]}
                  style={{ ['--pct' as string]: pct + '%' }}
                  onChange={(e) => move(c.key, parseFloat(e.target.value))}
                />
              </div>
            );
          })}
          <div className="aid-actions" style={{ marginTop: 26 }}>
            <button type="button" className="btn" onClick={() => setPlaying((p) => !p)} aria-pressed={!playing}>
              {playing ? (
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M5 3v10M11 3v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M5 3.2v9.6L12.6 8z" fill="currentColor" />
                </svg>
              )}
              {playing ? t.pause : t.play}
            </button>
            <button type="button" className="btn" onClick={reset}>
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M3.2 8a4.8 4.8 0 1 0 1.5-3.5M3 2.6v2.6h2.6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {t.reset}
            </button>
            <button type="button" className="btn btn-lamp" onClick={share}>
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M6.6 9.4l2.8-2.8M7.4 4.6l1.2-1.2a2.6 2.6 0 0 1 3.7 3.7l-1.2 1.2M8.6 11.4l-1.2 1.2a2.6 2.6 0 0 1-3.7-3.7l1.2-1.2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              {t.share}
            </button>
          </div>
        </div>

        <div>
          <h2 className="panel-title">{t.result}</h2>
          <table className="readouts">
            <tbody>
              {readouts.map((r) => (
                <tr key={r.label} className={cause?.changed.includes(r.label) ? 'is-changed' : undefined}>
                  <th scope="row">{r.label}</th>
                  <td className="num">{r.value}</td>
                  <td className="unit">{r.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h2 className="panel-title">{t.formulas}</h2>
          {formulas.map((f) => (
            <div key={f.expr} className="formula">
              <div className="formula-expr">{f.expr}</div>
              <div className="formula-sub">{f.sub}</div>
              <div className="formula-note">{f.note}</div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
