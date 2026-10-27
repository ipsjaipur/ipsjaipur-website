import React from 'react';
import CommonBanner from '../CommonBanner';
import Breadcrumb from '@/components/common/Breadcrumb';
import EducationDetail from './EducationDetail';
import { cloudinaryImage } from '@/_utils/cloudinaryImage';

export default function MainEducationLoan({ pageContent = {} }) {
  const bannerData = pageContent?.banner || {};

  const bannerTitle = bannerData.bannerTitle || 'Education loan';
  const bannerPosition = bannerData.bannerPosition || 'object-top';

  // Cloudinary-optimised when a DB image is set; falls back to original static image
  const bannerImageUrl = bannerData.bannerImageUrl
    ? cloudinaryImage(bannerData.bannerImageUrl, 'f_auto,q_auto,w_1920')
    : process.env.NEXT_PUBLIC_IMG_PATH + 'images/courses/education-loan.webp';

  return (
    <>
      <CommonBanner pageTitle={bannerTitle} normalFont={true} bgImageUrl={bannerImageUrl} position={bannerPosition} />
      <Breadcrumb pageName={bannerTitle} />
      <EducationDetail pageContent={pageContent} />
    </>
  );
}
