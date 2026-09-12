'use client';
import React from 'react';
import Breadcrumb from '../common/Breadcrumb';
import StudentPlacements from './StudentPlacements';
import PlacementStats from './PlacementStats';
import PlacementPatners from './PlacementPatners';
import ResumeBook from './ResumeBook';
import PlacementUpdates from './PlacementUpdates';
import PlacementFAQ from './PlacementFAQ';
import CommonBanner from '../courses/CommonBanner';
import { cloudinaryImage } from '@/_utils/cloudinaryImage';

export default function MainPlacement({
  placementsData,
  bannerData,
  statsData,
  updatesData,
  resumeBookData,
  faqData,
  coordinatorData,
}) {
  // ── Banner ─────────────────────────────────────────────────────────────────
  const bannerTitle = bannerData?.bannerTitle || 'Placements';
  const bannerPosition = bannerData?.bannerPosition || 'object-bottom';
  const rawBannerImg =
    bannerData?.bannerImageUrl || process.env.NEXT_PUBLIC_IMG_PATH + `images/courses/placement-bg2.webp`;
  const bannerImageUrl = cloudinaryImage(rawBannerImg, 'f_auto,q_auto,w_1920');

  return (
    <>
      <CommonBanner pageTitle={bannerTitle} bgImageUrl={bannerImageUrl} position={bannerPosition} />
      <Breadcrumb pageName={bannerTitle} />

      {/* slider + coordinator marquee — needs shared placements doc + coordinator */}
      <StudentPlacements placementsData={placementsData} coordinatorData={coordinatorData} />

      {/* sector-wise infographic images */}
      <PlacementStats data={statsData} />

      {/* company logo marquee — needs shared placements doc */}
      <PlacementPatners placementsData={placementsData} />

      {/* YouTube video-résumé grid */}
      <ResumeBook data={resumeBookData} />

      {/* placed student cards + coordinator marquee */}
      <PlacementUpdates data={updatesData} coordinatorData={coordinatorData} />

      {/* industry hiring practices accordion */}
      <PlacementFAQ data={faqData} />
    </>
  );
}
