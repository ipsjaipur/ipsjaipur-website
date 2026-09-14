'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Image,
  FileText,
  Monitor,
  Mic2,
  BookOpen,
  Dumbbell,
  Wifi,
  Car,
  Home,
  MapPin,
  Bus,
  Coffee,
  Leaf,
  Navigation,
  Video,
  Loader2,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  ChevronRight,
  Building2,
} from 'lucide-react';
import toast from 'react-hot-toast';

const BASE = '/dashboard/page-content/infrastructure';

const SECTIONS = [
  {
    key: 'banner',
    label: 'Banner',
    description: 'Hero banner title, background image, and image position for the Infrastructure page.',
    icon: Image,
    color: '#eb5905',
  },
  {
    key: 'intro',
    label: 'Campus Intro',
    description: 'The opening "#campus" card — main heading, subheading, and introductory paragraph.',
    icon: FileText,
    color: '#0EA5E9',
  },
  {
    key: 'classrooms',
    label: 'AC Classrooms',
    description: 'Title, subtitle, description, and carousel images for the Digital AC Classrooms section.',
    icon: Monitor,
    color: '#6366F1',
  },
  {
    key: 'auditorium',
    label: 'Auditorium',
    description: 'Title, subtitle, description, and carousel images for the Seminar Halls & Auditorium section.',
    icon: Mic2,
    color: '#8B5CF6',
  },
  {
    key: 'labs',
    label: 'Computer Labs',
    description: 'Title, subtitle, description, and carousel images for the Computer Labs section.',
    icon: Monitor,
    color: '#10B981',
  },
  {
    key: 'library',
    label: 'Library',
    description: 'Title, subtitle, and description for the Library section.',
    icon: BookOpen,
    color: '#F59E0B',
  },
  {
    key: 'sports',
    label: 'Sports Activities',
    description: 'Title, subtitle, description, and carousel images for the Sports Activities section.',
    icon: Dumbbell,
    color: '#EF4444',
  },
  {
    key: 'wifi',
    label: 'Wi-Fi Campus',
    description: 'Title, subtitle, and description for the Wi-Fi Campus section.',
    icon: Wifi,
    color: '#0EA5E9',
  },
  {
    key: 'parking',
    label: 'Parking Area',
    description: 'Title, subtitle, and description for the Parking Area section.',
    icon: Car,
    color: '#6366F1',
  },
  {
    key: 'hostels',
    label: 'Hostels + PGs',
    description: 'Title, subtitle, and description for the Hostels & PGs section.',
    icon: Home,
    color: '#10B981',
  },
  {
    key: 'location',
    label: 'Location',
    description: 'Title, subtitle, description, and single map image for the Location section.',
    icon: MapPin,
    color: '#EF4444',
  },
  {
    key: 'transport',
    label: 'Public Transport',
    description: 'Title, subtitle, and description for the Public Transport connectivity section.',
    icon: Bus,
    color: '#F59E0B',
  },
  {
    key: 'nearby',
    label: 'Nearby Destinations',
    description: 'Title, subtitle, description, and carousel images for the Cafés, Malls & Destinations section.',
    icon: Coffee,
    color: '#8B5CF6',
  },
  {
    key: 'ecosystem',
    label: 'Ecosystem Closing',
    description: 'Closing description paragraph shown at the bottom (no title/subtitle).',
    icon: Leaf,
    color: '#10B981',
  },
  {
    key: 'navigation',
    label: 'Sidebar Navigation',
    description: 'The anchor-link navigation items shown in the left sidebar.',
    icon: Navigation,
    color: '#0EA5E9',
  },
  {
    key: 'sidebar',
    label: 'Sidebar Videos',
    description: 'YouTube embed videos shown in the right sidebar of the Infrastructure page.',
    icon: Video,
    color: '#EF4444',
  },
];

export default function InfrastructurePageSectionsPage() {
  const [status, setStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  async function fetchStatus() {
    setLoading(true);
    try {
      const res = await fetch('/api/infrastructure-content', { credentials: 'include' });
      const data = await res.json();
      if (data.success) {
        const map = {};
        for (const key of SECTIONS.map((s) => s.key)) {
          map[key] = data.data[key] ? 'seeded' : 'empty';
        }
        setStatus(map);
      }
    } catch {
      toast.error('Failed to load section status');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStatus();
  }, []);

  async function handleSeed(force = false) {
    if (
      force &&
      !window.confirm(
        'This will OVERWRITE all Infrastructure page sections with the original static defaults. Are you sure?',
      )
    )
      return;

    setSeeding(true);
    try {
      const res = await fetch(`/api/infrastructure-content/seed${force ? '?force=true' : ''}`, {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        toast.success(force ? 'All sections reset to defaults' : 'Missing sections seeded successfully');
        fetchStatus();
      } else {
        toast.error(data.message || 'Seed failed');
      }
    } catch {
      toast.error('Request failed');
    } finally {
      setSeeding(false);
    }
  }

  const anyEmpty = Object.values(status).some((v) => v === 'empty');

  return (
    <div className="max-w-[900px] mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[12px] text-[#77838f] mb-4">
        <Link href="/dashboard/page-content" className="hover:text-[#eb5905] transition">
          Page Content
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#222] font-medium">Infrastructure Page</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#eb5905]/10 rounded-xl flex items-center justify-center">
            <Building2 className="w-5 h-5 text-[#eb5905]" />
          </div>
          <div>
            <h1 className="text-[20px] font-bold text-[#222]">Infrastructure Page</h1>
            <p className="text-[12px] text-[#77838f]">Edit each section individually. Changes save per section.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <a
            href="/infrastructure"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#4a5568] border border-[#e2e8f0] rounded-lg px-3 py-2 hover:bg-[#f4f6f9] transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View Live
          </a>

          {anyEmpty && (
            <button
              type="button"
              onClick={() => handleSeed(false)}
              disabled={seeding || loading}
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-white bg-[#eb5905] rounded-lg px-3 py-2 hover:bg-[#c94f05] transition disabled:opacity-60 cursor-pointer"
            >
              {seeding ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
              Seed Missing
            </button>
          )}

          <button
            type="button"
            onClick={() => handleSeed(true)}
            disabled={seeding || loading}
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#ef4444] border border-red-200 rounded-lg px-3 py-2 hover:bg-red-50 transition disabled:opacity-60 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset to Defaults
          </button>
        </div>
      </div>

      {/* Warning when DB not seeded */}
      {!loading && anyEmpty && (
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
          <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-[13px] font-semibold text-amber-800">Some sections are not in the database yet</p>
            <p className="text-[12px] text-amber-700 mt-0.5">
              Click <strong>Seed Missing</strong> to populate them with the original static content. Safe — won&apos;t
              overwrite existing data.
            </p>
          </div>
        </div>
      )}

      {/* Section grid */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 text-[#eb5905] animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SECTIONS.map((section) => {
            const Icon = section.icon;
            const isSeeded = status[section.key] === 'seeded';
            return (
              <Link
                key={section.key}
                href={`${BASE}?section=${section.key}`}
                className="group flex items-start gap-4 bg-white border border-[#e2e8f0] rounded-2xl p-5 hover:border-[#eb5905]/40 hover:shadow-md transition-all duration-200"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
                  style={{ backgroundColor: `${section.color}15`, color: section.color }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-[14px] font-semibold text-[#222] group-hover:text-[#eb5905] transition-colors">
                      {section.label}
                    </p>
                    <span
                      className={`inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        isSeeded ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {isSeeded ? '● Live' : '○ Empty'}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#77838f] leading-relaxed">{section.description}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#aab4bf] group-hover:text-[#eb5905] transition-colors shrink-0 mt-1" />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
