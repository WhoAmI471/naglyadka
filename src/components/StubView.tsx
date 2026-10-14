'use client';

import Link from 'next/link';
import { FilmStrip } from './Slide';
import { useApp } from '@/context/AppContext';
import { aidsOf } from '@/lib/data';
import { frameLabel, TYPES } from '@/lib/i18n';
import type { Aid, Subject } from '@/lib/types';

/** An aid whose scene is not built yet: the frame is in the gate, unlit. */
export default function StubView({ aid, subject }: { aid: Aid; subject: Subject }) {
  const { lang, t } = useApp();
  const frames = aidsOf(subject.id);
  const index = frames.findIndex((a) => a.id === aid.id) + 1;

  return (
    <div className="stub">
      <h1 className="aid-title">{aid[lang].title}</h1>
      <div className="furniture" style={{ marginTop: 12 }}>
        <Link href={`/${subject.id}`}>{subject[lang].name}</Link>
        <span>{aid.grade + ' ' + t.grade}</span>
        <span>{TYPES[aid.type][lang]}</span>
        <span>{frameLabel(t, index, frames.length)}</span>
      </div>
      <p className="view-lede">{aid[lang].summary}</p>

      <div className="frame is-unlit">
        <span className="stub-mark" aria-hidden="true">
          {index}
        </span>
      </div>
      <p className="caption" style={{ fontSize: 20, color: 'var(--muted)', maxWidth: '52ch' }}>
        {t.stub}
      </p>

      <FilmStrip subjectId={subject.id} currentId={aid.id} />
    </div>
  );
}
