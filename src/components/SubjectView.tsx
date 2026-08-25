'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { aidsOf } from '@/lib/data';
import { nAids, wordLive } from '@/lib/format';
import { TYPES } from '@/lib/i18n';
import { backLink, badge, card, chip, gradientSquare, sectionLabel, smallChip } from '@/lib/styles';
import type { AidType, Subject } from '@/lib/types';

const TYPE_ORDER: AidType[] = ['exp', 'model', 'graph', 'algo'];

export default function SubjectView({ subject }: { subject: Subject }) {
  const { lang, t } = useApp();
  const [type, setType] = useState<AidType | 'all'>('all');

  const mine = aidsOf(subject.id);
  const types: (AidType | 'all')[] = ['all', ...TYPE_ORDER.filter((k) => mine.some((a) => a.type === k))];
  const shown = mine.filter((a) => type === 'all' || a.type === type);
  const mineLive = mine.filter((a) => a.sim).length;

  return (
    <div className="view">
      <Link href="/" className="back-link" style={{ ...backLink, marginBottom: 16 }}>
        {t.backAll}
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
        <div style={gradientSquare(52, 14, 22)}>{subject.mono}</div>
        <div>
          <h1 className="page-title">{subject[lang].name}</h1>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>
            {nAids(mine.length, lang) + ' · ' + mineLive + ' ' + wordLive(mineLive, lang)}
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          flexWrap: 'wrap',
          padding: '12px 14px',
          border: '1px solid var(--line)',
          borderRadius: 14,
          background: 'var(--card-2)',
          marginBottom: 18,
        }}
      >
        <span style={{ ...sectionLabel, marginRight: 4 }}>{t.type}</span>
        {types.map((k) => (
          <button key={k} type="button" onClick={() => setType(k)} style={chip(type === k)}>
            {k === 'all' ? t.all : TYPES[k][lang]}
          </button>
        ))}
      </div>

      <div className="aid-grid">
        {shown.map((a) => (
          <Link key={a.id} href={`/${subject.id}/${a.id}`} className="card-hover" style={card}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
              <span style={smallChip}>{a.grade + ' ' + t.grade}</span>
              <span style={smallChip}>{TYPES[a.type][lang]}</span>
              <span style={badge(!!a.sim)}>{a.sim ? t.liveBadge : t.soonBadge}</span>
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 6, textWrap: 'pretty' }}>
              {a[lang].title}
            </div>
            <div style={{ fontSize: 13, color: 'var(--muted)', textWrap: 'pretty' }}>{a[lang].summary}</div>
            <div
              style={{
                marginTop: 12,
                fontSize: 12,
                fontWeight: 600,
                color: a.sim ? 'var(--primary)' : 'var(--dim)',
              }}
            >
              {a.sim ? t.open : t.preview}
            </div>
          </Link>
        ))}
      </div>

      {shown.length === 0 && (
        <div
          style={{
            padding: 40,
            textAlign: 'center',
            border: '1px dashed var(--line-2)',
            borderRadius: 14,
            color: 'var(--dim)',
            fontSize: 13.5,
          }}
        >
          {t.empty}
        </div>
      )}
    </div>
  );
}
