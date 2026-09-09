import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import HomePageContent from '@/models/HomePageContent';
import { getAuthFromCookies } from '@/lib/auth';

/**
 * POST /api/home-content/seed
 * Admin-protected. Inserts the current static data as the initial DB content.
 * Safe to re-run — uses upsert so it won't duplicate.
 * Pass ?force=true to overwrite existing docs with original defaults.
 */
export async function POST(request) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const force = searchParams.get('force') === 'true';

    await connectDB();

    const imgBase = process.env.NEXT_PUBLIC_IMG_PATH || '';

    const sections = [
      // ── Banner ──────────────────────────────────────────────────────────────
      {
        section: 'banner',
        bannerSeoH1: 'Industry-Focused Learning at the Top Business Schools in Jaipur',
        bannerSlides: [
          {
            src: `${imgBase}images/home/ips-home-img-2.webp`,
            alt: 'IPS Business School - Main Campus Banner',
            priority: true,
            order: 0,
          },
          {
            src: `${imgBase}images/home/Ranked-banner.webp`,
            alt: 'IPS Business School - Ranked Among The Best',
            priority: false,
            order: 1,
          },
        ],
      },

      // ── Approvals & Affiliations ─────────────────────────────────────────────
      {
        section: 'approvals',
        affiliations: [
          {
            label: 'Approved by',
            name: 'All India Council for Technical Education',
            logo: `${imgBase}images/home/aicte.webp`,
            alt: 'AICTE Logo',
            order: 0,
          },
          {
            label: 'Affiliated with',
            name: 'Rajasthan Technical University (RTU)',
            logo: `${imgBase}images/home/rtu.webp`,
            alt: 'RTU Logo',
            order: 1,
          },
        ],
      },

      // ── IPS Methodology ──────────────────────────────────────────────────────
      {
        section: 'methodology',
        methodologySectionLabel: 'START TODAY',
        methodologyHeading: 'About IPS Business School',
        methodologyDescription:
          "IPS Business School is a centre of technical management and computer education. It is one of the top business schools in Jaipur, shaping business practices and transforming careers across the globe. It has been trusted by students for the last two decades because of its close-knitted placement network and top-notch infrastructure. Here are other reasons students choose IPS:",
        methodologyFeatures: [
          {
            iconName: 'FlaskConical',
            title: 'Research Excellence',
            text: 'Our panel includes part-time distinguished research professors and entrepreneurs who encourage our students to engage in research and innovation.',
            order: 0,
          },
          {
            iconName: 'BookOpen',
            title: 'Teaching Excellence',
            text: 'Our teaching faculty consists of world-class researchers, entrepreneurs, and professors of Practice who have witnessed it firsthand, and transfer their insights and aid practical learning in the classroom.',
            order: 1,
          },
          {
            iconName: 'Users',
            title: 'Producing the Most Valuable Graduates',
            text: 'We are listed among the top B schools in Jaipur because we turn our students into fantastic graduates with a thirst for learning and a rounded approach to life & work.',
            order: 2,
          },
          {
            iconName: 'Briefcase',
            title: 'On-the-Job Training',
            text: 'On-the-job training is fundamental to our teaching methodology at IPS, where students work with top corporate and multinationals while studying.',
            order: 3,
          },
        ],
        methodologyCTAText: 'Read More',
        methodologyCTALink: '/about',
      },

      // ── Pathway to Excellence ────────────────────────────────────────────────
      {
        section: 'pathway',
        pathwaySectionLabel: 'IPS COLLEGE',
        pathwayHeading: 'Your Pathway to Excellence',
        pathwayCenterImage: `${imgBase}images/home/ab-n-1.webp`,
        pathwayCards: [
          { icon: `${imgBase}images/home/online-learning.webp`, title: 'Regular Degree with Work Experience(OJTs & Live projects).', color: '#FF6B00', order: 0 },
          { icon: `${imgBase}images/home/advertisig-agency.webp`, title: 'Additional Digital Marketing Course', color: '#FF6B00', order: 1 },
          { icon: `${imgBase}images/home/monitor.webp`, title: 'Additional Data/Business Analytics Course', color: '#FF6B00', order: 2 },
          { icon: `${imgBase}images/home/exellent.webp`, title: '18+ Years Of Excellence In Technical Education', color: '#FF9E3D', order: 3 },
          { icon: `${imgBase}images/home/artificial-intelligence.webp`, title: 'Additional Artificial Intelligence and Machine Learning Course', color: '#FF9E3D', order: 4 },
          { icon: `${imgBase}images/home/foreign.webp`, title: '3 Months Foreign Immersion Programme Each Year', color: '#FF9E3D', order: 5 },
          { icon: `${imgBase}images/home/experienced.webp`, title: 'Best & Experienced Faculty Members', color: '#FF9E3D', order: 6 },
          { icon: `${imgBase}images/home/ranking.webp`, title: 'Top Ranked College For Best Placements In The Country', color: '#FF6B00', order: 7 },
          { icon: `${imgBase}images/home/save.webp`, title: 'Leading College With Affordable Fee Structure', color: '#FF6B00', order: 8 },
          { icon: `${imgBase}images/home/group.webp`, title: 'Strong Alumni Network', color: '#FF6B00', order: 9 },
        ],
      },

      // ── Programs Offered ─────────────────────────────────────────────────────
      {
        section: 'programs',
        programsHeading: 'Programs Offered',
        programsSubHeading: 'Discover Your Perfect Program',
        programs: [
          {
            badge: 'MBA',
            title: 'MBA Dual Major Specialization',
            image: `${imgBase}images/home/mba.webp`,
            description: 'MBA at IPS Business College empowers future leaders with industry-focused learning, Practical exposure, and strong placement support',
            hoverTitle: 'MBA Dual Major Specialization',
            features: [
              'Master of Business Administration (MBA) Degree with Dual Specialization.',
              "Realtime Corporate Experience through Regular OJT's (On Job Training) & Live Projects.",
              'Additional AI/Business Analytics Course.',
              'Additional Digital Marketing Course.',
              '3 Months International, Trainings & Exchange Program (Sponsored / Optional)*.',
              'Best Placements.',
            ],
            approvals: [
              { name: 'AICTE', logo: `${imgBase}images/home/aicte.webp` },
              { name: 'RTU', logo: `${imgBase}images/home/rtu.webp` },
            ],
            duration: '2 years',
            eligibility: 'Check Eligibility',
            buttonText: 'Read More',
            link: '/mba',
            order: 0,
          },
          {
            badge: 'BBA',
            title: 'Bachelor of Business Administration',
            image: `${imgBase}images/home/bba.webp`,
            description: 'BBA at IPS Business College builds strong business foundations with practical exposure and industry-oriented learning.',
            hoverTitle: 'Bachelor of Business Administration',
            features: [
              "Bachelor of Business Administration (BBA) Degree with Work Experience (with Regular On Job Training's - OJT's).",
              'Additional AI/Business Analytics Course.',
              'Additional Digital Marketing Course.',
              'Advanced Excel Course.',
              'Industry Specialized Certifications*.',
              'Best Placements.',
              '3 Months International, Trainings & Exchange Program (Sponsored / Optional)*.',
            ],
            approvals: [
              { name: 'AICTE', logo: `${imgBase}images/home/aicte.webp` },
              { name: 'RTU', logo: `${imgBase}images/home/rtu.webp` },
            ],
            duration: '3 years',
            eligibility: 'Check Eligibility',
            buttonText: 'Read More',
            link: '/bba',
            order: 1,
          },
          {
            badge: 'BCA',
            title: 'Bachelor of Computer Applications',
            image: `${imgBase}images/home/bca.webp`,
            description: 'BCA at IPS Business College equips students with cutting-edge IT skills, programming expertise, and real-world project experience',
            hoverTitle: 'Bachelor of Computer Applications',
            features: [
              'Bachelor of Computer Application (BCA) Degree with Work Experience (with Regular On Job Training - OJT).',
              'Additional AI/Data Analytics Course.',
              'Additional Digital Marketing Course.',
              'Additional Cyber Security Course.',
              'Additional Cloud Computing Course.',
              'Live Industry Projects*.',
              'Best Placements.',
              '3 Months International, Trainings & Exchange Program (Sponsored / Optional)*.',
            ],
            approvals: [
              { name: 'AICTE', logo: `${imgBase}images/home/aicte.webp` },
              { name: 'RTU', logo: `${imgBase}images/home/rtu.webp` },
            ],
            duration: '3 years',
            eligibility: 'Check Eligibility',
            buttonText: 'Read More',
            link: '/bca',
            order: 2,
          },
        ],
      },

      // ── Placements ───────────────────────────────────────────────────────────
      {
        section: 'placements',
        placementsHeading: 'Our Placements',
        placementsSubText: 'Strong placement support with dedicated career guidance, complemented by regular workshops, seminars, and industry interaction sessions.',
        placementsStats: [
          { value: '26 LPA+', label: 'Highest Package Offered', order: 0 },
          { value: '5.5 LPA+', label: 'Average Package Offered', order: 1 },
          { value: '100+', label: 'Top Recruiting Companies', order: 2 },
        ],
        companyLogos: [
          { name: 'Bajaj Finserv', logo: `${imgBase}images/home/bajajfinserv.webp`, order: 0 },
          { name: 'Deutsche Bank', logo: `${imgBase}images/home/Deutsche.webp`, order: 1 },
          { name: 'GSK', logo: `${imgBase}images/home/gsk.webp`, order: 2 },
          { name: 'ICICI', logo: `${imgBase}images/home/ICICI.webp`, order: 3 },
          { name: 'MRF', logo: `${imgBase}images/home/MRF.webp`, order: 4 },
          { name: 'PWC', logo: `${imgBase}images/home/PWC.webp`, order: 5 },
          { name: 'Wipro', logo: `${imgBase}images/home/Wipro.webp`, order: 6 },
          { name: 'TCS', logo: `${imgBase}images/home/TCS.webp`, order: 7 },
          { name: 'Zomato', logo: `${imgBase}images/home/Zomato.webp`, order: 8 },
          { name: 'Reliance Jio', logo: `${imgBase}images/home/reliancejio.webp`, order: 9 },
        ],
        placementStudents: [
          { name: 'Zomato Placement', image: `${imgBase}images/home/Zomatoo.webp`, order: 0 },
          { name: 'Zomato Placement 2', image: `${imgBase}images/home/Zomato (2).webp`, order: 1 },
          { name: 'Unique Builders', image: `${imgBase}images/home/Unique Builders.webp`, order: 2 },
          { name: 'TCS Placement 1', image: `${imgBase}images/home/tcs1.webp`, order: 3 },
          { name: 'TCS Placement 2', image: `${imgBase}images/home/tcs (1).webp`, order: 4 },
          { name: 'Sintex', image: `${imgBase}images/home/Sintex.webp`, order: 5 },
          { name: 'Namdev 1', image: `${imgBase}images/home/namdev.webp`, order: 6 },
          { name: 'Namdev 2', image: `${imgBase}images/home/namdev (2).webp`, order: 7 },
          { name: 'MRF', image: `${imgBase}images/home/mrf (1).webp`, order: 8 },
          { name: 'LIC', image: `${imgBase}images/home/lic.webp`, order: 9 },
          { name: 'ICICI', image: `${imgBase}images/home/icici (1).webp`, order: 10 },
          { name: 'HDFC 1', image: `${imgBase}images/home/hffc.webp`, order: 11 },
          { name: 'HDFC 2', image: `${imgBase}images/home/hffc (2).webp`, order: 12 },
          { name: 'HDFC Mutual Fund', image: `${imgBase}images/home/hdfc mutual fund.webp`, order: 13 },
          { name: 'HDFC Life', image: `${imgBase}images/home/hdfc life (2).webp`, order: 14 },
          { name: 'GSK', image: `${imgBase}images/home/gsk (1).webp`, order: 15 },
          { name: 'Deutsche Bank', image: `${imgBase}images/home/deutsche bank.webp`, order: 16 },
          { name: 'CUB 1', image: `${imgBase}images/home/cub.webp`, order: 17 },
          { name: 'CUB 2', image: `${imgBase}images/home/cub (2).webp`, order: 18 },
          { name: 'Axis Bank', image: `${imgBase}images/home/axis bank.webp`, order: 19 },
          { name: 'Archer and Bulls', image: `${imgBase}images/home/Archer and Bulls.webp`, order: 20 },
        ],
      },

      // ── Video Gallery ────────────────────────────────────────────────────────
      {
        section: 'videoGallery',
        videoGalleryHeading: 'Video Gallery',
        videos: [
          { thumbnail: `${imgBase}images/home/thumb-10.webp`, url: 'https://www.instagram.com/reel/C7WDKsxsSef/?igsh=aTYzZ2x6b2s1aTZw', order: 0 },
          { thumbnail: `${imgBase}images/home/thumb-11.webp`, url: 'https://www.instagram.com/reel/DLCOt4XSp-j/?igsh=YmU1ZWFpZWVxdXRl', order: 1 },
          { thumbnail: `${imgBase}images/home/thumb-12.webp`, url: 'https://www.instagram.com/reel/DLJz3VeOddn/?igsh=N3dqNmM5aGZicXY0', order: 2 },
          { thumbnail: `${imgBase}images/home/thumb-18.webp`, url: 'https://www.instagram.com/reel/DLmb3ZehEjI/?igsh=MTQ5MXl3YXRsdWlkMg==', order: 3 },
          { thumbnail: `${imgBase}images/home/thumb-19.webp`, url: 'https://www.instagram.com/reel/DLjYvVeB8hD/?igsh=MTZldWFjOWI4NG41Yw==', order: 4 },
          { thumbnail: `${imgBase}images/home/thumb-16.webp`, url: 'https://www.instagram.com/reel/DLUM0hlO86L/?igsh=cTFtN3J5bWJwODdp', order: 5 },
          { thumbnail: `${imgBase}images/home/thumb-1.webp`, url: 'https://www.instagram.com/reel/DGubqWIMt31/?igsh=MTd1ZnoydmduZDhqMA==', order: 6 },
          { thumbnail: `${imgBase}images/home/thumb-2.webp`, url: 'https://www.instagram.com/reel/DGj73Zehrg8/?igsh=MWFncHppczM4MDgxMg==', order: 7 },
          { thumbnail: `${imgBase}images/home/thumb-3.webp`, url: 'https://www.instagram.com/reel/DFumty9Bnpn/?igsh=MTgzc251eTI4MXc0dg==', order: 8 },
          { thumbnail: `${imgBase}images/home/thumb-4.webp`, url: 'https://www.instagram.com/reel/DFZ3nhuvUA1/?igsh=amFjN2QwbXhhenU5', order: 9 },
          { thumbnail: `${imgBase}images/home/thumb-5.webp`, url: 'https://www.instagram.com/reel/DAiVFkYs3_b/?igsh=MWR3bzFuaWhmbTlqdg==', order: 10 },
          { thumbnail: `${imgBase}images/home/thumb-6.webp`, url: 'https://www.instagram.com/reel/C_9mxoDvmFY/?igsh=MTZ6aHM3ODU0OTExcA==', order: 11 },
          { thumbnail: `${imgBase}images/home/thumb-7.webp`, url: 'https://www.instagram.com/reel/C-mqI3mt-qs/?igsh=aGRvOGFvNDN6YnUw', order: 12 },
          { thumbnail: `${imgBase}images/home/thumb-8.webp`, url: 'https://www.instagram.com/reel/C73L0-TtJHH/?igsh=MWx2dm1vaG50NDU1Mg==', order: 13 },
          { thumbnail: `${imgBase}images/home/thumb-9.webp`, url: 'https://www.instagram.com/reel/C7oLXWOyl6_/?igsh=YnJzMGVkcGtiZ3Bs', order: 14 },
        ],
      },

      // ── Our Achievers ────────────────────────────────────────────────────────
      {
        section: 'achievers',
        achieversHeading: 'Our Achievers',
        achievers: [
          { name: 'IPS Gold Achiever', image: `${imgBase}images/home/Gold_1.webp`, order: 0 },
          { name: 'Ayushi Kabra - IPS Achiever', image: `${imgBase}images/home/ayushi_kabra.webp`, order: 1 },
          { name: 'Ayushi Sharma - IPS Achiever', image: `${imgBase}images/home/ayushi-sharma.webp`, order: 2 },
          { name: 'Pooja Mondal - IPS Achiever', image: `${imgBase}images/home/pooja_mondal.webp`, order: 3 },
        ],
      },

      // ── Student Testimonials ─────────────────────────────────────────────────
      {
        section: 'testimonials',
        testimonialsLabel: 'STUDENTS FEEDBACK',
        testimonialsHeading: 'Our Students Says',
        testimonialsDescription: 'Discover how IPS Business School is transforming ambitions into achievements through quality education, practical learning, and student success stories',
        testimonialImages: Array.from({ length: 27 }, (_, i) => ({
          image: `${imgBase}images/home/${i + 1}.webp`,
          order: i,
        })),
      },

    ];  // end sections array

    const results = [];
    for (const data of sections) {
      const filter = { section: data.section };
      // If force=true, overwrite. Otherwise skip existing docs.
      if (!force) {
        const exists = await HomePageContent.findOne(filter).lean();
        if (exists) {
          results.push({ section: data.section, status: 'skipped (already exists)' });
          continue;
        }
      }
      await HomePageContent.findOneAndUpdate(filter, { $set: data }, { upsert: true, new: true });
      results.push({ section: data.section, status: force ? 'overwritten' : 'created' });
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error('[HOME-CONTENT SEED]', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Seed failed' },
      { status: 500 }
    );
  }
}
