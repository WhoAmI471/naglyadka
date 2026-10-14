'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { aidsOf, countAids, SOON, SUBJECTS } from '@/lib/data';
import type { Lang, Theme } from '@/lib/types';

const THEME_OPTS: { id: Theme; key: 'dark' | 'light' }[] = [
  { id: 'dark', key: 'dark' },
  { id: 'light', key: 'light' },
];

const LANG_OPTS: { id: Lang; label: string }[] = [
  { id: 'ru', label: 'RU' },
  { id: 'en', label: 'EN' },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: Props) {
  const { lang, theme, t, setLang, setTheme } = useApp();
  const [activeSubject, activeAid] = usePathname().split('/').filter(Boolean);

  return (
    <aside className={open ? 'app-sidebar is-open' : 'app-sidebar'}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <Link href="/" className="brand">
          <span className="brand-name">{t.brand}</span>
          <span className="brand-sub">{t.brandSub}</span>
        </Link>
        <button
          type="button"
          className="icon-button sidebar-close"
          aria-label={t.closeMenu}
          tabIndex={open ? 0 : -1}
          onClick={onClose}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <nav className="rail-group" aria-label={t.catalog}>
        <div className="rail-label">{t.catalog}</div>
        {SUBJECTS.map((s) => {
          const on = activeSubject === s.id;
          return (
            <div key={s.id}>
              <Link
                href={`/${s.id}`}
                className={on ? 'rail-subject is-active' : 'rail-subject'}
                aria-current={on && !activeAid ? 'page' : undefined}
              >
                <span>{s[lang].name}</span>
                <span className="rail-count">{countAids(s.id)}</span>
              </Link>
              {on && (
                <div className="rail-aids">
                  {aidsOf(s.id).map((a) => (
                    <Link
                      key={a.id}
                      href={`/${s.id}/${a.id}`}
                      className={activeAid === a.id ? 'rail-aid is-active' : 'rail-aid'}
                      aria-current={activeAid === a.id ? 'page' : undefined}
                    >
                      {a[lang].title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="rail-group">
        <div className="rail-label">{t.soon}</div>
        <div className="rail-soon">{SOON.map((s) => s[lang]).join(' · ')}</div>
      </div>

      <div className="rail-prefs">
        <div>
          <div className="pref-label" id="pref-theme">
            {t.theme}
          </div>
          <div className="seg" role="group" aria-labelledby="pref-theme">
            {THEME_OPTS.map((o) => (
              <button key={o.id} type="button" aria-pressed={theme === o.id} onClick={() => setTheme(o.id)}>
                {t[o.key]}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="pref-label" id="pref-lang">
            {t.lang}
          </div>
          <div className="seg" role="group" aria-labelledby="pref-lang">
            {LANG_OPTS.map((o) => (
              <button key={o.id} type="button" aria-pressed={lang === o.id} onClick={() => setLang(o.id)}>
                {o.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
