export const metadata = {
  title: 'Create Event | IPS Admin',
  robots: { index: false, follow: false },
};

import EventCreatePage from '@/components/dashboard/EventCreatePage';

export default function DashboardEventCreatePage() {
  return <EventCreatePage />;
}
