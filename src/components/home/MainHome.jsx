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

export default function MainHome({
  // Campus News (existing dynamic data from DB)
  placementsNews = [],
  ipsNews = [],
  blogs = [],
  // Home page section content from HomePageContent collection
  homeContent = {},
}) {
  return (
    <>
      <HomeBanner data={homeContent.banner} />
      <ApprovalsAffiliations data={homeContent.approvals} />
      <IpsMethodology data={homeContent.methodology} />
      <PathwayToExcellence data={homeContent.pathway} />
      <ProgramsOffered data={homeContent.programs} />
      <Placements data={homeContent.placements} />
      <VideoGallery data={homeContent.videoGallery} />
      <OurAchievers data={homeContent.achievers} />
      <StudentTestimonials data={homeContent.testimonials} />
      <ApplyNow />
      <CampusNews placementsNews={placementsNews} ipsNews={ipsNews} blogs={blogs} />
    </>
  );
}
