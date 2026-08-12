'use client';
import React from 'react';
import Breadcrumb from '../common/Breadcrumb';
import CommonBanner from '../courses/CommonBanner';
import MbaVsPgdmContentSection from './MbaVsPgdmContentSection';
import MbaFeatures from './MbaFeatures';
import ComparisonMatrix from './ComparisonMatrix';

export default function MainMbaVsPgdm() {
  return (
    <>
      <CommonBanner
        pageTitle="MBA vs. PGDM"
        bgImageUrl="images/about/mba-vs-pgdm-bg-2.webp"
        position=" object-[50%_35%]"
      />
      <Breadcrumb pageName="MBA vs. PGDM" />
      <MbaVsPgdmContentSection />
      <ComparisonMatrix />
      <MbaFeatures />
    </>
  );
}
