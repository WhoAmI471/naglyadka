'use client';

import Link from 'next/link';
import { Slide } from './Slide';
import { useApp } from '@/context/AppContext';
import { AIDS, aidsOf, LIVE_COUNT, SOON, SUBJECTS } from '@/lib/data';
import { nAids, wordAids, wordLive, wordSubjects } from '@/lib/format';

export default function HomeView() {
  const { lang, t } = useApp();

  return (
    <div>
      <header className="home-head">
        <h1 className="view-title">{t.title}</h1>
        <p className="view-lede">{t.sub}</p>
        <div className="furniture" style={{ marginTop: 18 }}>
          <span>{SUBJECTS.length + ' ' + wordSubjects(SUBJECTS.length, lang)}</span>
          <span>{AIDS.length + ' ' + wordAids(AIDS.length, lang)}</span>
          <span>{LIVE_COUNT + ' ' + wordLive(LIVE_COUNT, lang)}</span>
        </div>
      </header>

      {SUBJECTS.map((s) => {
        const frames = aidsOf(s.id);
        const live = frames.filter((a) => a.sim).length;
        return (
          <section key={s.id} className="reel" aria-labelledby={`reel-${s.id}`}>
            <div className="reel-head">
              <div>
                <h2 className="reel-title" id={`reel-${s.id}`}>
                  <Link href={`/${s.id}`}>{s[lang].name}</Link>
                </h2>
                <p className="reel-desc">{s[lang].desc}</p>
                <p className="reel-topics">{s[lang].topics.join(' · ')}</p>
              </div>
              <div className="furniture">
                <span>{nAids(frames.length, lang)}</span>
                <span>{live + ' ' + wordLive(live, lang)}</span>
              </div>
            </div>
            <div className="reel-strip">
              {frames.map((a, i) => (
                <Slide key={a.id} aid={a} index={i + 1} total={frames.length} />
              ))}
            </div>
          </section>
        );
      })}

      <p className="soon-line">
        <strong>{t.soon}:</strong> {SOON.map((s) => s[lang]).join(' · ')}
      </p>
    </div>
  );
}
