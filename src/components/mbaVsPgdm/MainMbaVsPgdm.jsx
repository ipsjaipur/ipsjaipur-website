'use client';
import Breadcrumb from '../common/Breadcrumb';
import CommonBanner from '../courses/CommonBanner';
import MbaVsPgdmContentSection from './MbaVsPgdmContentSection';
import ComparisonMatrix from './ComparisonMatrix';
import MbaFeatures from './MbaFeatures';
import { cloudinaryImage } from '@/_utils/cloudinaryImage';

export default function MainMbaVsPgdm({ pageContent = {} }) {
  const bannerData = pageContent?.banner || {};
  const contentData = pageContent?.content || {};
  const comparisonData = pageContent?.comparison || {};

  const bannerTitle = bannerData.bannerTitle || 'MBA vs. PGDM';
  const bannerPosition = bannerData.bannerPosition || 'object-[50%_35%]';
  const bannerImageUrl = cloudinaryImage(bannerData.bannerImageUrl || '', 'f_auto,q_auto,w_1920');

  return (
    <>
      <CommonBanner pageTitle={bannerTitle} bgImageUrl={bannerImageUrl} position={bannerPosition} />
      <Breadcrumb pageName="MBA vs. PGDM" />
      <MbaVsPgdmContentSection data={contentData} />
      <ComparisonMatrix data={comparisonData} />
      <MbaFeatures data={comparisonData} />
    </>
  );
}
