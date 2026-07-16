// ─── Static Navigation Data ──────────────────────────────────────────────────

export const topBarContact = {
  helpText: 'How may I help you?',
  phone: { text: '+91 8233970000', link: 'tel:+918233970000' },
  whatsapp: { text: '+91 8233970000', link: 'https://wa.me/918233970000' },
  email: { text: 'info@ipsedu.in', link: 'mailto:info@ipsedu.in' },
};

export const topBarLinks = [
  { label: 'MBA', href: '/mba' },
  { label: 'BBA', href: '/bba' },
  { label: 'BCA', href: '/bca' },
];

export const applyButton = {
  text: 'Apply Online',
  href: 'https://admissions.ipsedu.in/',
};

export const announcement = {
  label: 'Announcement',
  items: [
    {
      text: 'Admissions Open for BBA 2026 - 29',
      link: '/admissions',
    },
    {
      text: 'Top Ranked Best BBA (Bachelor of Business Administration) College in Jaipur Rajasthan (India).',
      link: '/bba',
    },
    {
      text: 'Top Ranked Best BCA (Bachelor of Computer Application) College in Jaipur Rajasthan (India).',
      link: '/bca',
    },
    {
      text: 'Top Ranked Best MBA (Master in Business Administration) College in Jaipur Rajasthan (India).',
      link: '/mba',
    },
  ],
};

export const mainNav = [
  { label: 'HOME', href: '/' },
  {
    label: 'ABOUT US',
    children: [
      { label: 'IPS Ideology', href: '/about' },
      { label: 'Faculty', href: '/faculty' },
      { label: 'Infrastructure', href: '/infrastructure' },
      { label: 'Student Life', href: '/student-life' },
    ],
  },
  {
    label: 'COURSES',
    children: [
      { label: 'MBA', href: '/mba' },
      { label: 'BBA', href: '/bba' },
      { label: 'BCA', href: '/bca' },
      { label: 'Scholarships', href: '/scholarships' },
      { label: 'Career @ IPS BUSINESS SCHOOL', href: '/career-ips-business-school' },
      { label: 'Anti Ragging', href: '/anti-ragging' },
      { label: 'Education Loan', href: '/documents-required-for-education-loan' },
    ],
  },
  { label: "LIFE@IPS", href: '/life-at-ips' },
  { label: 'PLACEMENTS', href: '/placements' },
  { label: 'CONTACT', href: '/contact' },
];

export const helpline = {
  label: 'Admission Helpline',
  phoneNumber: '+91 8233970000',
  link: 'tel:+918233970000',
};
export const MailBox = {
  mail: 'info@ipsedu.in',
  link: 'mailto:info@ipsedu.in',
};
