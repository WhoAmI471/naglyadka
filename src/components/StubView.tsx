'use client';

import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { backLink } from '@/lib/styles';
import type { Aid, Subject } from '@/lib/types';

export default function StubView({ aid, subject }: { aid: Aid; subject: Subject }) {
  const { lang, t } = useApp();

  return (
    <div className="view" style={{ maxWidth: 620 }}>
      <Link href={`/${subject.id}`} className="back-link" style={{ ...backLink, marginBottom: 14 }}>
        {'← ' + subject[lang].name}
      </Link>
      <h1 className="aid-title">{aid[lang].title}</h1>
      <div style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 20, textWrap: 'pretty' }}>
        {aid[lang].summary}
      </div>
      <div
        style={{
          padding: 26,
          border: '1px dashed var(--line-2)',
          borderRadius: 16,
          background: 'var(--card-2)',
          fontSize: 13.5,
          color: 'var(--muted)',
          textWrap: 'pretty',
        }}
      >
        {t.stub}
      </div>
    </div>
  );
}
