'use client';

import React from 'react';
import CommonBanner from '../courses/CommonBanner';
import Breadcrumb from '../common/Breadcrumb';
import InstitutionalSection from './InstitutionalSection';
import ExcellenceNarrativeSection from './ExcellenceNarrativeSection';
import CoreValuesSection from './CoreValuesSection';
import { cloudinaryImage } from '@/_utils/cloudinaryImage';

export default function MainMissionVision({ pageContent = {} }) {
  const bannerData = pageContent?.banner || {};
  const institutionalData = pageContent?.institutional || {};
  const visionMissionData = pageContent?.vision_mission || {};
  const coreValuesData = pageContent?.core_values || {};

  const bannerTitle = bannerData.bannerTitle || 'Mission & Vision';
  const bannerPosition = bannerData.bannerPosition || 'object-center';
  const bannerImageUrl = cloudinaryImage(bannerData.bannerImageUrl || '', 'f_auto,q_auto,w_1920');

  return (
    <>
      <CommonBanner pageTitle={bannerTitle} bgImageUrl={bannerImageUrl} position={bannerPosition} />
      <Breadcrumb pageName={bannerTitle} />
      <InstitutionalSection data={institutionalData} />
      <ExcellenceNarrativeSection data={visionMissionData} />
      <CoreValuesSection data={coreValuesData} />
    </>
  );
}
