'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import DashboardSidebar from './DashboardSidebar';
import DashboardTopbar from './DashboardTopbar';
import { Loader2 } from 'lucide-react';

export default function DashboardShell({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Verify auth on mount AND whenever the tab becomes visible again
  // (covers the case where the user leaves the tab open for days)
  useEffect(() => {
    async function verifyAuth() {
      try {
        const res = await fetch('/api/admin/me', {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-store',
        });

        if (!res.ok) {
          router.replace('/admin');
          return;
        }

        const data = await res.json();
        setAdmin(data.data);
      } catch {
        router.replace('/admin');
      } finally {
        setLoading(false);
      }
    }

    // Run immediately on mount
    verifyAuth();

    // Re-run when tab becomes visible (user switches back to this tab)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        verifyAuth();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f6f9] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-[#eb5905] animate-spin" />
          <p className="text-[14px] text-[#77838f]">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!admin) return null;

  return (
    <div className="min-h-screen bg-[#f4f6f9] flex">
      {/* Sidebar */}
      <DashboardSidebar admin={admin} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
        <DashboardTopbar admin={admin} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
