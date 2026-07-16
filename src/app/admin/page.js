import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import AdminLoginPage from '@/components/admin/AdminLoginPage';

export const metadata = {
  title: 'Admin Login | IPS Business School',
  description: 'Admin login for IPS Business School CMS',
  robots: {
    index: false,
    follow: false,
  },
};

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-[#eb5905] animate-spin" />

    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AdminLoginPage />
    </Suspense>
  );
}
