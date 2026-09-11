'use client';
import React from 'react';
import Breadcrumb from '../common/Breadcrumb';
import CommonBanner from '../courses/CommonBanner';
import TabbedContent from './TabbedContent';

export default function MainTermsConditions() {
  const bannerImageUrl = process.env.NEXT_PUBLIC_IMG_PATH + 'images/about/terms-and-contition.webp';

  return (
    <>
      <CommonBanner pageTitle="Terms & Conditions" bgImageUrl={bannerImageUrl} position="object-center" />
      <Breadcrumb pageName="Terms & Conditions" />
      <TabbedContent />
    </>
  );
}
