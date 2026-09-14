import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import InfrastructurePageContent from '@/models/InfrastructurePageContent';
import { getAuthFromCookies } from '@/lib/auth';

/**
 * POST /api/infrastructure-content/seed
 * Admin-protected. Inserts the original static infrastructure page data as initial DB content.
 * Safe to re-run — uses upsert so it will not duplicate.
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
      // ── Banner ────────────────────────────────────────────────────────────────
      {
        section: 'banner',
        bannerTitle: 'Infrastructure',
        bannerImageUrl: `${imgBase}images/about/infrastructure-img-2.webp`,
        bannerPosition: 'object-bottom',
      },

      // ── Intro card ────────────────────────────────────────────────────────────
      {
        section: 'intro',
        introHeading: 'IPS BUSINESS SCHOOL, JAIPUR',
        introSubheading: 'Where World-Class Infrastructure Meets Academic Excellence',
        introDescription:
          'At IPS BUSINESS SCHOOL JAIPUR, we believe that a conducive environment is the bedrock of transformative education. Our campus is not just built with brick and mortar but engineered for inspiration, collaboration, and holistic growth. Every corner of our institution reflects a blend of cutting-edge technology, thoughtful design, and student convenience.',
      },

      // ── Classrooms ────────────────────────────────────────────────────────────
      {
        section: 'classrooms',
        title: 'Digital Air-Conditioned Classrooms',
        subtitle: 'Learning Redefined',
        description:
          'Say goodbye to monotony. Our digitally smart, fully air-conditioned classrooms are equipped with interactive LED panels, high-fidelity sound systems, and lecture-capture capabilities. Every case study, simulation, and presentation transforms into an immersive learning experience, bridging theory with real-world business scenarios.',
        images: [
          `${imgBase}images/ips-campus/15.webp`,
          `${imgBase}images/ips-campus/13.webp`,
        ],
      },

      // ── Auditorium ────────────────────────────────────────────────────────────
      {
        section: 'auditorium',
        title: 'AIR-CONDITIONED SEMINAR HALLS & AUDITORIUM',
        subtitle: 'Where Ideas Take Center Stage',
        description:
          'Our spacious, temperature-controlled seminar halls and a grand central auditorium are venues for thought leadership. Fitted with high-lumen LCD projectors, surround sound, and live streaming capabilities, these spaces regularly host industry conclaves, leadership talks, and cultural fests—ensuring you learn from the best, in complete comfort.',
        images: [
          `${imgBase}images/ips-campus/2.webp`,
          `${imgBase}images/ips-campus/3.webp`,
          `${imgBase}images/ips-campus/4.webp`,
          `${imgBase}images/ips-campus/one.webp`,
          `${imgBase}images/ips-campus/two.webp`,
          `${imgBase}images/ips-campus/three.webp`,
          `${imgBase}images/ips-campus/four.webp`,
          `${imgBase}images/ips-campus/1.webp`,
        ],
      },

      // ── Labs ──────────────────────────────────────────────────────────────────
      {
        section: 'labs',
        title: 'Air-Conditioned Computer Labs',
        subtitle: 'Powered by 150+ PCs',
        description:
          'A lab of monumental scale. Our air-conditioned computer lab houses over 100 high-performance PCs with latest-gen processors, dedicated servers for data analytics, and licensed Business and IT Softwares. From coding boot camps to financial modeling, you never wait for your turn—you just log in and excel.',
        images: [
          `${imgBase}images/ips-campus/17.webp`,
          `${imgBase}images/ips-campus/18.webp`,
          `${imgBase}images/ips-campus/6.webp`,
          `${imgBase}images/ips-campus/7.webp`,
          `${imgBase}images/ips-campus/11.webp`,
          `${imgBase}images/ips-campus/12.webp`,
          `${imgBase}images/ips-campus/14.webp`,
          `${imgBase}images/ips-campus/16.webp`,
        ],
      },

      // ── Library ───────────────────────────────────────────────────────────────
      {
        section: 'library',
        title: 'Well-Stacked & Updated Library',
        subtitle: 'A Knowledge Oasis',
        description:
          'Our library is not a silent room; it is a vibrant knowledge hub. It houses, 60+ National & International Journals; alongwith 1,500+ Reference Books & Bestsellers – from Kotler to Gladwell, from Damodaran to Harari.',
        images: [],
      },

      // ── Sports ────────────────────────────────────────────────────────────────
      {
        section: 'sports',
        title: 'Regular Sports Activities',
        subtitle: 'Indoor & Outdoor – Fit Mind, Fit Body',
        description:
          'All work and no play? Not here. Our campus buzzes with daily sports culture.\nIndoor: Table tennis, carrom, chess, and E-sports\nOutdoor: Cricket, atheletics, team-games, volleyball, and badminton.\nAnnual sports meet, inter-batch leagues, and weekend tournaments keep the adrenaline high and team spirit higher.',
        images: [
          `${imgBase}images/ips-campus/outdoor5.webp`,
          `${imgBase}images/ips-campus/outdoor1.webp`,
          `${imgBase}images/ips-campus/outdoor2.webp`,
          `${imgBase}images/ips-campus/outdoor3.webp`,
          `${imgBase}images/ips-campus/outdoor4.webp`,
        ],
      },

      // ── Wi-Fi ─────────────────────────────────────────────────────────────────
      {
        section: 'wifi',
        title: 'High-Speed Wi-Fi Campus',
        subtitle: 'Always Connected, Always Ahead',
        description:
          'Step into a truly digital campus. IPS BUSINESS SCHOOL JAIPUR unravels a high-speed, uninterrupted Wi-Fi 6 network enveloping every inch of the campus—from classrooms to the lawns.. Whether you are conducting live market research, attending global webinars, or collaborating on cloud-based projects, you are always online, always empowered.',
        images: [],
      },

      // ── Parking ───────────────────────────────────────────────────────────────
      {
        section: 'parking',
        title: 'Well-Managed Parking Area',
        subtitle: 'No More Chaos',
        description:
          'We offer a CCTV-secured, well-managed parking zone with security to ensure that your commute ends on a stress-free note.',
        images: [],
      },

      // ── Hostels ───────────────────────────────────────────────────────────────
      {
        section: 'hostels',
        title: 'Separate Girls & Boys Hostels + PGs',
        subtitle: 'Safe, Secure, Supportive',
        description:
          'Living away from home is a breeze at IPS BUSINESS SCHOOL JAIPUR. We offer furnished, Wi-Fi-enabled, AC and Non-AC hostels with round-the-clock warden supervision, and dedicated mess serving nutritious meals. For those who prefer private accommodations, we have vetted tied-up PG options just minutes from campus. Separate blocks for girls and boys ensure privacy and safety.',
        images: [],
      },

      // ── Location ──────────────────────────────────────────────────────────────
      {
        section: 'location',
        title: 'Located at the Heart of the City',
        subtitle: 'The Ultimate Urban Advantage',
        description:
          'IPS BUSINESS SCHOOL JAIPUR sits proudly in the central corridor of the Pink City. No remote outskirts, no long commutes. Being at the heart means you save hours of travel and gain more time for academics, networking, and recreation. The city\'s pulse is literally at your doorstep.',
        image: `${imgBase}images/ips-campus/Metro.webp`,
        images: [],
      },

      // ── Transport ─────────────────────────────────────────────────────────────
      {
        section: 'transport',
        title: 'Excellently Connected with All Public Transport',
        subtitle: 'Arrive Any Way You Like',
        description:
          'Getting to IPS BUSINESS SCHOOL JAIPUR is effortless from any corner of the City.\nJaipur Metro – Nearest station <0.5 km\nCity Buses – Stop right outside the campus gate\nAuto-rickshaws & E-rickshaws – Available 24x7\nBike taxis (Rapido, Ola Bike) – One-click away\nOla/Uber Cabs – 2–3 minute waiting time\nConnectivity is not a luxury here; it is a guarantee.',
        images: [],
      },

      // ── Nearby ────────────────────────────────────────────────────────────────
      {
        section: 'nearby',
        title: 'In Close Proximity to Cafés, Malls & Happening Destinations',
        subtitle: 'Live the Jaipur Vibe',
        description:
          'When the study pressure eases, the City welcomes you. From our campus, you are minutes away from. Trendy Cafés – Starbucks, Café Coffee Day, The Momo Café, and hidden rooftop gems. Malls – World Trade Park, GT Central, and City Square. Happening Destinations – Jawahar Circle, Patrika Gate, Tonk Road\'s food hubs, and cultural hotspots. Weekend outings, networking over coffee, or a quick mall run—all within easy reach.',
        images: [`${imgBase}images/ips-campus/mall-image.webp`],
      },

      // ── Ecosystem ─────────────────────────────────────────────────────────────
      {
        section: 'ecosystem',
        title: '',
        subtitle: '',
        description:
          'IPS BUSINESS SCHOOL, JAIPUR, is more than a campus—it is a complete ecosystem. From gigabit Wi-Fi and 150-plus -PC labs to chilled RO water and metro connectivity, every element is designed for one purpose: to help you focus on your ambition, while we take care of the environment.',
        images: [],
      },

      // ── Navigation ────────────────────────────────────────────────────────────
      {
        section: 'navigation',
        navItems: [
          { id: 'campus',     label: 'Our Campus',       order: 0 },
          { id: 'classrooms', label: 'AC Classrooms',    order: 1 },
          { id: 'auditorium', label: 'Auditorium',       order: 2 },
          { id: 'labs',       label: 'Computer Labs',    order: 3 },
          { id: 'library',    label: 'Library',          order: 4 },
          { id: 'sports',     label: 'Sports Activities',order: 5 },
          { id: 'wifi',       label: 'Wi-Fi Campus',     order: 6 },
          { id: 'parking',    label: 'Parking Area',     order: 7 },
          { id: 'hostels',    label: 'Hostels + PGs',    order: 8 },
        ],
      },

      // ── Sidebar ───────────────────────────────────────────────────────────────
      {
        section: 'sidebar',
        sidebarVideos: [
          {
            url:   'https://www.youtube.com/embed/ocaViRxJrdE?si=gmgh25qgaZeHh0hb',
            title: '',
            order: 0,
          },
          {
            url:   'https://www.youtube.com/embed/4aq02tSiXd4?si=AawJvooDzO8Pflx0',
            title: 'Raghav Sharma Video Resume',
            order: 1,
          },
        ],
      },
    ];

    const results = [];
    for (const sectionData of sections) {
      const { section } = sectionData;

      if (!force) {
        const existing = await InfrastructurePageContent.findOne({ section });
        if (existing) {
          results.push({ section, status: 'skipped' });
          continue;
        }
      }

      await InfrastructurePageContent.findOneAndUpdate(
        { section },
        { $set: sectionData },
        { upsert: true, new: true, runValidators: true }
      );
      results.push({ section, status: force ? 'overwritten' : 'seeded' });
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error('[INFRASTRUCTURE-CONTENT SEED]', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Seed failed' },
      { status: 500 }
    );
  }
}
