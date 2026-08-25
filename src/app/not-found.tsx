'use client';

import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { backLink } from '@/lib/styles';

export default function NotFound() {
  const { ru, t } = useApp();

  return (
    <div className="view" style={{ maxWidth: 620 }}>
      <h1 className="aid-title">{ru ? 'Страница не найдена' : 'Page not found'}</h1>
      <div style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 20, textWrap: 'pretty' }}>
        {ru
          ? 'Такого пособия или предмета в каталоге нет — возможно, ссылка устарела.'
          : 'No such aid or subject in the catalog — the link may be out of date.'}
      </div>
      <Link href="/" className="back-link" style={backLink}>
        {t.backAll}
      </Link>
    </div>
  );
}
