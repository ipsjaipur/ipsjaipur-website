'use client';
import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Schema from '@/components/Schema';
import { Toaster } from 'react-hot-toast';

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  // Hide header/footer on these routes
  const isThankYouPage = pathname === '/thank-you';
  const isAdminPage = pathname === '/admin' || pathname.startsWith('/admin/');
  const isDashboardPage = pathname === '/dashboard' || pathname.startsWith('/dashboard/');
  const isApplyNowPage = pathname === '/apply-now';
  const hideChrome = isThankYouPage || isAdminPage || isDashboardPage || isApplyNowPage;

  return (
    <>
      <Schema pathname={pathname} />
      {!hideChrome && <Header />}
      <main className={hideChrome ? '' : 'grow min-h-[64vh]'}>
        {children}
      </main>
      {!hideChrome && <Footer />}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#222222',
            color: '#fff',
            borderRadius: '8px',
            fontSize: '14px',
          },
          success: {
            iconTheme: { primary: '#eb5905', secondary: '#fff' },
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#fff' },
          },
        }}
      />
    </>
  );
}
