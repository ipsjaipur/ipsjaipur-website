'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';

// In routes pe GA bilkul nahi chalega
const EXCLUDED_PREFIXES = ['/apply-now', '/admin', '/dashboard'];
const EXCLUDED_ROUTES = ['/thank-you'];

export default function GAScripts() {
  const pathname = usePathname();

  const isExcluded =
    EXCLUDED_ROUTES.includes(pathname) ||
    EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  if (isExcluded) return null;

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-VYMK7K8KJ0"
        strategy="afterInteractive"
      />
      <Script id="ga-primary" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-VYMK7K8KJ0');`}
      </Script>

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-S21HMSXXW9"
        strategy="afterInteractive"
      />
      <Script id="ga-secondary" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-S21HMSXXW9');`}
      </Script>
    </>
  );
}
