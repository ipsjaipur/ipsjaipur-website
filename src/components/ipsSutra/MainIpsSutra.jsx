'use client';
import React from 'react';
import Breadcrumb from '../common/Breadcrumb';
import CommonBanner from '../courses/CommonBanner';
import ApprovalsAffiliations from '../home/ApprovalsAffiliations';
import IpsSutraContentSection from './IpsSutraContentSection';
import IpsAdvantagesSection from './IpsAdvantagesSection';

export default function MainIpsSutra() {
  return (
    <>
      <CommonBanner
        pageTitle="IPS Sutra"
        bgImageUrl="images/about/ips-sutra-banner-img-2.webp"
        position="object-center"
      />
      {/* <ApprovalsAffiliations /> */}
      <Breadcrumb pageName="IPS Sutra" />
      <IpsSutraContentSection />
      <IpsAdvantagesSection />
    </>
  );
}
