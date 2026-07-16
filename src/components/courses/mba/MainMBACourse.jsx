import React from 'react';
import CourseBannerSlider from '../CourseBannerSlider';
import Breadcrumb from '@/components/common/Breadcrumb';
import MBACourseDetail from './MBACourseDetail';

// ── MBA Slider Images ────────────────────────────────────────────────────
const MBA_SLIDES = [
  {
    id: 1,
    src: 'images/courses/mba-image-1-new.webp',
    alt: 'MBA Program - World-Class Curriculum',
    priority: false,
  },
  {
    id: 2,
    src: 'images/courses/mba-image-2-new.webp',
    alt: 'MBA Program - Industry Connections',
    priority: false,
  },
  {
    id: 3,
    src: 'images/courses/mba-image-3-new.webp',
    alt: 'MBA Program - Career Opportunities',
    priority: false,
  },
  {
    id: 4,
    src: 'images/courses/mba-image-4-new.webp',
    alt: 'MBA Program - Career Opportunities',
    priority: false,
  },
];

export default function MainMBACourse() {
  return (
    <>
      <CourseBannerSlider slides={MBA_SLIDES} position="center" improveContrast={true} />
      <Breadcrumb pageName="MBA" />
      <MBACourseDetail />
    </>
  );
}
