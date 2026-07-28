'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import CommonBanner from '@/components/courses/CommonBanner';
import Breadcrumb from '@/components/common/Breadcrumb';

// ─── Batch Queries Data ───────────────────────────────────────────────────────
// To add / update a batch, edit the batches array for each course below.
const QUERY_BATCHES = [
  {
    course: 'MBA',
    fullName: 'Master of Business Administration',
    color: '#eb5905',
    batches: [
      { label: 'MBA 2026 Batch', url: 'https://forms.gle/Umr2kdm7K9EgJ8wM8' },
      { label: 'MBA 2025 Batch', url: 'https://forms.gle/Umr2kdm7K9EgJ8wM8' },
      { label: 'MBA 2024 Batch', url: 'https://forms.gle/7C6ZEjxmReys4X6WA' },
    ],
    oldBatch: { label: 'MBA Previous Batches', url: 'https://forms.gle/XeRm9q2AjNDjv9Aa6' },
  },
  {
    course: 'BBA',
    fullName: 'Bachelor of Business Administration',
    color: '#2a3e61',
    batches: [
      { label: 'BBA 2026 Batch', url: 'https://forms.gle/Umr2kdm7K9EgJ8wM8' },
      { label: 'BBA 2025 Batch', url: 'https://forms.gle/Umr2kdm7K9EgJ8wM8' },
      { label: 'BBA 2024 Batch', url: 'https://forms.gle/7C6ZEjxmReys4X6WA' },
    ],
    oldBatch: { label: 'BBA Previous Batches', url: 'https://forms.gle/XeRm9q2AjNDjv9Aa6' },
  },
  {
    course: 'BCA',
    fullName: 'Bachelor of Computer Applications',
    color: '#ff7a1a',
    batches: [
      { label: 'BCA 2026 Batch', url: 'https://forms.gle/Umr2kdm7K9EgJ8wM8' },
      { label: 'BCA 2025 Batch', url: 'https://forms.gle/Umr2kdm7K9EgJ8wM8' },
      { label: 'BCA 2024 Batch', url: 'https://forms.gle/7C6ZEjxmReys4X6WA' },
    ],
    oldBatch: { label: 'BCA Previous Batches', url: 'https://forms.gle/XeRm9q2AjNDjv9Aa6' },
  },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function BatchQueriesPage() {
  return (
    <>
      {/* Common banner — same pattern as all other pages */}
      <CommonBanner
        pageTitle="Batch Queries"
        normalFont
        bgImageUrl="images/about/about-us.webp"
        position="object-center"
      />

      {/* Breadcrumb */}
      <Breadcrumb pageName="Batch Queries" />

      {/* Main content */}
      <main className="pt-12 pb-4 px-4">
        <section className="max-w-[1202px] mx-auto">
          {/* Section heading */}
          <div className="text-center mb-10">
            <p className="text-[#eb5905] font-semibold text-[12px] uppercase tracking-widest mb-2 figtree-font">
              Batch Queries
            </p>
            <h1 className="text-[#222222] font-bold text-[24px] md:text-[30px] figtree-font leading-tight">
              Have a <span className="text-[#eb5905]">Query?</span>
            </h1>
            <p className="text-[#77838f] text-[14px] mt-2 figtree-font">
              Select your course and batch year — fill the form and we&apos;ll get back to you.
            </p>
            <div className="mx-auto mt-3 w-[50px] h-[2px] rounded-full bg-[#eb5905]" />
          </div>

          {/* 3 course cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {QUERY_BATCHES.map((group) => (
              <motion.div
                key={group.course}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-2xl shadow-lg border border-[#e2e8f0] overflow-hidden flex flex-col"
                style={{ boxShadow: `0 4px 20px ${group.color}18` }}
              >
                {/* Top accent bar */}
                <div className="h-1.5 w-full" style={{ backgroundColor: group.color }} />

                {/* Card header */}
                <div className="px-6 pt-5 pb-4 border-b border-[#f0f2f5]" style={{ backgroundColor: group.color }}>
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="text-white font-bold text-[16px] figtree-font leading-tight">{group.course}</p>
                      <p className="text-white text-[11px] mt-0.5 leading-snug">{group.fullName}</p>
                    </div>
                  </div>
                </div>

                {/* Batch buttons */}
                <div className="px-5 py-4 flex flex-col gap-2.5 flex-1">
                  {group.batches.map((batch) => (
                    <Link
                      key={batch.label}
                      href={batch.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl border text-[13px] font-semibold transition-all duration-200 hover:shadow-sm hover:-translate-y-[1px]"
                      style={{
                        color: group.color,
                        borderColor: `${group.color}30`,
                        backgroundColor: `${group.color}08`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = group.color;
                        e.currentTarget.style.color = '#fff';
                        e.currentTarget.style.borderColor = group.color;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = `${group.color}08`;
                        e.currentTarget.style.color = group.color;
                        e.currentTarget.style.borderColor = `${group.color}30`;
                      }}
                    >
                      <span>{batch.label}</span>
                      <svg
                        className="w-3.5 h-3.5 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  ))}

                  {group.oldBatch && (
                    <div className="mt-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-px flex-1 bg-[#eef1f4]" />
                        <span className="text-[10px] font-semibold uppercase tracking-wide text-[#a3adb8]">
                          Old Batches
                        </span>
                        <div className="h-px flex-1 bg-[#eef1f4]" />
                      </div>

                      <Link
                        href={group.oldBatch.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl border border-dashed text-[13px] font-semibold text-[#5b6572] bg-[#f8f9fb] transition-all duration-200 hover:bg-[#f0f2f5] hover:-translate-y-[1px]"
                      >
                        <span className="flex items-center gap-2">
                          <svg
                            className="w-3.5 h-3.5 shrink-0"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 7h18M3 7l1.5 12a2 2 0 002 2h11a2 2 0 002-2L21 7M3 7l1-3h16l1 3M9 11h6"
                            />
                          </svg>
                          {group.oldBatch.label}
                        </span>
                        <svg
                          className="w-3.5 h-3.5 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
