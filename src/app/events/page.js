export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getMetaDetails } from '@/_services/seoService';
import EventsListPage from '@/components/events/EventsListPage';

export async function generateMetadata() {
  return await getMetaDetails('events');
}

export default function EventsPage() {
  return <EventsListPage />;
}
