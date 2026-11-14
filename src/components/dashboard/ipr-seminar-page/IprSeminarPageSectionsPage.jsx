'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  Settings2,
  ImageIcon,
  Lightbulb,
  Info,
  BookOpen,
  Users,
  CalendarDays,
  HelpCircle,
  Megaphone,
  ChevronRight,
  ExternalLink,
  Globe,
  FileEdit,
  EyeOff,
  Loader2,
  RefreshCw,
} from 'lucide-react';

const BASE = '/dashboard/page-content/ipr-seminar';

const SECTIONS = [
  {
    key: 'config',
    label: 'Config & Global Settings',
    description:
      'Theme (dark/light), header top-bar button visibility & text, and brochure PDF for all download buttons.',
    icon: Settings2,
    color: '#eb5905',
  },
  {
    key: 'hero',
    label: 'Hero Section',
    description: 'Badge, headline, date/venue chips, register & brochure CTA buttons, poster image, and trust badges.',
    icon: ImageIcon,
    color: '#3B82F6',
  },
  {
    key: 'topics',
    label: 'Seminar Topics Strip',
    description: 'The 5-card topic grid below the hero — icon, colour, title, and short description.',
    icon: Lightbulb,
    color: '#F59E0B',
  },
  {
    key: 'about',
    label: 'About the Seminar',
    description: 'Heading, two paragraphs, event image, and the floating attendee count badge.',
    icon: Info,
    color: '#06B6D4',
  },
  {
    key: 'takeaways',
    label: 'Key Takeaways',
    description: 'The 2×3 card grid with icons and descriptions of what attendees will learn.',
    icon: BookOpen,
    color: '#10B981',
  },
  {
    key: 'audience',
    label: 'Who Should Attend',
    description: 'Audience cards in the dark strip section — icon, label, and sub-label per card.',
    icon: Users,
    color: '#8B5CF6',
  },
  {
    key: 'agenda',
    label: 'Agenda, Highlights & Event Details',
    description: 'Day schedule timeline, event highlight cards, and the "Mark Your Calendar" details table.',
    icon: CalendarDays,
    color: '#EC4899',
  },
  {
    key: 'faq',
    label: 'FAQ',
    description: 'Frequently asked questions shown as an accordion. Question + answer pairs.',
    icon: HelpCircle,
    color: '#EF4444',
  },
  {
    key: 'cta',
    label: 'Bottom CTA Banner',
    description: 'Badge text, heading, description, register button link, brochure button label, and audience tags.',
    icon: Megaphone,
    color: '#0EA5E9',
  },
];

const STATUS_CONFIG = {
  published: {
    label: 'Published',
    Icon: Globe,
    color: '#16a34a',
    bg: '#f0fdf4',
    border: '#bbf7d0',
  },
  draft: {
    label: 'Draft',
    Icon: FileEdit,
    color: '#d97706',
    bg: '#fffbeb',
    border: '#fde68a',
  },
  unpublished: {
    label: 'Unpublished',
    Icon: EyeOff,
    color: '#dc2626',
    bg: '#fef2f2',
    border: '#fecaca',
  },
};

function StatusBadge({ status, loading }) {
  if (loading) {
    return (
      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#f4f6f9] text-[#77838f]">
        <Loader2 className="w-3 h-3 animate-spin" />
        Loading…
      </span>
    );
  }

  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.published;
  const { Icon, label, color, bg, border } = cfg;

  return (
    <span
      className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border"
      style={{ color, backgroundColor: bg, borderColor: border }}
    >
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
}

export default function IprSeminarPageSectionsPage() {
  const [status, setStatus] = useState(null);
  const [statusLoading, setStatusLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch('/api/ipr-seminar-content?section=config', {
          credentials: 'include',
        });
        const json = await res.json();
        if (json.success && json.data?.status) {
          setStatus(json.data.status);
        } else {
          setStatus('published'); // default — existing docs without the field are live
        }
      } catch {
        setStatus('published');
      } finally {
        setStatusLoading(false);
      }
    }
    fetchStatus();
  }, []);

  async function handleSeed() {
    setSeeding(true);
    try {
      const res = await fetch('/api/ipr-seminar-content/seed', {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Zephyr 2026 content loaded — images preserved');
        // Refresh status badge
        const res2 = await fetch('/api/ipr-seminar-content?section=config', { credentials: 'include' });
        const json2 = await res2.json();
        if (json2.success && json2.data?.status) setStatus(json2.data.status);
      } else {
        toast.error(data.message || 'Seed failed');
      }
    } catch {
      toast.error('Request failed');
    } finally {
      setSeeding(false);
    }
  }
  return (
    <div className="max-w-[860px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#eb5905]/10 rounded-xl flex items-center justify-center">
            <CalendarDays className="w-5 h-5 text-[#eb5905]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-[20px] font-bold text-[#222]">Seminar Page</h1>
              <StatusBadge status={status} loading={statusLoading} />
            </div>
            <p className="text-[12px] text-[#77838f]">Select a section to edit</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <a
            href="/seminar/zephyr-2026"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#4a5568] border border-[#e2e8f0] rounded-lg px-3 py-2 hover:bg-[#f4f6f9] transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View Live Page
          </a>
          <button
            type="button"
            onClick={() => handleSeed()}
            disabled={seeding}
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-white bg-[#eb5905] rounded-lg px-3 py-2 hover:bg-[#c94f05] transition disabled:opacity-60 cursor-pointer"
          >
            {seeding ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
            Load Zephyr 2026 Content
          </button>
        </div>
      </div>

      {/* Info banner */}
      <div className="mt-4 mb-6 bg-[#fffbf5] border border-[#eb5905]/25 rounded-xl px-4 py-3 text-[12px] text-[#77838f]">
        <strong className="text-[#eb5905]">Tip:</strong> Click <strong>Load Zephyr 2026 Content</strong> to overwrite
        all text with Zephyr 2026 defaults — your uploaded images are always preserved. Then fine-tune each section
        below. <strong className="text-[#dc2626]">Draft / Unpublished pages return a 404 to visitors.</strong>
      </div>

      <div className="space-y-3">
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.key}
              href={`${BASE}?section=${section.key}`}
              className="group flex items-start gap-5 bg-white border border-[#e2e8f0] rounded-2xl p-4 hover:border-[#eb5905]/50 hover:shadow-lg transition-all duration-200"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
                style={{ backgroundColor: `${section.color}15`, color: section.color }}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-[15px] font-bold text-[#222] group-hover:text-[#eb5905] transition-colors mb-0.5">
                  {section.label}
                </h2>
                <p className="text-[12px] text-[#77838f]">{section.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#aab4bf] group-hover:text-[#eb5905] shrink-0 mt-1 transition-colors" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
