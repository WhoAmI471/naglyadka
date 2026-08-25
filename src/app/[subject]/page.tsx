import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import SubjectView from '@/components/SubjectView';
import { getSubject } from '@/lib/data';
import { LANG_COOKIE, toLang } from '@/lib/prefs';

interface PageProps {
  params: Promise<{ subject: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { subject: subjectId } = await params;
  const subject = getSubject(subjectId);
  if (!subject) return {};
  const lang = toLang((await cookies()).get(LANG_COOKIE)?.value);
  return { title: subject[lang].name, description: subject[lang].desc };
}

export default async function Page({ params }: PageProps) {
  const { subject: subjectId } = await params;
  const subject = getSubject(subjectId);
  if (!subject) notFound();

  return <SubjectView subject={subject} />;
}
