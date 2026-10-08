import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import LifeAtIpsPageContent from '@/models/LifeAtIpsPageContent';
import { getAuthFromCookies } from '@/lib/auth';

/**
 * POST /api/life-at-ips-content/seed
 * Admin-protected. Inserts the current static Life@IPS page data as the initial DB content.
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

    const sections = [
      // ── Banner ────────────────────────────────────────────────────────────────
      {
        section: 'banner',
        bannerTitle: 'Life@ips',
        bannerImageUrl: 'images/about/life-of-ips-img.webp',
        bannerPosition: 'object-center',
      },

      // ── Activities ────────────────────────────────────────────────────────────
      {
        section: 'activities',
        activities: [
          {
            title: 'ZEPHYR Hosted by IPS COLLEGE',
            paragraph:
              'Zephyr is the ultimate Annual Management & Tech Fest, blending cutting-edge competitions, cultural spectacles, and corporate buzz into an unforgettable experience. As Rajasthan\'s most sought after youth festival, it draws 40,000+ students for adrenaline-pitched business battles, IT challenges, and electrifying performances. IPS COLLEGE JAIPUR - Where talent meets triumph!',
            images: [
              '/images/life-at-ips/1.webp',
              '/images/life-at-ips/2.webp',
              '/images/life-at-ips/3.webp',
              '/images/life-at-ips/4.webp',
              '/images/life-at-ips/5.webp',
              '/images/life-at-ips/6.webp',
              '/images/life-at-ips/7.webp',
              '/images/life-at-ips/8.webp',
              '/images/life-at-ips/9.webp',
              '/images/life-at-ips/10.webp',
              '/images/life-at-ips/11.webp',
              '/images/life-at-ips/12.webp',
              '/images/life-at-ips/13.webp',
            ],
            order: 0,
          },
          {
            title: 'SEMINARS',
            paragraph:
              'IPS COLLEGE JAIPUR bridges academia & industry through specialized seminars, corporate workshops, and alumni interactions—tailored separately for Management (MBA/BBA) and IT (BCA) students. These sessions deliver real-world insights, emerging trends, and networking goldmines, transforming students into industry-ready professionals with a competitive edge!',
            images: [
              '/images/life-at-ips/14.webp',
              '/images/life-at-ips/15.webp',
              '/images/life-at-ips/16.webp',
              '/images/life-at-ips/17.webp',
              '/images/life-at-ips/18.webp',
              '/images/life-at-ips/19.webp',
              '/images/life-at-ips/20.webp',
              '/images/life-at-ips/21.webp',
              '/images/life-at-ips/22.webp',
              '/images/life-at-ips/23.webp',
            ],
            order: 1,
          },
          {
            title: 'UNLEASH THE FUNGAMA QUOTIENT',
            paragraph:
              'At IPS COLLEGE JAIPUR, we believe in working hard and partying harder! Our electrifying DJ Nights, high-energy Dance Parties, and refreshing Pool Parties ensure students experience the ultimate college fun. These events aren\'t just about entertainment—they foster camaraderie, stress relief, and life-long memories, making campus life vibrant and balanced.',
            images: [
              '/images/life-at-ips/24.webp',
              '/images/life-at-ips/25.webp',
              '/images/life-at-ips/26.webp',
              '/images/life-at-ips/27.webp',
              '/images/life-at-ips/28.webp',
              '/images/life-at-ips/29.webp',
            ],
            order: 2,
          },
          {
            title: 'INDUSTRIAL VISITS',
            paragraph:
              'IPS COLLEGE JAIPUR organizes regular industrial visits to expose students to real-world operations. MBA and BBA scholars gain business processes and management insights, along with analysis of business workflows, while BCA techies explore IT infrastructure. These visits foster practical learning, industry networking, and innovation, preparing students to excel in their careers!',
            images: [
              '/images/life-at-ips/30.webp',
              '/images/life-at-ips/31.webp',
              '/images/life-at-ips/32.webp',
              '/images/life-at-ips/33.webp',
              '/images/life-at-ips/34.webp',
              '/images/life-at-ips/35.webp',
              '/images/life-at-ips/36.webp',
              '/images/life-at-ips/37.webp',
            ],
            order: 3,
          },
          {
            title: 'TREKKING',
            paragraph:
              'IPS COLLEGE JAIPUR organizes regular treks to challenge students physically and mentally. These adventures teach resilience, teamwork, and leadership, skills essential to perform in Corporate scenarios. Students also gain problem-solving agility while navigating unpredictable terrains, mirroring real-world challenges. A thrilling way to build grit and adaptability!',
            images: [
              '/images/life-at-ips/mini-kedarnath-1.webp',
              '/images/life-at-ips/mini-kedarnath-2.webp',
              '/images/life-at-ips/mini-kedarnath-3.webp',
              '/images/life-at-ips/garh-ganesh-1-img.webp',
              '/images/life-at-ips/garh-ganesh-2-img.webp',
              '/images/life-at-ips/garh-ganesh-3-img.webp',
              '/images/life-at-ips/40.webp',
              '/images/life-at-ips/41.webp',
              '/images/life-at-ips/42.webp',
              '/images/life-at-ips/43.webp',
            ],
            order: 4,
          },
          {
            title: 'FRESHERS AND FAREWELLS',
            paragraph:
              "WHERE MEMORIES SPARK - IPS COLLEGE JAIPUR sets the stage for unforgettable beginnings and emotional goodbyes with its electrifying Freshers' and Farewell Parties. From dazzling performances and themed celebrations to nostalgic moments, these events create a high-energy vibe that bonds seniors and juniors. It's more than a party—it's where lifelong friendships and college legacies take birth.",
            images: [
              '/images/life-at-ips/44.webp',
              '/images/life-at-ips/45.webp',
              '/images/life-at-ips/46.webp',
              '/images/life-at-ips/47.webp',
              '/images/life-at-ips/48.webp',
            ],
            order: 5,
          },
          {
            title: 'FESTIVALS',
            paragraph:
              "From Independence Day to Christmas, Diwali to New Year, IPS COLLEGE JAIPUR embraces India's rich cultural tapestry while fostering global unity. Festivals like Holi, Ganesh Chaturthi, Sankranti, and Teachers' Day ignite joy, teamwork, and tradition, keeping students rooted yet globally aware. Every celebration strengthens bonds and creates unforgettable memories!",
            images: [
              '/images/life-at-ips/ganesh-chaturthi-img.webp',
              '/images/life-at-ips/janmasthmi-img-1.webp',
              '/images/life-at-ips/janmasthmi-img-2.webp',
              '/images/life-at-ips/49.webp',
              '/images/life-at-ips/50.webp',
              '/images/life-at-ips/51.webp',
              '/images/life-at-ips/52.webp',
              '/images/life-at-ips/53.webp',
              '/images/life-at-ips/54.webp',
            ],
            order: 6,
          },
          {
            title: 'ANNUAL SPORTS WEEK',
            paragraph:
              "IPSCOLLEGE JAIPUR's Annual Sports Week fuels passion, teamwork, and resilience! MBA and BBA students master leadership & strategy, learning event management & networking, while BCA techies explore data-driven performance analysis. Beyond medals, it's a training ground for discipline, collaboration, and winning mindsets—essential for corporate success!",
            images: [
              '/images/life-at-ips/55.webp',
              '/images/life-at-ips/56.webp',
              '/images/life-at-ips/57.webp',
              '/images/life-at-ips/58.webp',
              '/images/life-at-ips/59.webp',
              '/images/life-at-ips/60.webp',
              '/images/life-at-ips/61.webp',
            ],
            order: 7,
          },
          {
            title: 'FLASH MOBS',
            paragraph:
              'IPS COLLEGE JAIPUR sets the floor on fire with electrifying flash mobs, blending creativity and teamwork! For MBA students, it is about leadership and coordination; BBA students hone their event management skills, while BCA techies explore digital promotion. A vibrant lesson in innovation, collaboration, and brand visibility—proving learning happens everywhere!',
            images: [
              '/images/life-at-ips/62.webp',
              '/images/life-at-ips/63.webp',
              '/images/life-at-ips/64.webp',
              '/images/life-at-ips/65.webp',
              '/images/life-at-ips/66.webp',
            ],
            order: 8,
          },
          {
            title: 'EXPLORE WITH IPS',
            paragraph:
              "IPS COLLEGE JAIPUR fuels adventure and learning through Annual Excursions and regular trips to historical and scenic destinations. These journeys transform classrooms into real-world experiences, fostering teamwork, cultural awareness, and leadership among students. From Rajasthan's heritage sites to India's Choicest Tourist hubs, every trip delivers unforgettable memories and practical insights that shape future-ready professionals!",
            images: [
              '/images/life-at-ips/67.webp',
              '/images/life-at-ips/68.webp',
              '/images/life-at-ips/69.webp',
              '/images/life-at-ips/70.webp',
              '/images/life-at-ips/71.webp',
              '/images/life-at-ips/72.webp',
              '/images/life-at-ips/73.webp',
            ],
            order: 9,
          },
        ],
      },
    ];

    const results = [];
    for (const sectionData of sections) {
      const filter = { section: sectionData.section };
      const update = { $set: sectionData };
      const options = { upsert: true, new: true, runValidators: true };

      if (!force) {
        const existing = await LifeAtIpsPageContent.findOne(filter).lean();
        if (existing) {
          results.push({ section: sectionData.section, status: 'skipped' });
          continue;
        }
      }

      const doc = await LifeAtIpsPageContent.findOneAndUpdate(filter, update, options).lean();
      results.push({ section: sectionData.section, status: force ? 'overwritten' : 'seeded', _id: doc._id });
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error('[LIFE-AT-IPS-CONTENT SEED]', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Seed failed' },
      { status: 500 }
    );
  }
}
