export function getUtmParams() {
  if (typeof window === 'undefined') {
    return {};
  }

  const urlParams = new URLSearchParams(window.location.search);
  const utmParams = {};

  // Iterate through all URL parameters and capture any that start with 'utm_'
  for (const [key, value] of urlParams.entries()) {
    if (key.startsWith('utm_')) {
      utmParams[key] = value;
    }
  }

  return utmParams;
}

export function storeUtmParams() {
  if (typeof window === 'undefined') {
    return;
  }

  const utmParams = getUtmParams();

  // Only store if there are UTM parameters
  if (Object.keys(utmParams).length > 0) {
    sessionStorage.setItem('utm_params', JSON.stringify(utmParams));
  }
}

export function getStoredUtmParams() {
  if (typeof window === 'undefined') {
    return {};
  }

  // First check current URL
  const currentUtmParams = getUtmParams();

  // If current URL has UTM params, use those and update storage
  if (Object.keys(currentUtmParams).length > 0) {
    storeUtmParams();
    return currentUtmParams;
  }

  // Otherwise, try to get from sessionStorage
  try {
    const stored = sessionStorage.getItem('utm_params');
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error reading UTM params from sessionStorage:', error);
    return {};
  }
}
