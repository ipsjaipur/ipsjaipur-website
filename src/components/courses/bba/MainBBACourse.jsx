import React from 'react';
import CourseBannerSlider from '../CourseBannerSlider';
import Breadcrumb from '@/components/common/Breadcrumb';
import BBACourseDetail from './BBACourseDetail';

export default function MainBBACourse({ bbaContent = {} }) {
  return (
    <>
      <CourseBannerSlider slides={bbaContent?.banner?.bannerSlides} />
      <Breadcrumb pageName="BBA" />
      <BBACourseDetail bbaContent={bbaContent} />
    </>
  );
}
