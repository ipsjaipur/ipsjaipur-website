import React from 'react';
import Breadcrumb from '@/components/common/Breadcrumb';
import AntiRaggingDetail from './AntiRaggingDetail';
import CommonBanner from '../CommonBanner';

export default function MainAntiRagging() {
  const bannerImageUrl = process.env.NEXT_PUBLIC_IMG_PATH + 'images/courses/anit-raging-bg.webp';

  return (
    <>
      <CommonBanner pageTitle="Anti Ragging" bgImageUrl={bannerImageUrl} />
      <Breadcrumb pageName="Anti Ragging" />
      <AntiRaggingDetail />
    </>
  );
}
