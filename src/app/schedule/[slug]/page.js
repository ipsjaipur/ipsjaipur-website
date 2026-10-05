export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { notFound } from 'next/navigation';
import { getScheduleBySlug } from '@/_services/dataService';
import ScheduleDetailPage from '@/components/schedule/ScheduleDetailPage';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const schedule = await getScheduleBySlug(slug);
    const pageTitle = schedule?.metaTitle || schedule?.title || 'Schedule';
    return {
      title: pageTitle,
      // Explicitly no-index — this page is for direct student links only,
      // never crawled or listed in sitemap.
      robots: {
        index: false,
        follow: false,
        googleBot: { index: false, follow: false },
      },
    };
  } catch {
    return {
      title: 'Schedule',
      robots: { index: false, follow: false },
    };
  }
}

export default async function ScheduleSlugPage({ params }) {
  const { slug } = await params;

  const schedule = await getScheduleBySlug(slug);
  if (!schedule) notFound();

  // Mongoose documents contain ObjectId and Date objects which can't be passed
  // directly to Client Components — serialize everything to plain JSON first.
  const plainSchedule = JSON.parse(JSON.stringify(schedule));

  return <ScheduleDetailPage schedule={plainSchedule} />;
}
