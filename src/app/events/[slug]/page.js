export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { notFound } from 'next/navigation';
import { getEventWithRelated } from '@/_services/dataService';
import { getMetaDataDynamic } from '@/_services/seoService';
import EventDetailPage from '@/components/events/EventDetailPage';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const result = await getEventWithRelated(slug);
    return getMetaDataDynamic({
      content: result?.event ?? null,
      pathPrefix: 'events',
      fallbackTitle: 'Event | IPS Business School',
    });
  } catch {
    return { title: 'Event | IPS Business School' };
  }
}

export default async function EventSlugPage({ params }) {
  const { slug } = await params;
  try {
    const result = await getEventWithRelated(slug);
    if (!result) notFound();
    return <EventDetailPage event={result.event} related={result.related} />;
  } catch {
    notFound();
  }
}
