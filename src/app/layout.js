import "./globals.css";
import "./app.css";
import { Rubik, Montserrat, Figtree } from 'next/font/google';
import ClientLayout from "./ClientLayout";
import Script from 'next/script';

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-rubik',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
});

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-figtree',
  display: 'swap',
});

export const metadata = {
  other: {
    'google-site-verification': 'XsoG7mtYQkbww_ci_k-CY5FCw4p8QjhZaPmXl4bwl4U',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`h-full antialiased ${rubik.variable} ${montserrat.variable} ${figtree.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta property="og:type" content="course" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="16x16 32x32 48x48" />
        {/* Google Tag Manager — must be as high in <head> as possible */}
        <Script id="gtm-head" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-KD4KGSCL');`}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {/* Google Tag Manager (noscript) — immediately after <body> opening tag */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KD4KGSCL"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
