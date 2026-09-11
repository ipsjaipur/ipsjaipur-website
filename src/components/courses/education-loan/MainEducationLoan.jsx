import React from 'react';
import CommonBanner from '../CommonBanner';
import Breadcrumb from '@/components/common/Breadcrumb';
import EducationDetail from './EducationDetail';

export default function MainEducationLoan() {
  const bannerImageUrl = process.env.NEXT_PUBLIC_IMG_PATH + 'images/courses/education-loan.webp';

  return (
    <>
      <CommonBanner pageTitle="Education loan" bgImageUrl={bannerImageUrl} normalFont={true} position="object-top" />
      <Breadcrumb pageName="Education loan" />
      <EducationDetail />
    </>
  );
}
