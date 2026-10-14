'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Slide } from './Slide';
import { useApp } from '@/context/AppContext';
import { aidsOf } from '@/lib/data';
import { nAids, wordLive } from '@/lib/format';
import { TYPES } from '@/lib/i18n';
import type { AidType, Subject } from '@/lib/types';

const TYPE_ORDER: AidType[] = ['exp', 'model', 'graph', 'algo'];

export default function SubjectView({ subject }: { subject: Subject }) {
  const { lang, t } = useApp();
  const [type, setType] = useState<AidType | 'all'>('all');

  const mine = aidsOf(subject.id);
  const types: (AidType | 'all')[] = ['all', ...TYPE_ORDER.filter((k) => mine.some((a) => a.type === k))];
  const mineLive = mine.filter((a) => a.sim).length;

  return (
    <div>
      <header>
        <h1 className="view-title">{subject[lang].name}</h1>
        <p className="view-lede">{subject[lang].desc}</p>
        <div className="furniture" style={{ marginTop: 16 }}>
          <span>{nAids(mine.length, lang)}</span>
          <span>{mineLive + ' ' + wordLive(mineLive, lang)}</span>
          <Link href="/">{t.backAll}</Link>
        </div>
      </header>

      <div className="filter-row">
        <span className="filter-label" id="type-filter">
          {t.type}
        </span>
        <div className="seg" role="group" aria-labelledby="type-filter">
          {types.map((k) => (
            <button key={k} type="button" aria-pressed={type === k} onClick={() => setType(k)}>
              {k === 'all' ? t.all : TYPES[k][lang]}
            </button>
          ))}
        </div>
      </div>

      {/* Frame numbers stay the subject's own order, whatever the filter shows. */}
      <div className="slide-grid">
        {mine.map((a, i) =>
          type === 'all' || a.type === type ? <Slide key={a.id} aid={a} index={i + 1} total={mine.length} /> : null,
        )}
      </div>

      {!mine.some((a) => type === 'all' || a.type === type) && <div className="empty-frame">{t.empty}</div>}
    </div>
  );
}
