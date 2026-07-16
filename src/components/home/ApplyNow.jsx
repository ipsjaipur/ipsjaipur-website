import React from 'react';
import { Send, Download } from 'lucide-react';

export default function ApplyNow() {
  return (
    <section className="apply-cta relative isolate w-full overflow-hidden bg-linear-to-br from-[#FCEFE3] via-[#FAE6D2] to-[#F6D7B8]  py-[40px] px-[16px]">
      <div className="relative w-full max-w-[1202px] mx-auto">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-0">
          <div className="apply-cta-fade min-w-0 flex-1">
            <h2 className="mt-2 font-extrabold lg:text-start text-center leading-[1.12] text-[#1B2E4A] text-[28px] lg:text-[36px] font-figtree">
              Apply Now &amp; Shape
              <br className="hidden sm:block" /> Your Future Today
            </h2>
          </div>

          <div className="relative mx-12 hidden self-stretch lg:block lg:w-px">
            <div className="absolute inset-y-2 left-0 border-l-2 border-dashed border-[#1B2E4A]/15"></div>
          </div>

          <div className="relative h-px w-full lg:hidden">
            <div className="absolute inset-x-2 top-0 border-t-2 border-dashed border-[#1B2E4A]/15"></div>
            <span className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-[#FBE7D3]"></span>
            <span className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-[#FBE7D3]"></span>
          </div>

          <div className="apply-cta-fade apply-cta-delay flex shrink-0 gap-3 flex-row sm:justify-end justify-center">
            <a
              href="https://admissions.ipsedu.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="apply-cta-btn group inline-flex items-center justify-center gap-2 rounded-xl bg-[#C8501F] sm:px-6 px-4 py-3.5 text-sm font-semibold text-[#FFFBF6] shadow-[0_8px_20px_-6px_rgba(200,80,31,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#A83F18] hover:shadow-[0_12px_26px_-6px_rgba(200,80,31,0.5)] sm:text-base"
            >
              <Send className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              Apply Now
            </a>
            <a
              href="/images/brochure/ips-brochure.pdf"
              download="ips-brochure.pdf"
              className="apply-cta-btn inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#C8501F]/30 bg-white/40 sm:px-6 px-4 py-3.5 text-sm font-semibold text-[#1B2E4A] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C8501F] hover:bg-white/70 sm:text-base"
            >
              <Download className="h-4 w-4 shrink-0" />
              Download Brochure
            </a>
            {/* <a
              href="/images/brochure/ips-brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="apply-cta-btn inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#C8501F]/30 bg-white/40 sm:px-6 px-4 py-3.5 text-sm font-semibold text-[#1B2E4A] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C8501F] hover:bg-white/70 sm:text-base"
            >
              <Download className="h-4 w-4 shrink-0" />
              Download Brochure
            </a> */}
          </div>
        </div>
      </div>
    </section>
  );
}
