export const metadata = {
  title: 'Edit Event | IPS Admin',
  robots: { index: false, follow: false },
};

import EventEditPageWrapper from '@/components/dashboard/EventEditPageWrapper';

export default function DashboardEventEditPage({ params }) {
  return <EventEditPageWrapper params={params} />;
}
