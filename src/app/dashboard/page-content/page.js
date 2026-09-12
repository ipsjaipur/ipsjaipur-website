import Link from 'next/link';
import { Layers, Home, BookOpen, GraduationCap, ChevronRight, Sparkles, Info, UserCheck, TrendingUp, Monitor, Users } from 'lucide-react';

const PAGES = [
  {
    label: 'Home Page',
    description: 'Edit all sections of the home page — banner, programs, placements, video gallery, achievers and more.',
    href: '/dashboard/page-content/home',
    icon: Home,
    color: '#eb5905',
    sections: ['Hero Banner', 'Approvals', 'About / Methodology', 'Pathway', 'Programs', 'Placements', 'Video Gallery', 'Achievers', 'Testimonials', 'Apply Now CTA'],
  },
  {
    label: 'Placements Page',
    description: 'Edit all sections of the placements page — sector-wise stats, placement updates grid, resume book videos, FAQ, and coordinator contact.',
    href: '/dashboard/page-content/placements',
    icon: TrendingUp,
    color: '#EF4444',
    sections: ['Placement Stats', 'Coordinator Contact', 'Placement Updates', 'Resume Book', 'Industry FAQ'],
  },
  {
    label: 'About Page',
    description: 'Edit the About (IPS Ideology) page — banner, page heading, opening quote, description paragraphs, Why Choose IPS items, and sidebar videos.',
    href: '/dashboard/page-content/about',
    icon: Info,
    color: '#06B6D4',
    sections: ['Page Content', 'Sidebar Videos'],
  },
  {
    label: 'Board of Advisors Page',
    description: 'Edit the Board of Advisors page — banner, advisor profile cards, and the Bridging Theory CTA section.',
    href: '/dashboard/page-content/board-of-advisors',
    icon: UserCheck,
    color: '#8B5CF6',
    sections: ['Banner', 'Advisors', 'Bridging Theory CTA'],
  },
  {
    label: 'MBA Course Page',
    description: 'Edit all sections of the MBA course page — banner, highlights, syllabus, specializations, admission, documents, selection, fee structure, FAQ, and sidebar.',
    href: '/dashboard/page-content/mba',
    icon: BookOpen,
    color: '#8B5CF6',
    sections: ['Banner Slides', 'Overview & Highlights', 'Syllabus', 'Specializations', 'Eligibility', 'Admission Process', 'Documents Required', 'Selection Procedure', 'Fee Structure', 'FAQ', 'Sidebar Videos'],
  },
  {
    label: 'BBA Course Page',
    description: 'Edit all sections of the BBA course page — banner, highlights, syllabus, specializations, admission, documents, selection, fee structure, FAQ, and sidebar.',
    href: '/dashboard/page-content/bba',
    icon: GraduationCap,
    color: '#10B981',
    sections: ['Banner Slides', 'Overview & Highlights', 'Syllabus', 'Specializations', 'Eligibility', 'Admission Process', 'Documents Required', 'Selection Procedure', 'Fee Structure', 'FAQ', 'Sidebar Videos'],
  },
  {
    label: 'BCA Course Page',
    description: 'Edit all sections of the BCA course page — banner, highlights, syllabus, specializations, admission, documents, selection, fee structure, FAQ, and sidebar.',
    href: '/dashboard/page-content/bca',
    icon: Monitor,
    color: '#0EA5E9',
    sections: ['Banner Slides', 'Overview & Highlights', 'Syllabus', 'Specializations', 'Eligibility', 'Admission Process', 'Documents Required', 'Selection Procedure', 'Fee Structure', 'FAQ', 'Sidebar Videos'],
  },
  {
    label: 'IPS Sutra Page',
    description: 'Edit the IPS Sutra (IPS Ideology) page — banner, main heading, Hindi paragraphs, CTA button, side image, and IPS Advantages cards.',
    href: '/dashboard/page-content/ips-sutra',
    icon: Sparkles,
    color: '#F59E0B',
    sections: ['Page Content', 'IPS Advantages'],
  },
  {
    label: 'Faculty Page',
    description: 'Edit the Faculty page — banner, Core & Visiting Faculty table rows, and Corporate Speakers / Mentors table rows.',
    href: '/dashboard/page-content/faculty',
    icon: Users,
    color: '#0EA5E9',
    sections: ['Banner', 'Core & Visiting Faculty', 'Corporate Speakers / Mentors'],
  },
];

export const metadata = {
  title: 'Page Content | IPS Admin',
  robots: { index: false, follow: false },
};

export default function PageContentIndexPage() {
  return (
    <div className="max-w-[860px] mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-9 h-9 bg-[#eb5905]/10 rounded-xl flex items-center justify-center">
          <Layers className="w-5 h-5 text-[#eb5905]" />
        </div>
        <div>
          <h1 className="text-[20px] font-bold text-[#222]">Page Content</h1>
          <p className="text-[12px] text-[#77838f]">Select a page to manage its content</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {PAGES.map((page) => {
          const Icon = page.icon;
          return (
            <Link
              key={page.href}
              href={page.href}
              className="group flex items-start gap-5 bg-white border border-[#e2e8f0] rounded-2xl p-4 hover:border-[#eb5905]/50 hover:shadow-lg transition-all duration-200"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
                style={{ backgroundColor: `${page.color}15`, color: page.color }}
              >
                <Icon className="w-6 h-6" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-[16px] font-bold text-[#222] group-hover:text-[#eb5905] transition-colors">
                    {page.label}
                  </h2>
                  <span className="text-[10px] font-semibold bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
                    {page.sections.length} sections
                  </span>
                </div>
                <p className="text-[13px] text-[#77838f] mb-0">{page.description}</p>
              </div>

              <ChevronRight className="w-5 h-5 text-[#aab4bf] group-hover:text-[#eb5905] shrink-0 mt-1 transition-colors" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
