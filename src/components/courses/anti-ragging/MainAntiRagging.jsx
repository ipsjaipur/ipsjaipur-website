import React from 'react';
import Breadcrumb from '@/components/common/Breadcrumb';
import AntiRaggingDetail from './AntiRaggingDetail';
import CommonBanner from '../CommonBanner';

export default function MainAntiRagging() {
  return (
    <>
      <CommonBanner pageTitle="Anti Ragging" bgImageUrl="images/courses/anit-raging-bg.webp" />
      <Breadcrumb pageName="Anti Ragging" />
      <AntiRaggingDetail />
    </>
  );
}
