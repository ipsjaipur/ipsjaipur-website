'use client';
import React from 'react';
import Breadcrumb from '../common/Breadcrumb';
import CommonBanner from '../courses/CommonBanner';
import MbaVsPgdmContentSection from './MbaVsPgdmContentSection';
import MbaFeatures from './MbaFeatures';
import ComparisonMatrix from './ComparisonMatrix';

export default function MainMbaVsPgdm() {
  const bannerImageUrl = process.env.NEXT_PUBLIC_IMG_PATH + 'images/about/mba-vs-pgdm-bg-2.webp';

  return (
    <>
      <CommonBanner pageTitle="MBA vs. PGDM" bgImageUrl={bannerImageUrl} position=" object-[50%_35%]" />
      <Breadcrumb pageName="MBA vs. PGDM" />
      <MbaVsPgdmContentSection />
      <ComparisonMatrix />
      <MbaFeatures />
    </>
  );
}
