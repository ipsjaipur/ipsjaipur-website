'use client';
import React from 'react';
import Breadcrumb from '../common/Breadcrumb';
import CommonBanner from '../courses/CommonBanner';
import BoardOfAdvisorsSection from './BoardOfAdvisorsSection';
import BridgingTheorySection from './BridgingTheorySection';

export default function MainBoardOfAdvisors() {
  const bannerImageUrl = process.env.NEXT_PUBLIC_IMG_PATH + 'images/about/board-of-advisor-img.webp';

  return (
    <>
      <CommonBanner pageTitle="Board of Advisors" bgImageUrl={bannerImageUrl} position="object-center" />
      <Breadcrumb pageName="Board of Advisors" />
      <BoardOfAdvisorsSection />
      <BridgingTheorySection />
    </>
  );
}
