export const metadata = {
  title: 'Events | IPS Admin',
  robots: { index: false, follow: false },
};

import EventListPage from '@/components/dashboard/EventListPage';

export default function DashboardEventsPage() {
  return <EventListPage />;
}
