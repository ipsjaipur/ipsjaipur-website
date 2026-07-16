export const metadata = {
  title: 'Dashboard | IPS Business School Admin',
  description: 'IPS Business School content management dashboard',
  robots: { index: false, follow: false },
};

import DashboardShell from '@/components/dashboard/DashboardShell';

export default function DashboardLayout({ children }) {
  return <DashboardShell>{children}</DashboardShell>;
}
