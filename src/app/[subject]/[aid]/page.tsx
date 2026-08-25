import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import AidView from '@/components/AidView';
import StubView from '@/components/StubView';
import { getAid, getSubject } from '@/lib/data';
import { paramsFromQuery } from '@/lib/sims';
import { LANG_COOKIE, toLang } from '@/lib/prefs';

interface PageProps {
  params: Promise<{ subject: string; aid: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { subject: subjectId, aid: aidId } = await params;
  const aid = getAid(aidId);
  if (!aid || aid.s !== subjectId) return {};
  const lang = toLang((await cookies()).get(LANG_COOKIE)?.value);
  return { title: aid[lang].title, description: aid[lang].summary };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { subject: subjectId, aid: aidId } = await params;
  const subject = getSubject(subjectId);
  const aid = getAid(aidId);
  if (!subject || !aid || aid.s !== subject.id) notFound();

  if (!aid.sim) return <StubView aid={aid} subject={subject} />;

  // A shared link carries the slider values it was made with.
  const query = await searchParams;
  const initialParams = paramsFromQuery(aid.sim, query);

  return <AidView aid={aid} subject={subject} simId={aid.sim} initialParams={initialParams} />;
}
