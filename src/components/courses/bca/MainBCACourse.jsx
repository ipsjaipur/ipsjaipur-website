import React from 'react';
import CourseBannerSlider from '../CourseBannerSlider';
import Breadcrumb from '@/components/common/Breadcrumb';
import BCACourseDetail from './BCACourseDetail';

// ── BCA Slider Images ────────────────────────────────────────────────────
const BCA_SLIDES = [
  {
    id: 1,
    src: 'images/courses/bca-image-1.webp',
    alt: 'BCA Program - IPS Business School',
    priority: true,
  },
  {
    id: 2,
    src: 'images/courses/bca-image-2.webp',
    alt: 'BCA Program - IPS Business School',
    priority: true,
  },
  {
    id: 2,
    src: 'images/courses/bca-image-4.webp',
    alt: 'BCA Program - IPS Business School',
    priority: true,
  },
  {
    id: 2,
    src: 'images/courses/bca-image-3.webp',
    alt: 'BCA Program - IPS Business School',
    priority: true,
  },
];

export default function MainBCACourse() {
  return (
    <>
      <CourseBannerSlider slides={BCA_SLIDES} courseName="BCA" position="center" />
      <Breadcrumb pageName="BCA" />
      <BCACourseDetail />
    </>
  );
}
