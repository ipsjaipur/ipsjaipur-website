import React from 'react';
import CommonBanner from '../CommonBanner';
import Breadcrumb from '@/components/common/Breadcrumb';
import EducationDetail from './EducationDetail';

export default function MainEducationLoan() {
  return (
    <>
      <CommonBanner
        pageTitle="Education loan"
        bgImageUrl="images/courses/education-loan.webp"
        normalFont={true}
        position="object-top"
      />
      <Breadcrumb pageName="Education loan" />
      <EducationDetail />
    </>
  );
}
