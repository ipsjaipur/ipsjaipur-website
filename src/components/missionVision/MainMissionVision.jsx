'use client';
import React from 'react';
import Breadcrumb from '../common/Breadcrumb';
import CommonBanner from '../courses/CommonBanner';
import InstitutionalSection from './InstitutionalSection';
import ExcellenceNarrativeSection from './ExcellenceNarrativeSection';
import CoreValuesSection from './CoreValuesSection';

export default function MainMissionVision() {
  return (
    <>
      <CommonBanner
        pageTitle="Mission & Vision"
        bgImageUrl="images/about/mission-vision-bg-2.webp"
        position="object-center"
      />
      <Breadcrumb pageName="Mission & Vision" />
      <InstitutionalSection />
      <ExcellenceNarrativeSection />
      <CoreValuesSection />
    </>
  );
}
