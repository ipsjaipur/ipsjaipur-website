import "./globals.css";
import "./app.css";
import { Rubik, Montserrat, Figtree } from 'next/font/google';
import ClientLayout from "./ClientLayout";
import GAScripts from "@/components/GAScripts";

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
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <GAScripts />
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
