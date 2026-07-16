'use client';

import { useEffect } from 'react';
import { storeUtmParams } from '@/_utils/utmHelper';

/**
 * Component to track and store UTM parameters from URL
 * Should be included in the root layout or main app component
 */
export default function UtmTracker() {
  useEffect(() => {
    // Store UTM parameters when component mounts
    storeUtmParams();
  }, []);

  // This component doesn't render anything
  return null;
}
