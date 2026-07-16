import React from 'react';
import CourseBannerSlider from '../CourseBannerSlider';
import Breadcrumb from '@/components/common/Breadcrumb';
import BBACourseDetail from './BBACourseDetail';

// ── MBA Slider Images ────────────────────────────────────────────────────
const MBA_SLIDES = [
  {
    id: 1,
    src: 'images/courses/bba-image-3.webp',
    alt: 'BBA Program - IPS Business School',
    priority: true,
  },
  {
    id: 2,
    src: 'images/courses/bba-image-4.webp',
    alt: 'BBA Program - World-Class Curriculum',
    priority: false,
  },
  {
    id: 4,
    src: 'images/courses/bba-img-1.webp',
    alt: 'BBA Program - World-Class Curriculum',
    priority: false,
  },
  {
    id: 5,
    src: 'images/courses/bba-img-2.webp',
    alt: 'BBA Program - World-Class Curriculum',
    priority: false,
  },
];

export default function MainBBACourse() {
  return (
    <>
      <CourseBannerSlider slides={MBA_SLIDES} />
      <Breadcrumb pageName="BBA" />
      <BBACourseDetail />
    </>
  );
}
