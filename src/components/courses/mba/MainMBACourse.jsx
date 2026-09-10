import React from 'react';
import CourseBannerSlider from '../CourseBannerSlider';
import Breadcrumb from '@/components/common/Breadcrumb';
import MBACourseDetail from './MBACourseDetail';

export default function MainMBACourse({ mbaContent = {} }) {
  return (
    <>
      <CourseBannerSlider slides={mbaContent?.banner?.bannerSlides} position="center" improveContrast={true} />
      <Breadcrumb pageName="MBA" />
      <MBACourseDetail mbaContent={mbaContent} />
    </>
  );
}
