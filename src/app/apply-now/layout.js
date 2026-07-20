import { Archivo } from 'next/font/google';

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

export default function LandingLayout({ children }) {
  return (
    <div className={`${archivo.variable} font-archivo`}>
      {children}
    </div>
  );
}
