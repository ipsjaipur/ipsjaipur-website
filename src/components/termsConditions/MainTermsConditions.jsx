'use client';
import React from 'react';
import Breadcrumb from '../common/Breadcrumb';
import CommonBanner from '../courses/CommonBanner';
import TabbedContent from './TabbedContent';

export default function MainTermsConditions() {
  return (
    <>
      <CommonBanner
        pageTitle="Terms & Conditions"
        bgImageUrl="images/about/terms-and-contition.webp"
        position="object-center"
      />
      <Breadcrumb pageName="Terms & Conditions" />
      <TabbedContent />
    </>
  );
}
