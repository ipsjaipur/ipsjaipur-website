'use client';
import React, { useRef } from 'react';
import PlacementBanner from './PlacementBanner';
import Breadcrumb from '../common/Breadcrumb';
import StudentPlacements from './StudentPlacements';
import PlacementStats from './PlacementStats';
import PlacementPatners from './PlacementPatners';
import ResumeBook from './ResumeBook';
import PlacementUpdates from './PlacementUpdates';
import PlacementFAQ from './PlacementFAQ';
import CommonBanner from '../courses/CommonBanner';

export default function MainPlacement() {
  return (
    <>
      <CommonBanner pageTitle="Placements" bgImageUrl="images/courses/placement-bg2.webp" position="object-bottom" />
      <Breadcrumb pageName={'Placements'} />
      <StudentPlacements />
      <PlacementStats />
      <PlacementPatners />
      <ResumeBook />
      <PlacementUpdates />
      <PlacementFAQ />
    </>
  );
}
