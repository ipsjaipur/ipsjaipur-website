'use client';

import parse, { domToReact } from 'html-react-parser';
import CommonBanner from '@/components/courses/CommonBanner';
import Breadcrumb from '@/components/common/Breadcrumb';

// Only intercept <table> — wrap it for horizontal scroll without breaking width:100%
const parserOptions = {
  replace(domNode) {
    if (domNode.type === 'tag' && domNode.name === 'table') {
      return (
        <div className="table-wrapper">
          <table>{domToReact(domNode.children, parserOptions)}</table>
        </div>
      );
    }
  },
};

export default function ScheduleDetailPage({ schedule }) {
  const bannerImageUrl = process.env.NEXT_PUBLIC_IMG_PATH + 'images/about/about-us.webp';

  return (
    <>
      <CommonBanner pageTitle={schedule.title} normalFont bgImageUrl={bannerImageUrl} position="object-center" />
      <Breadcrumb pageName={schedule.title} detailPage={[]} />
      <section className="py-10 px-4 min-h-[60vh]">
        <div className="max-w-[1202px] mx-auto">
          <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-6 md:p-10">
            <h1 className="text-[22px] md:text-[30px] font-bold text-[#2a3e61] mb-6 font-rubik leading-snug">
              {schedule.title}
            </h1>

            <div className="flex items-center gap-2 mb-8">
              <div className="h-1 w-12 bg-[#eb5905] rounded-full" />
              <div className="h-0.5 flex-1 bg-[#e2e8f0]" />
            </div>

            {schedule.content ? (
              <div className="schedule-content">{parse(schedule.content, parserOptions)}</div>
            ) : (
              <p className="text-[#77838f] text-[14px]">No schedule content available.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
