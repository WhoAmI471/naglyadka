'use client';

import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { AIDS, countAids, LIVE_COUNT, SUBJECTS } from '@/lib/data';
import { nAids, wordAids, wordLive, wordSubjects } from '@/lib/format';
import { card, gradientSquare } from '@/lib/styles';

export default function HomeView() {
  const { lang, t } = useApp();

  const heroStats = [
    { value: String(SUBJECTS.length), label: wordSubjects(SUBJECTS.length, lang) },
    { value: String(AIDS.length), label: wordAids(AIDS.length, lang) },
    { value: String(LIVE_COUNT), label: wordLive(LIVE_COUNT, lang) },
  ];

  return (
    <div className="view">
      <div style={{ maxWidth: 740, marginBottom: 26 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--primary)',
            marginBottom: 10,
          }}
        >
          {t.eyebrow}
        </div>
        <h1 className="hero-title">{t.title}</h1>
        <p style={{ margin: 0, fontSize: 15, color: 'var(--muted)', textWrap: 'pretty' }}>{t.sub}</p>
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
        {heroStats.map((s) => (
          <div
            key={s.label}
            style={{
              padding: '10px 14px',
              border: '1px solid var(--line)',
              borderRadius: 12,
              background: 'var(--card-2)',
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>{s.value}</div>
            <div style={{ fontSize: 11.5, color: 'var(--dim)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="subject-grid">
        {SUBJECTS.map((s) => (
          <Link key={s.id} href={`/${s.id}`} className="card-hover" style={card}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={gradientSquare(44, 12, 18)}>{s.mono}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.02em' }}>{s[lang].name}</div>
                <div style={{ fontSize: 11.5, color: 'var(--dim)' }}>{nAids(countAids(s.id), lang)}</div>
              </div>
            </div>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 12, textWrap: 'pretty' }}>
              {s[lang].desc}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {s[lang].topics.map((topic) => (
                <span
                  key={topic}
                  style={{
                    padding: '4px 9px',
                    borderRadius: 20,
                    border: '1px solid var(--line)',
                    background: 'var(--inset)',
                    fontSize: 11,
                    color: 'var(--muted)',
                  }}
                >
                  {topic}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
