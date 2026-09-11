import React from 'react';
import Breadcrumb from '../common/Breadcrumb';
import CommonBanner from '../courses/CommonBanner';
import IpsSutraContentSection from './IpsSutraContentSection';
import IpsAdvantagesSection from './IpsAdvantagesSection';

export default function MainIpsSutra({ ipsSutraContent }) {
  const contentData = ipsSutraContent?.content || {};
  const advantagesData = ipsSutraContent?.advantages || {};

  const bannerTitle = contentData?.bannerTitle || 'आईपीएस सूत्र';
  const bannerImageUrl =
    contentData?.bannerImageUrl || process.env.NEXT_PUBLIC_IMG_PATH + 'images/about/ips-sutra-banner-img-2.webp';

  return (
    <>
      <CommonBanner pageTitle={bannerTitle} bgImageUrl={bannerImageUrl} position="object-center" />
      <Breadcrumb pageName={bannerTitle} />
      <IpsSutraContentSection contentData={contentData} />
      <IpsAdvantagesSection advantagesData={advantagesData} />
    </>
  );
}
