'use client';
import React from 'react';
import Breadcrumb from '../common/Breadcrumb';
import CommonBanner from '../courses/CommonBanner';
import DirectorMessageSection from './DirectorMessageSection';
import StrategicExcellence from './StrategicExcellence';

export default function MainDirectorMessage() {
  return (
    <>
      <CommonBanner
        pageTitle="Director's Message"
        bgImageUrl="images/about/about-us-image-3.webp"
        position="object-center"
      />
      <Breadcrumb pageName="Director's Message" />
      <DirectorMessageSection />
      <StrategicExcellence />
    </>
  );
}
