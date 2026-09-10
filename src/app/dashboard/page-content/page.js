import Link from 'next/link';
import { Layers, Home, BookOpen, GraduationCap, ChevronRight } from 'lucide-react';

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
              className="group flex items-start gap-5 bg-white border border-[#e2e8f0] rounded-2xl p-6 hover:border-[#eb5905]/50 hover:shadow-lg transition-all duration-200"
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
                <p className="text-[13px] text-[#77838f] mb-3">{page.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {page.sections.map((s) => (
                    <span key={s} className="text-[11px] bg-[#f4f6f9] text-[#4a5568] px-2 py-0.5 rounded-full font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <ChevronRight className="w-5 h-5 text-[#aab4bf] group-hover:text-[#eb5905] shrink-0 mt-1 transition-colors" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
