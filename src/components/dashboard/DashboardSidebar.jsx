'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Newspaper,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  X,
  PlusCircle,
  List,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    exact: true,
  },
  {
    label: 'Blogs',
    icon: FileText,
    children: [
      { label: 'All Blogs', href: '/dashboard/blogs', icon: List },
      { label: 'Create Blog', href: '/dashboard/blogs/create', icon: PlusCircle },
    ],
  },
  {
    label: 'Campus News',
    icon: Newspaper,
    children: [
      { label: 'All News', href: '/dashboard/news', icon: List },
      { label: 'Create News', href: '/dashboard/news/create', icon: PlusCircle },
    ],
  },
];

function NavItem({ item, pathname, onClose }) {
  const isActive = item.exact
    ? pathname === item.href
    : item.href && (pathname === item.href || pathname.startsWith(item.href + '/'));

  const hasChildren = item.children?.length > 0;
  const childActive =
    hasChildren && item.children.some((c) => pathname === c.href || pathname.startsWith(c.href + '/'));

  const [open, setOpen] = useState(childActive);

  if (item.disabled) {
    return (
      <li>
        <span className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[13px] font-medium text-[#77838f]/60 cursor-not-allowed select-none">
          <item.icon className="w-4 h-4 shrink-0" />
          <span className="flex-1">{item.label}</span>
          {item.badge && (
            <span className="text-[10px] bg-[#ff9e3d]/20 text-[#ff9e3d] font-semibold px-1.5 py-0.5 rounded">
              {item.badge}
            </span>
          )}
        </span>
      </li>
    );
  }

  if (hasChildren) {
    return (
      <li>
        <button
          onClick={() => setOpen((v) => !v)}
          className={cn(
            'w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-150 cursor-pointer',
            childActive || open
              ? 'bg-[#eb5905]/10 text-[#eb5905]'
              : 'text-[#4a5568] hover:bg-[#f4f6f9] hover:text-[#222222]',
          )}
        >
          <item.icon className="w-4 h-4 shrink-0" />
          <span className="flex-1 text-left">{item.label}</span>
          {open ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        </button>
        {open && (
          <ul className="mt-1 ml-4 pl-3 border-l border-[#e2e8f0] space-y-0.5">
            {item.children.map((child) => {
              // Exact match always wins
              const isExactMatch = pathname === child.href;
              // For prefix match, only activate if no sibling has a more specific exact/prefix match
              const siblingOwnsPath = item.children.some(
                (sibling) =>
                  sibling.href !== child.href && (pathname === sibling.href || pathname.startsWith(sibling.href + '/')),
              );
              const childIsActive = isExactMatch || (!siblingOwnsPath && pathname.startsWith(child.href + '/'));
              return (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    onClick={onClose}
                    className={cn(
                      'flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] font-medium transition-all duration-150',
                      childIsActive
                        ? 'bg-[#eb5905] text-white shadow-sm'
                        : 'text-[#4a5568] hover:bg-[#f4f6f9] hover:text-[#222222]',
                    )}
                  >
                    <child.icon className="w-3.5 h-3.5 shrink-0" />
                    {child.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li>
      <Link
        href={item.href}
        onClick={onClose}
        className={cn(
          'flex items-center gap-3 px-4 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-150',
          isActive ? 'bg-[#eb5905] text-white shadow-sm' : 'text-[#4a5568] hover:bg-[#f4f6f9] hover:text-[#222222]',
        )}
      >
        <item.icon className="w-4 h-4 shrink-0" />
        <span className="flex-1">{item.label}</span>
      </Link>
    </li>
  );
}

export default function DashboardSidebar({ admin, isOpen, onClose }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      toast.success('Logged out successfully');
      router.replace('/admin');
    } catch {
      toast.error('Logout failed. Please try again.');
    }
  };

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 h-full w-64 bg-white border-r border-[#e2e8f0] z-40 flex flex-col transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#e2e8f0]">
        <Link href="/dashboard" className="flex items-center gap-2.5" onClick={onClose}>
          <div className="w-7 h-7 bg-[#eb5905] rounded-lg flex items-center justify-center shrink-0">
            <LayoutDashboard className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-[13px] font-bold text-[#222222] leading-tight">IPS Admin</p>
            <p className="text-[10px] text-[#77838f] leading-tight">Content Manager</p>
          </div>
        </Link>
        <button
          onClick={onClose}
          className="lg:hidden p-1.5 rounded-lg hover:bg-[#f4f6f9] text-[#77838f] transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.label} item={item} pathname={pathname} onClose={onClose} />
          ))}
        </ul>
      </nav>

      {/* Admin info + Logout */}
      <div className="px-3 py-4 border-t border-[#e2e8f0]">
        <div className="flex items-center gap-3 px-3 py-2.5 mb-2 rounded-lg bg-[#f4f6f9]">
          <div className="w-8 h-8 bg-[#eb5905] rounded-full flex items-center justify-center text-white font-bold text-[13px] shrink-0">
            {admin?.name?.charAt(0)?.toUpperCase() || 'A'}
          </div>
          <div className="min-w-0">
            <p className="text-[12px] font-semibold text-[#222222] truncate">{admin?.name || 'Admin'}</p>
            <p className="text-[11px] text-[#77838f] truncate">{admin?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-[13px] font-medium text-[#ef4444] hover:bg-red-50 transition-all duration-150 cursor-pointer"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Logout
        </button>
      </div>
    </aside>
  );
}
