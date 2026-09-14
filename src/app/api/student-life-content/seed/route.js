import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import StudentLifePageContent from '@/models/StudentLifePageContent';
import { getAuthFromCookies } from '@/lib/auth';

/**
 * POST /api/student-life-content/seed
 * Admin-protected. Inserts the current static Student Life page data as the initial DB content.
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
      // ── Banner ────────────────────────────────────────────────────────────────
      {
        section: 'banner',
        bannerTitle: 'Student Life',
        bannerImageUrl: `${imgBase}images/about/student-img-2.webp`,
        bannerPosition: 'object-top',
      },

      // ── Campus ────────────────────────────────────────────────────────────────
      {
        section: 'campus',
        campusImageUrl: `${imgBase}images/student-life/campus-image.webp`,
        campusImageAlt: 'IPS Business School Campus Life',
        campusParagraphs: [
          'The Sports Club believes in keeping Fit the Fittest. The skill development of managing a team and leading from the front can be best taught by engaging a student into a sports activity.',
          "IPS's life is very vivacious as it is situated at very peaceful and very calm city Jaipur popularly known as pink city, here students live their life absolutely. The environment is so helpful and courageous that every student is ready to take any demanding academic challenges. The life at IPS is very effervescent and resilient. The peppy environment and the zeal to celebrate each festival in the campus give the closeness with IPS family.",
        ],
      },

      // ── Student Club ──────────────────────────────────────────────────────────
      {
        section: 'student-club',
        studentClubHeading: 'STUDENTS CLUB (MANAGEMENT):',
        studentClubIntro:
          "IPS BUSINESS SCHOOL has the Student's Council, which is headed by Club Coordinators and acts as a guiding system for the Institute's success. The council comprises of various Clubs as:-",
        clubs: [
          {
            name: 'MARCOS CLUB',
            bullets: [
              'Liasioning with corporate faculties for weekly presentations.',
              'Liasioning with bodies like CII & FICCI.',
              'Arranging Industrial visits and Media management activities.',
            ],
            order: 0,
          },
          {
            name: 'HCORE CLUB',
            bullets: [
              'Managing industry interaction programs.',
              'Industry mentorship programs etc.',
              'Sending greetings to business barons, political leaders etc.',
            ],
            order: 1,
          },
          {
            name: 'FINNACLE CLUB',
            bullets: [
              'Updation of Business news.',
              'Planning and organizing the events and cultural activities.',
            ],
            order: 2,
          },
          {
            name: 'HCORE CLUB',
            bullets: [
              'Liasioning with corporate faculties for weekly presentations.',
              'Liasioning with bodies like CII & FICCI.',
              'Arranging Industrial visits and Media management activities.',
            ],
            order: 3,
          },
        ],
      },

      // ── Sports Club ───────────────────────────────────────────────────────────
      {
        section: 'sports-club',
        sportsClubHeading: 'Sports Club:',
        sportsClubImageUrl: `${imgBase}images/student-life/sports-club.webp`,
        sportsClubImageAlt: 'IPS Sports Club Activities',
        sportsClubParagraphs: [
          'The Sports Club believes in keeping Fit the Fittest. The skill development of managing a team and leading from the front can be best taught by engaging a student into a sports activity.',
          'At IPS, we organize activities like T-20 Tournaments, Volleyball Tournaments, Basketball Tournaments and many more which not only gives physical strength but also develop a team spirit among the students.',
        ],
      },

      // ── Indoor Games ──────────────────────────────────────────────────────────
      {
        section: 'indoor-games',
        indoorGamesHeading: 'Indoor Games:',
        indoorGamesImageUrl: `${imgBase}images/student-life/gym-membership.webp`,
        indoorGamesImageAlt: 'IPS Indoor Games and Gym Facilities',
        indoorGamesParagraphs: [
          'To keep up the enthusiasm of the students and the environment of the campus full of life and energy we have indoor gamesactivities which includeTable Tennis, Carom, Chess, Billiards and many more.',
          'Such activities also keep up the minds of the young bloods relaxed and refresh for continuous learning.',
        ],
      },

      // ── Committees ────────────────────────────────────────────────────────────
      {
        section: 'committees',
        committeesHeading: 'Committees:',
        committees: [
          {
            name: 'Placement Committee',
            description:
              'This committee frequently interacts with the corporate world, thereby developing and maintaining symbiotic relations. It undertakes various activities related to campus placement for final year students and summer training for the first year students.',
            order: 0,
          },
          {
            name: 'Seminar Committee',
            description:
              'They organize several seminars on topics of current importance and relevance. They interact with CEOs, Entrepreneurs, Consultants, Managers and Professionals from various spheres of business, who are invited as Guest Speakers in order to throw light on the subject matter, with a view to change mindsets and broaden horizons.',
            order: 1,
          },
          {
            name: 'Alumni Committee',
            description:
              'This committee works as a bridge between the alumni and the alma mater, both at the corporate and personal level. We look up to our alumni, as they are our best ambassadors in the corporate world and a vital link in the Industry -Institute relationship.',
            order: 2,
          },
          {
            name: 'Sports Committee',
            description:
              'Students, who are under constant pressure to learn and excel, need space and time to relax and revitalize themselves. The sports teams headed by students organize cricket, basketball, volleyball, football and badminton matches, to enliven the sporting spirit and enable students to rejuvenate themselves.',
            order: 3,
          },
          {
            name: 'Cultural Committee',
            description:
              'This committee aims to encourage the students to participate in various inter-collegiate events and to develop their latent potential in dance, drama, creativity, management games, organisation skills, etc.',
            order: 4,
          },
        ],
      },

      // ── Sidebar ───────────────────────────────────────────────────────────────
      {
        section: 'sidebar',
        sidebarVideos: [
          {
            url: 'https://www.youtube.com/embed/ocaViRxJrdE?si=gmgh25qgaZeHh0hb',
            title: '',
            order: 0,
          },
          {
            url: 'https://www.youtube.com/embed/4aq02tSiXd4?si=AawJvooDzO8Pflx0',
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
        const existing = await StudentLifePageContent.findOne({ section });
        if (existing) {
          results.push({ section, status: 'skipped' });
          continue;
        }
      }

      await StudentLifePageContent.findOneAndUpdate(
        { section },
        { $set: sectionData },
        { upsert: true, new: true, runValidators: true }
      );
      results.push({ section, status: force ? 'overwritten' : 'seeded' });
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error('[STUDENT-LIFE-CONTENT SEED]', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Seed failed' },
      { status: 500 }
    );
  }
}
