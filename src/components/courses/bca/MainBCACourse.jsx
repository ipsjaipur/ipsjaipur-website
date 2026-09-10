import React from 'react';
import CourseBannerSlider from '../CourseBannerSlider';
import Breadcrumb from '@/components/common/Breadcrumb';
import BCACourseDetail from './BCACourseDetail';

export default function MainBCACourse({ bcaContent = {} }) {
  return (
    <>
      <CourseBannerSlider slides={bcaContent?.banner?.bannerSlides} />
      <Breadcrumb pageName="BCA" />
      <BCACourseDetail bcaContent={bcaContent} />
    </>
  );
}
