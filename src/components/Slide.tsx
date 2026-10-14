'use client';

import Link from 'next/link';
import { SimThumb } from './SimCanvas';
import { useApp } from '@/context/AppContext';
import { aidsOf } from '@/lib/data';
import { frameLabel, TYPES } from '@/lib/i18n';
import { SIMS } from '@/lib/sims';
import { THEMES } from '@/lib/themes';
import type { Aid } from '@/lib/types';

/** One aid as a filmstrip frame with its printed caption underneath. */
export function Slide({ aid, index, total }: { aid: Aid; index: number; total: number }) {
  const { lang, theme, t } = useApp();
  const live = !!aid.sim;

  return (
    <Link href={`/${aid.s}/${aid.id}`} className="slide">
      <div className={live ? 'frame' : 'frame is-unlit'}>
        {aid.sim ? (
          <SimThumb sim={SIMS[aid.sim]} palette={THEMES[theme]} />
        ) : (
          <div className="slide-blank" aria-hidden="true">
            {index}
          </div>
        )}
      </div>
      <div>
        <h3 className="slide-title">{aid[lang].title}</h3>
        <p className="slide-summary">{aid[lang].summary}</p>
        <div className="furniture" style={{ marginTop: 10 }}>
          <span>{frameLabel(t, index, total)}</span>
          <span>{aid.grade + ' ' + t.grade}</span>
          <span>{TYPES[aid.type][lang]}</span>
        </div>
        <div className={live ? 'slide-state is-live' : 'slide-state is-soon'}>{live ? t.liveBadge : t.soonBadge}</div>
      </div>
    </Link>
  );
}

/** The subject's whole film as small frames; the current one is lit. */
export function FilmStrip({ subjectId, currentId }: { subjectId: string; currentId: string }) {
  const { lang, ru } = useApp();
  const frames = aidsOf(subjectId);

  return (
    <nav className="strip" aria-label={ru ? 'Другие пособия предмета' : 'Other aids in this subject'}>
      {frames.map((a, i) => (
        <Link
          key={a.id}
          href={`/${a.s}/${a.id}`}
          className={a.sim ? 'strip-frame is-live' : 'strip-frame'}
          aria-current={a.id === currentId ? 'page' : undefined}
        >
          <i aria-hidden="true">{i + 1}</i>
          <span>{a[lang].title}</span>
        </Link>
      ))}
    </nav>
  );
}
