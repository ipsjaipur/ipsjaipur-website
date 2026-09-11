'use client';
import React from 'react';
import Breadcrumb from '../common/Breadcrumb';
import CommonBanner from '../courses/CommonBanner';
import InstitutionalSection from './InstitutionalSection';
import ExcellenceNarrativeSection from './ExcellenceNarrativeSection';
import CoreValuesSection from './CoreValuesSection';

export default function MainMissionVision() {
  const bannerImageUrl = process.env.NEXT_PUBLIC_IMG_PATH + 'images/about/mission-vision-bg-2.webp';

  return (
    <>
      <CommonBanner pageTitle="Mission & Vision" bgImageUrl={bannerImageUrl} position="object-center" />
      <Breadcrumb pageName="Mission & Vision" />
      <InstitutionalSection />
      <ExcellenceNarrativeSection />
      <CoreValuesSection />
    </>
  );
}
