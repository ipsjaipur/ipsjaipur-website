'use client';
import React from 'react';
import Breadcrumb from '../common/Breadcrumb';
import CommonBanner from '../courses/CommonBanner';
import BoardOfAdvisorsSection from './BoardOfAdvisorsSection';
import BridgingTheorySection from './BridgingTheorySection';

export default function MainBoardOfAdvisors() {
  return (
    <>
      <CommonBanner
        pageTitle="Board of Advisors"
        bgImageUrl="images/about/board-of-advisor-img.webp"
        position="object-center"
      />
      <Breadcrumb pageName="Board of Advisors" />
      <BoardOfAdvisorsSection />
      <BridgingTheorySection />
    </>
  );
}
