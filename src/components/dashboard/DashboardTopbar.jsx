'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, ChevronRight, Home } from 'lucide-react';

// Map pathnames to human-readable breadcrumb labels
const BREADCRUMB_MAP = {
  '/dashboard': 'Dashboard',
  '/dashboard/blogs': 'All Blogs',
  '/dashboard/blogs/create': 'Create Blog',
  '/dashboard/news': 'All News',
  '/dashboard/news/create': 'Create News',
  '/dashboard/settings': 'Settings',
};

function getBreadcrumbs(pathname) {
  const crumbs = [{ label: 'Dashboard', href: '/dashboard' }];

  if (pathname === '/dashboard') return crumbs;

  const parts = pathname.split('/').filter(Boolean); // ['dashboard', 'blogs', 'create']

  let accumulated = '';
  for (const part of parts) {
    accumulated += '/' + part;
    const label = BREADCRUMB_MAP[accumulated];
    if (label && accumulated !== '/dashboard') {
      // Check if it's an edit page
      const isId = /^[a-f0-9]{24}$/.test(part);
      crumbs.push({
        label: isId ? 'Edit' : label,
        href: accumulated,
      });
    } else if (!label && accumulated !== '/dashboard') {
      const isId = /^[a-f0-9]{24}$/.test(part);
      crumbs.push({
        label: isId ? 'Edit' : part.charAt(0).toUpperCase() + part.slice(1),
        href: accumulated,
      });
    }
  }

  return crumbs;
}

export default function DashboardTopbar({ admin, onMenuClick }) {
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);
  const pageTitle = breadcrumbs[breadcrumbs.length - 1]?.label || 'Dashboard';

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-[#e2e8f0] px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
      {/* Left: hamburger + breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-1.5 rounded-lg hover:bg-[#f4f6f9] text-[#77838f] transition shrink-0 cursor-pointer"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-[12px] text-[#77838f] min-w-0 hidden sm:flex">
          <Link href="/dashboard" className="flex items-center hover:text-[#eb5905] transition shrink-0">
            <Home className="w-3.5 h-3.5" />
          </Link>
          {breadcrumbs.slice(0, 3).map((crumb, i, arr) => (
            <span key={crumb.href} className="flex items-center gap-1 min-w-0">
              <ChevronRight className="w-3 h-3 shrink-0" />
              <span className="text-[#222222] font-medium truncate">{crumb.label}</span>
            </span>
          ))}
        </nav>

        {/* Mobile: just page title */}
        <span className="sm:hidden text-[14px] font-semibold text-[#222222] truncate">{pageTitle}</span>
      </div>

      {/* Right: admin badge + website link */}
      <div className="flex items-center gap-3 shrink-0">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 text-[12px] text-[#77838f] hover:text-[#eb5905] transition border border-[#e2e8f0] rounded-lg px-3 py-1.5"
        >
          View Website ↗
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#eb5905] rounded-full flex items-center justify-center text-white font-bold text-[12px] shrink-0">
            {admin?.name?.charAt(0)?.toUpperCase() || 'A'}
          </div>
          <span className="hidden md:block text-[13px] font-medium text-[#222222] max-w-[120px] truncate">
            {admin?.name}
          </span>
        </div>
      </div>
    </header>
  );
}
