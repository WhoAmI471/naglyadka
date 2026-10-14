'use client';

import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export default function NotFound() {
  const { ru, t } = useApp();

  return (
    <div className="not-found">
      <h1 className="aid-title">{ru ? 'Страница не найдена' : 'Page not found'}</h1>
      <p>
        {ru
          ? 'Такого пособия или предмета в каталоге нет — возможно, ссылка устарела.'
          : 'No such aid or subject in the catalog — the link may be out of date.'}
      </p>
      <Link href="/" className="btn">
        {t.backAll}
      </Link>
    </div>
  );
}
