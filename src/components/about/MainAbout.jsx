import React from 'react';
import Breadcrumb from '../common/Breadcrumb';
import CommonBanner from '../courses/CommonBanner';
import CourseQuickLinks from '../courses/CourseQuickLinks';

export default function MainAbout({ aboutContent = {} }) {
  // ── Pull sections ─────────────────────────────────────────────────────────
  const contentData = aboutContent?.content || {};
  const sidebarData = aboutContent?.sidebar || {};

  // ── Banner ─────────────────────────────────────────────────────────────────
  const imgBase = process.env.NEXT_PUBLIC_IMG_PATH || '';
  const bannerTitle = contentData.bannerTitle || 'IPS Ideology';
  const bannerImageUrl = contentData.bannerImageUrl
    ? contentData.bannerImageUrl.startsWith('http')
      ? contentData.bannerImageUrl
      : `${imgBase}${contentData.bannerImageUrl}`
    : `${imgBase}images/about/about-us-image-3.webp`;
  const bannerPosition = contentData.bannerPosition || 'object-bottom';

  // ── Main content ───────────────────────────────────────────────────────────
  const pageHeading = contentData.pageHeading || 'IPS IDEOLOGY';
  const quoteText = contentData.quoteText || '';
  const descParagraphs = contentData.descriptionParagraphs?.length > 0 ? contentData.descriptionParagraphs : [];
  const whyChooseHeading = contentData.whyChooseHeading || 'Why Choose IPS BUSINESS SCHOOL?';
  const whyChooseItems =
    contentData.whyChooseItems?.length > 0
      ? [...contentData.whyChooseItems].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      : [];

  // ── Sidebar videos ─────────────────────────────────────────────────────────
  const videoUrls =
    sidebarData.sidebarVideos?.length > 0
      ? [...sidebarData.sidebarVideos]
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          .map(({ url, title }) => ({ url, title }))
      : [];

  const hasContent = !!(quoteText || descParagraphs.length || whyChooseItems.length);

  return (
    <div className="flex flex-col gap-2 justify-center">
      <CommonBanner pageTitle={bannerTitle} bgImageUrl={bannerImageUrl} position={bannerPosition} />
      <Breadcrumb pageName={bannerTitle} />

      <div className="max-w-[1400px] mx-auto md:px-[16px] w-full md:pt-[24px] pb-[64px]">
        <div className="flex flex-col xl:flex-row gap-6">
          {/* ── Left content column ─────────────────────────────────────────── */}
          <div className="text-[#444444]">
            <div className="border border-[#e9e9e9] px-[24px] md:px-[30px]">
              {/* Section header */}
              <div className="flex items-center border-b border-[#e9e9e9] pt-[10px] pb-[10px]">
                <h3 className="text-[20px] font-medium uppercase text-[#111111] mb-0">{pageHeading}</h3>
              </div>

              <div className="py-[30px] flex flex-col gap-6 text-[16px] leading-[28px] leading-relaxed text-justify text-gray-700">
                {/* Quote */}
                {quoteText && (
                  <p className="text-[#505050] text-center font-bold leading-[25px] text-[16px]">{quoteText}</p>
                )}

                {/* Description paragraphs */}
                {descParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}

                {/* Why Choose sub-section */}
                {(whyChooseHeading || whyChooseItems.length > 0) && (
                  <>
                    <h3 className="text-base font-bold text-gray-800 mt-4 border-b pb-1 border-gray-100">
                      {whyChooseHeading}
                    </h3>

                    {whyChooseItems.length > 0 && (
                      <div className="flex flex-col gap-5 mt-2 text-left">
                        {whyChooseItems.map((item, i) => (
                          <div key={i} className="flex gap-3 items-start">
                            <span className="text-amber-500 text-lg mt-0.5 shrink-0 select-none">💡</span>
                            <p>
                              <strong className="text-gray-800 font-bold">{item.boldText}:</strong> {item.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* Fallback — no content in DB yet */}
                {!hasContent && <p className="text-gray-400 text-center py-8">Content is being loaded…</p>}
              </div>
            </div>
          </div>

          {/* ── Right sidebar ────────────────────────────────────────────────── */}
          <CourseQuickLinks videoUrls={videoUrls} />
        </div>
      </div>
    </div>
  );
}
