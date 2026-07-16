import { Archivo } from 'next/font/google';
import Script from 'next/script';

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-archivo',
  display: 'swap',
});

export const metadata = {
  title: 'Apply Now — IPS Business School',
  description: 'Start your MBA journey at IPS Business School, Jaipur.',
};

const GTM_ID = 'GTM-KD4KGSCL';

export default function LandingLayout({ children }) {
  return (
    <>
      {/* GTM — only on apply-now */}
      <Script id="gtm-lp-head" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>

      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>

      <div className={`${archivo.variable} font-archivo`}>
        {children}
      </div>
    </>
  );
}
