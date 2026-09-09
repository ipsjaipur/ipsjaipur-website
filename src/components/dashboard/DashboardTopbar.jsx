'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import { Menu, ChevronRight, Home } from 'lucide-react';

// ── Breadcrumb path map ────────────────────────────────────────────────────────
const BREADCRUMB_MAP = {
  '/dashboard': 'Dashboard',
  '/dashboard/blogs': 'All Blogs',
  '/dashboard/blogs/create': 'Create Blog',
  '/dashboard/news': 'All News',
  '/dashboard/news/create': 'Create News',
  '/dashboard/settings': 'Settings',
  '/dashboard/page-content': 'Page Content',
  '/dashboard/page-content/home': 'Home Page',
};

// Labels for ?section= query params on the Home Page content route
const SECTION_LABELS = {
  banner: 'Hero Banner',
  approvals: 'Approvals & Affiliations',
  methodology: 'About / Methodology',
  pathway: 'Pathway to Excellence',
  programs: 'Programs Offered',
  placements: 'Placements',
  videoGallery: 'Video Gallery',
  achievers: 'Our Achievers',
  testimonials: 'Student Testimonials',
};

function getBreadcrumbs(pathname, section) {
  const crumbs = [{ label: 'Dashboard', href: '/dashboard' }];
  if (pathname === '/dashboard') return crumbs;

  const parts = pathname.split('/').filter(Boolean);
  let accumulated = '';

  for (const part of parts) {
    accumulated += '/' + part;
    if (accumulated === '/dashboard') continue;
    const isId = /^[a-f0-9]{24}$/.test(part);
    const label =
      BREADCRUMB_MAP[accumulated] || (isId ? 'Edit' : part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' '));
    crumbs.push({ label, href: accumulated });
  }

  // Append section label when on the home content page with ?section= param
  if (pathname === '/dashboard/page-content/home' && section && SECTION_LABELS[section]) {
    crumbs.push({
      label: SECTION_LABELS[section],
      href: `${pathname}?section=${section}`,
    });
  }

  return crumbs;
}

// ── Inner component (uses useSearchParams — must be inside Suspense) ───────────
function TopbarInner({ admin, onMenuClick }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const section = searchParams.get('section');
  const breadcrumbs = getBreadcrumbs(pathname, section);
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

        {/* Breadcrumb — desktop */}
        <nav className="flex items-center gap-1 text-[12px] text-[#77838f] min-w-0 hidden sm:flex">
          <Link href="/dashboard" className="flex items-center hover:text-[#eb5905] transition shrink-0">
            <Home className="w-3.5 h-3.5" />
          </Link>
          {breadcrumbs.slice(1).map((crumb) => (
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

// ── Export wrapped in Suspense (required for useSearchParams in App Router) ────
export default function DashboardTopbar({ admin, onMenuClick }) {
  return (
    <Suspense
      fallback={
        <header className="sticky top-0 z-20 bg-white border-b border-[#e2e8f0] px-4 sm:px-6 lg:px-8 h-[52px]" />
      }
    >
      <TopbarInner admin={admin} onMenuClick={onMenuClick} />
    </Suspense>
  );
}
