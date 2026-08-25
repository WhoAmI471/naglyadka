'use client';

import Link from 'next/link';
import { useState } from 'react';
import SimCanvas from './SimCanvas';
import { useApp } from '@/context/AppContext';
import { fmt } from '@/lib/format';
import { SIMS } from '@/lib/sims';
import { backLink, ghostButton, panel, primaryButton, sectionLabel, softPanel } from '@/lib/styles';
import type { Aid, SimId, SimParams, Subject } from '@/lib/types';

interface Props {
  aid: Aid;
  subject: Subject;
  simId: SimId;
  initialParams: SimParams;
}

const MONO = "'JetBrains Mono', ui-monospace, monospace";

export default function AidView({ aid, subject, simId, initialParams }: Props) {
  const { lang, ru, t, theme, showToast } = useApp();
  const sim = SIMS[simId];

  const [params, setParams] = useState<SimParams>(initialParams);
  const [playing, setPlaying] = useState(true);
  const [resetToken, setResetToken] = useState(0);

  const reset = () => {
    setParams({ ...sim.defaults });
    setResetToken((n) => n + 1);
  };

  const share = () => {
    const query = sim.controls.map((c) => `${c.key}=${params[c.key]}`).join('&');
    const origin = typeof window === 'undefined' ? '' : window.location.origin;
    const url = `${origin}/${aid.s}/${aid.id}?${query}`;
    if (navigator.clipboard) navigator.clipboard.writeText(url).catch(() => {});
    showToast(t.shared);
  };

  const readouts = sim.readouts(params, ru);
  const formulas = sim.formulas(params, ru);

  return (
    <div className="view">
      <Link href={`/${subject.id}`} className="back-link" style={{ ...backLink, marginBottom: 14 }}>
        {'← ' + subject[lang].name}
      </Link>

      <div className="aid-header">
        <div>
          <h1 className="aid-title">{aid[lang].title}</h1>
          <div style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 640, textWrap: 'pretty' }}>
            {aid[lang].summary}
          </div>
        </div>
        <div className="aid-actions">
          <button type="button" onClick={() => setPlaying((p) => !p)} style={primaryButton}>
            {playing ? t.pause : t.play}
          </button>
          <button type="button" onClick={reset} className="ghost-button" style={ghostButton}>
            {t.reset}
          </button>
          <button type="button" onClick={share} className="ghost-button" style={ghostButton}>
            {t.share}
          </button>
        </div>
      </div>

      <div className="aid-layout">
        <div className="aid-canvas-panel">
          <SimCanvas sim={sim} params={params} playing={playing} theme={theme} resetToken={resetToken} />
          <div
            style={{
              display: 'flex',
              gap: 16,
              flexWrap: 'wrap',
              padding: '10px 4px 2px',
              fontSize: 11.5,
              color: 'var(--dim)',
            }}
          >
            {sim.legend.map((l) => (
              <span key={l.ru} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <i style={{ width: 8, height: 8, borderRadius: '50%', background: l.c, display: 'inline-block' }} />
                {l[lang]}
              </span>
            ))}
          </div>
        </div>

        <div className="aid-side">
          <div style={panel}>
            <div style={{ ...sectionLabel, marginBottom: 14 }}>{t.params}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {sim.controls.map((c) => {
                const unit = ru ? c.unit : c.unitEn || c.unit;
                return (
                  <div key={c.key}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        gap: 10,
                        marginBottom: 8,
                      }}
                    >
                      <label htmlFor={`ctl-${c.key}`} style={{ fontSize: 12.5, color: 'var(--muted)' }}>
                        {c[lang]}
                      </label>
                      <span
                        style={{
                          fontSize: 12.5,
                          fontWeight: 700,
                          color: 'var(--primary)',
                          fontVariantNumeric: 'tabular-nums',
                        }}
                      >
                        {fmt(params[c.key], c.d) + ' ' + unit}
                      </span>
                    </div>
                    <input
                      id={`ctl-${c.key}`}
                      type="range"
                      min={c.min}
                      max={c.max}
                      step={c.step}
                      value={params[c.key]}
                      onChange={(e) => setParams((prev) => ({ ...prev, [c.key]: parseFloat(e.target.value) }))}
                      style={{ width: '100%' }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div style={panel}>
            <div style={{ ...sectionLabel, marginBottom: 12 }}>{t.result}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {readouts.map((r) => (
                <div
                  key={r.label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    gap: 12,
                    padding: '8px 10px',
                    borderRadius: 10,
                    background: 'var(--inset)',
                  }}
                >
                  <span style={{ fontSize: 12.5, color: 'var(--muted)' }}>{r.label}</span>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {r.value} <span style={{ fontSize: 11.5, fontWeight: 500, color: 'var(--dim)' }}>{r.unit}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="panel-grid">
        <div style={softPanel}>
          <div style={{ ...sectionLabel, marginBottom: 12 }}>{t.formulas}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {formulas.map((f) => (
              <div
                key={f.expr}
                style={{
                  padding: '12px 14px',
                  borderRadius: 12,
                  border: '1px solid var(--line)',
                  background: 'var(--inset)',
                }}
              >
                <div
                  className="formula-line"
                  style={{ fontFamily: MONO, fontSize: 14.5, color: 'var(--violet)', marginBottom: 5 }}
                >
                  {f.expr}
                </div>
                <div
                  className="formula-line"
                  style={{ fontFamily: MONO, fontSize: 13, color: 'var(--text)', marginBottom: 5 }}
                >
                  {f.sub}
                </div>
                <div style={{ fontSize: 11.5, color: 'var(--dim)' }}>{f.note}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={softPanel}>
          <div style={{ ...sectionLabel, marginBottom: 12 }}>{t.how}</div>
          <div style={{ fontSize: 13.5, color: 'var(--text)', textWrap: 'pretty' }}>{aid[lang].theory}</div>
        </div>
      </div>
    </div>
  );
}
