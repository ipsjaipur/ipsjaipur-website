export const metadata = {
  title: 'Create Schedule | IPS Admin',
  robots: { index: false, follow: false },
};

import ScheduleForm from '@/components/dashboard/ScheduleForm';

export default function DashboardScheduleCreatePage() {
  return <ScheduleForm />;
}
