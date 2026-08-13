'use client';
import React from 'react';
import HomeBanner from './HomeBanner';
import ApprovalsAffiliations from './ApprovalsAffiliations';
import IpsMethodology from './IpsMethodology';
import PathwayToExcellence from './PathwayToExcellence';
import ProgramsOffered from './ProgramsOffered';
import Placements from './Placements';
import VideoGallery from './VideoGallery';
import OurAchievers from './OurAchievers';
import StudentTestimonials from './StudentTestimonials';
import ApplyNow from './ApplyNow';
import CampusNews from './CampusNews';

export default function MainHome({ placementsNews = [], ipsNews = [], blogs = [] }) {
  return (
    <>
      <HomeBanner />
      <ApprovalsAffiliations />
      <IpsMethodology />
      <PathwayToExcellence />
      <ProgramsOffered />
      <Placements />
      <VideoGallery />
      <OurAchievers />
      <StudentTestimonials />
      <ApplyNow />
      {/* <CampusNewsStatic /> */}
      <CampusNews placementsNews={placementsNews} ipsNews={ipsNews} blogs={blogs} />
    </>
  );
}
