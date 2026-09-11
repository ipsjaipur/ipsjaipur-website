'use client';
import React from 'react';
import Breadcrumb from '../common/Breadcrumb';
import CommonBanner from '../courses/CommonBanner';
import DirectorMessageSection from './DirectorMessageSection';
import StrategicExcellence from './StrategicExcellence';

export default function MainDirectorMessage() {
  const bannerImageUrl = process.env.NEXT_PUBLIC_IMG_PATH + 'images/about/director-message-img-2.webp';

  return (
    <>
      <CommonBanner pageTitle="Director's Message" bgImageUrl={bannerImageUrl} position="object-center" />
      <Breadcrumb pageName="Director's Message" />
      <DirectorMessageSection />
      <StrategicExcellence />
    </>
  );
}
