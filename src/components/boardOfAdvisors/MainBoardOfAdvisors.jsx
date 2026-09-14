import React from 'react';
import Breadcrumb from '../common/Breadcrumb';
import CommonBanner from '../courses/CommonBanner';
import BoardOfAdvisorsSection from './BoardOfAdvisorsSection';
import BridgingTheorySection from './BridgingTheorySection';
import { cloudinaryImage } from '@/_utils/cloudinaryImage';

export default function MainBoardOfAdvisors({ boardContent = {} }) {
  const imgBase = process.env.NEXT_PUBLIC_IMG_PATH || '';

  // ── Banner section ─────────────────────────────────────────────────────────
  const bannerData = boardContent?.banner || {};
  const bannerTitle = bannerData.bannerTitle || 'Board of Advisors';
  const bannerImageUrl = cloudinaryImage(
    bannerData.bannerImageUrl || `${imgBase}images/about/board-of-advisor-img.webp`,
    'f_auto,q_auto,w_1920',
  );
  const bannerPosition = bannerData.bannerPosition || 'object-center';

  // ── Advisors section data ──────────────────────────────────────────────────
  const advisorsData = boardContent?.advisors || {};

  // ── Bridging section data ──────────────────────────────────────────────────
  const bridgingData = boardContent?.bridging || {};

  return (
    <>
      <CommonBanner pageTitle={bannerTitle} bgImageUrl={bannerImageUrl} position={bannerPosition} />
      <Breadcrumb pageName={bannerTitle} />
      <BoardOfAdvisorsSection advisorsData={advisorsData} />
      <BridgingTheorySection bridgingData={bridgingData} />
    </>
  );
}
