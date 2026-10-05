export const metadata = {
  title: 'Schedules | IPS Admin',
  robots: { index: false, follow: false },
};

import ScheduleListPage from '@/components/dashboard/ScheduleListPage';

export default function DashboardSchedulesPage() {
  return <ScheduleListPage />;
}
