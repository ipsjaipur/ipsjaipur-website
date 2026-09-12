import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import PlacementsPageContent from '@/models/PlacementsPageContent';
import { getAuthFromCookies } from '@/lib/auth';

/**
 * POST /api/placements-content/seed
 * Admin-protected. Inserts the current static data as the initial DB content.
 * Pass ?force=true to overwrite existing docs.
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
      // ── Banner ───────────────────────────────────────────────────────────────
      {
        section: 'banner',
        bannerTitle: 'Placements',
        bannerImageUrl: `${imgBase}images/courses/placement-bg2.webp`,
        bannerPosition: 'object-bottom',
      },

      // ── Placement Stats ──────────────────────────────────────────────────────
      {
        section: 'stats',
        statsHeading: '',
        statItems: [
          {
            image: `${imgBase}images/placements/sectorwise.webp`,
            title: 'Placements',
            description: 'Comprehensive overview of placements across various industry sectors',
            order: 0,
          },
          {
            image: `${imgBase}images/placements/MBAOJTNEW.webp`,
            title: 'MBA Internships Sector Wise',
            description: 'Real-world experience and industry exposure for MBA students',
            order: 1,
          },
          {
            image: `${imgBase}images/placements/BBAOJTNEW.webp`,
            title: 'Live Projects Sector Wise',
            description: 'Hands-on learning opportunities for BBA students',
            order: 2,
          },
        ],
      },

      // ── Coordinator ──────────────────────────────────────────────────────────
      {
        section: 'coordinator',
        coordinator: {
          name: 'Prof. Sudhir Agarwal',
          phone1: '+91 9829016449',
          phone2: '+91 82339700000',
          email1: 'sudhir@ipsedu.in',
          email2: 'info@ipsedu.in',
        },
      },

      // ── Placement Updates ────────────────────────────────────────────────────
      {
        section: 'updates',
        updatesHeading: 'PLACEMENT UPDATES',
        placementUpdates: [
          { name: 'Tanishka Pareekh', company: 'Archer & Bull', image: `${imgBase}images/placements/Tanishka-Pareekh.webp`, order: 0 },
          { name: 'Sonali Sharma', company: 'Haleon', image: `${imgBase}images/placements/Sonali-Sharma.webp`, order: 1 },
          { name: 'Manisha Sharma', company: 'Wonder Home Finance', image: `${imgBase}images/placements/Manisha-Sharma.webp`, order: 2 },
          { name: 'Kunal Malhotra', company: 'Zomato', image: `${imgBase}images/placements/Kunal-Malhotra.webp`, order: 3 },
          { name: 'Hemendra Purohit', company: 'HDFC Life', image: `${imgBase}images/placements/Hemendra-Purohit.webp`, order: 4 },
          { name: 'Drishti Pamnani', company: 'HDFC Mutual Funds', image: `${imgBase}images/placements/Drishti-Pamnani.webp`, order: 5 },
          { name: 'Deeya Kumawat', company: 'Deutsche Bank', image: `${imgBase}images/placements/Deeya-Kumawat.webp`, order: 6 },
          { name: 'Bhavesh Pal', company: 'Policy Bazaar', image: `${imgBase}images/placements/Bhavesh-Pal.webp`, order: 7 },
          { name: 'Ankit Kumar', company: 'Bajaj Finserv', image: `${imgBase}images/placements/Ankit-Kumar.webp`, order: 8 },
          { name: 'Anak Mathur', company: 'Namdev Finvest Private Limited', image: `${imgBase}images/placements/ANAK-MATHUR.webp`, order: 9 },
          { name: 'Akshita Jain', company: 'TCS', image: `${imgBase}images/placements/Akshita-Jain.webp`, order: 10 },
          { name: 'Tanvi Saxena', company: 'Delphic', image: `${imgBase}images/placements/Tanvi-Saxena.webp`, order: 11 },
          { name: 'Sarthak Maheshwari', company: 'Unique Builders', image: `${imgBase}images/placements/Sarthak-Maheshwari.webp`, order: 12 },
          { name: 'Raviraj Singh Rathore', company: 'City Union Bank', image: `${imgBase}images/placements/Raviraj-Singh-Rathore.webp`, order: 13 },
          { name: 'Srishti Gupta', company: 'ICICI Bank Ltd.', image: `${imgBase}images/placements/Srishti-400x400.webp`, order: 14 },
          { name: 'Nikita Badaya', company: 'Axis Bank Ltd.', image: `${imgBase}images/placements/Nikita-1-400x400.webp`, order: 15 },
          { name: 'Monika Jain', company: 'Aditya Birla Money', image: `${imgBase}images/placements/Monika-jain.webp`, order: 16 },
          { name: 'Abhishek', company: 'Parle', image: `${imgBase}images/placements/Abhishek.webp`, order: 17 },
          { name: 'Ranveer Singh', company: 'Airtel', image: `${imgBase}images/placements/Ranveer-Singh.webp`, order: 18 },
          { name: 'Nikhil Sharma', company: 'Color Jewels (Dubai)', image: `${imgBase}images/placements/Nikhil-sharma.webp`, order: 19 },
          { name: 'Balram Singh', company: 'Accenture', image: `${imgBase}images/placements/Balram-Singh.webp`, order: 20 },
          { name: 'Simran Soni', company: 'Public Sector Bank', image: `${imgBase}images/placements/Simran-1-300x300-1.webp`, order: 21 },
          { name: 'Neeru Tak', company: 'Shriram General Insurance Ltd', image: `${imgBase}images/placements/Neeru-Tak-400x400.webp`, order: 22 },
          { name: 'Sanjeet Kumar', company: 'OPPO', image: `${imgBase}images/placements/sanjeet-400x400.webp`, order: 23 },
          { name: 'Pinkey (Nishi)', company: 'Samasta Microfinance Ltd.', image: `${imgBase}images/placements/Pinkey-400x400.webp`, order: 24 },
          { name: 'Shubham Kumawat', company: 'HDFC Bank', image: `${imgBase}images/placements/shubham-kumwat-400x400.webp`, order: 25 },
          { name: 'Manisha', company: 'Amazon', image: `${imgBase}images/placements/Manisha-400x400.webp`, order: 26 },
          { name: 'Piyush Mathur', company: 'HFFC', image: `${imgBase}images/placements/Piyush-Mathur-400x400.webp`, order: 27 },
          { name: 'Ankit Kumar', company: 'OPPO', image: `${imgBase}images/placements/ankit-400x400.webp`, order: 28 },
          { name: 'Vishal Kumar', company: 'LG Electronics', image: `${imgBase}images/placements/Vishal-Kumar-400x400.webp`, order: 29 },
          { name: 'Gurpreet Kaur', company: 'Reliance Jio', image: `${imgBase}images/placements/Gurpreet-Kaur-400x400.webp`, order: 30 },
          { name: 'Abhishek Mundra', company: 'HDFC Bank', image: `${imgBase}images/placements/Abhishek-Mundra-400x400.webp`, order: 31 },
          { name: 'Manish Swami', company: 'Bajaj Finserv', image: `${imgBase}images/placements/Swami.webp`, order: 32 },
          { name: 'Mukul Agrawal', company: 'OYO', image: `${imgBase}images/placements/Mukul-Agarwal-400x400.webp`, order: 33 },
          { name: 'Anjali Choudhary', company: 'AU Bank Ltd.', image: `${imgBase}images/placements/Anjali-Choudhary-400x400.webp`, order: 34 },
          { name: 'Samreen Bano', company: 'Airtel', image: `${imgBase}images/placements/Samreen-400x400.webp`, order: 35 },
          { name: 'Rohit Dixit', company: 'LG Electronics', image: `${imgBase}images/placements/Rohit-Dixit-400x400.webp`, order: 36 },
          { name: 'Ashita Khandelwal', company: 'AU Bank Ltd.', image: `${imgBase}images/placements/Ashita-Khandelwal-400x400.webp`, order: 37 },
          { name: 'Anand Saraswat', company: 'Airtel', image: `${imgBase}images/placements/Anand-400x400.webp`, order: 38 },
          { name: 'Kriti Sharma', company: 'AU Bank Ltd.', image: `${imgBase}images/placements/kriti-Sharma-400x400.webp`, order: 39 },
          { name: 'Mohit Bhardwaj', company: 'LG Electronics', image: `${imgBase}images/placements/mohit-400x400.webp`, order: 40 },
          { name: 'Kartika Bhargava', company: 'AU Bank Ltd.', image: `${imgBase}images/placements/kartika-Bhargava-400x400.webp`, order: 41 },
          { name: 'Kinjal Mor', company: 'Airtel', image: `${imgBase}images/placements/Kinjal-Mor-400x400.webp`, order: 42 },
          { name: 'Kartik Balecha', company: 'LG Electronics', image: `${imgBase}images/placements/kartik-Balecha-400x400.webp`, order: 43 },
          { name: 'Abhishek Singh', company: 'Airtel', image: `${imgBase}images/placements/Abhishek-Singh-400x400.webp`, order: 44 },
          { name: 'Khusboo Sharma', company: 'AU Bank Ltd.', image: `${imgBase}images/placements/khusboo-400x400.webp`, order: 45 },
          { name: 'Dinesh Gurjar', company: 'VIVO', image: `${imgBase}images/placements/Dinesh-Gurjar-400x400.webp`, order: 46 },
          { name: 'Shreya Goyal', company: 'HDFC Mutual Fund', image: `${imgBase}images/placements/Shriya-Goyal-400x400.webp`, order: 47 },
          { name: 'Anash Mazid Siddqui', company: 'VIVO', image: `${imgBase}images/placements/Anash-Mazid-Siddiqui-400x400.webp`, order: 48 },
          { name: 'Nikhil Jain', company: 'ICICI Bank Ltd.', image: `${imgBase}images/placements/Nikhil-Jain-400x400.webp`, order: 49 },
          { name: 'Kritika Goel', company: 'Axis Bank Ltd.', image: `${imgBase}images/placements/Kritika-Goel-400x400.webp`, order: 50 },
          { name: 'Himangi Sharma', company: 'OPPO', image: `${imgBase}images/placements/Himangi-Sharma-400x400.webp`, order: 51 },
          { name: 'Ankita Singh', company: 'Hyrefox (Smart Hiring)', image: `${imgBase}images/placements/Neeru-Tak-1-400x400.webp`, order: 52 },
          { name: 'Aditri Bang', company: 'Bank of Baroda', image: `${imgBase}images/placements/Aditri-Bang-400x400.webp`, order: 53 },
          { name: 'Archit Maheshwari', company: 'Shriram General Insurance Ltd.', image: `${imgBase}images/placements/Archit-Maheshwari-400x400.webp`, order: 54 },
          { name: 'Himani Duggar', company: 'AU Bank Ltd.', image: `${imgBase}images/placements/Himani-Duggar-400x400.webp`, order: 55 },
          { name: 'Arpit Verma', company: 'Bank of Baroda', image: `${imgBase}images/placements/Arpit-Verma-400x400.webp`, order: 56 },
          { name: 'Adtiya Srivastava', company: 'Shriram General Insurance Ltd.', image: `${imgBase}images/placements/Aditya-Srivastava-1-400x400.webp`, order: 57 },
          { name: 'Pragya Tailor', company: 'Bank of Baroda', image: `${imgBase}images/placements/Pragya-Tailor-400x400.webp`, order: 58 },
          { name: 'Vishakha Kumari', company: 'Bank of Baroda', image: `${imgBase}images/placements/Vishakha-Kumari-400x400.webp`, order: 59 },
          { name: 'Pratiksha Jain', company: 'Axis Bank Ltd.', image: `${imgBase}images/placements/Pratiksha-JAin-400x400.webp`, order: 60 },
          { name: 'Vikram Birkh', company: 'India Shelter Home Loans', image: `${imgBase}images/placements/Vikram-Birkh-400x400.webp`, order: 61 },
          { name: 'Mohita Mathur', company: 'Hyrefox (Smart Hiring)', image: `${imgBase}images/placements/Mohita-Mathur-1-400x400.webp`, order: 62 },
          { name: 'Rakshita Bansal', company: 'AU Bank Ltd.', image: `${imgBase}images/placements/Rakshita-BAnsal-400x400.webp`, order: 63 },
          { name: 'Rajesh Jain', company: 'HDFC Bank Ltd.', image: `${imgBase}images/placements/Rajesh-Jain-400x400.webp`, order: 64 },
          { name: 'Mintu Jha', company: 'India Shelter Home Loans', image: `${imgBase}images/placements/Mintu-Jha-400x400.webp`, order: 65 },
          { name: 'Rinkle Jain', company: 'Aditya Birla Group', image: `${imgBase}images/placements/Rinkle-JAin-400x400.webp`, order: 66 },
          { name: 'Nitu Kumari', company: 'Axis Bank Ltd.', image: `${imgBase}images/placements/Nitu-Kumari-400x400.webp`, order: 67 },
          { name: 'Monika Sharma', company: 'VIVO', image: `${imgBase}images/placements/monika-sharma-400x400.webp`, order: 68 },
          { name: 'Nitisha Sharma', company: 'Reliance Industries Ltd.', image: `${imgBase}images/placements/Nitisha-Sharma-400x400.webp`, order: 69 },
          { name: 'Ayush Chirania', company: 'HDFC Bank', image: `${imgBase}images/placements/ayush-chirania-1-400x400.webp`, order: 70 },
        ],
      },

      // ── Resume Book ──────────────────────────────────────────────────────────
      {
        section: 'resumeBook',
        resumeBookHeading: 'Resume Book',
        resumeBookDescription:
          'The Classes of MBA Resume Books are now available. Search our database of IPS BUSINESS SCHOOL MBA students or alumni to find talented candidates for your openings.',
        resumeBookCTAText: 'View More....',
        resumeBookCTALink: 'https://www.youtube.com/channel/UCDAbHzu7iO893x7IyT5JttQ',
        videoResumes: [
          {
            title: 'Nidhi Tiwari (MBA 2020-22)',
            videoUrl: 'https://www.youtube.com/embed/q1V_IjL_PbM',
            thumbnailUrl: 'https://img.youtube.com/vi/q1V_IjL_PbM/hqdefault.jpg',
            order: 0,
          },
          {
            title: 'Nisha Vyas (MBA 2020-22)',
            videoUrl: 'https://www.youtube.com/embed/qXcFj-_SUIk',
            thumbnailUrl: 'https://img.youtube.com/vi/qXcFj-_SUIk/hqdefault.jpg',
            order: 1,
          },
          {
            title: 'Prerna Kheshwani (BBA 2020-23)',
            videoUrl: 'https://www.youtube.com/embed/JuXA0cJMuqM',
            thumbnailUrl: 'https://img.youtube.com/vi/JuXA0cJMuqM/hqdefault.jpg',
            order: 2,
          },
          {
            title: 'Durjoy Sarkar (MBA 2020-22)',
            videoUrl: 'https://www.youtube.com/embed/bgwGTrhWvSs',
            thumbnailUrl: 'https://img.youtube.com/vi/bgwGTrhWvSs/hqdefault.jpg',
            order: 3,
          },
        ],
      },

      // ── FAQ ──────────────────────────────────────────────────────────────────
      {
        section: 'faq',
        faqHeading: 'Industry Hiring Practices',
        faqSubText:
          'IPS BUSINESS SCHOOL students are interested in business careers across all functions and industries. The IPS MBA Placement office is organized into teams aligned by industry to provide targeted expertise and resources for both employers and students. Learn how best to recruit for your industry.',
        faqs: [
          {
            question: 'Consulting',
            answer: `Consulting is one of the most popular industries for IPS BUSINESS SCHOOL MBAs. In the last 5 years, approximately 30% of IPS MBA graduates have pursued careers in the consulting industry as well as in strategy roles across other sectors. IPS's top consulting hirers have consistently been the premier management consulting firms; in addition, many IPS MBA grads have also pursued roles in specialty boutique firms that focus in particular sectors as well as in leading innovation & design consultancies. IPS MBAs value both long-term and immediate benefits of a career serving clients through the consulting role as well as the opportunity to work in dynamic teams with inspiring leaders. And a career in consulting is often seen as the ideal means to feed their appetite for continued learning and growth.`,
            order: 0,
          },
          {
            question: 'Investment Management',
            answer:
              'Investment Management is one of the most highly sought after industries at IPS BUSINESS SCHOOL. Student interest and those coming into school with buy-side experience has grown steadily, with over 11% of the MBA class actively pursuing internship and full-time opportunities in IM. These students are working in a range of different funds including Hedge Funds, Mutual Funds, Pension Funds, Private Wealth Management, Family Offices, Endowments, Investor Relations, and Fund of Funds. Some of the positions that our graduates have recently filled include Research Analyst, Investment Analyst, Equity/Credit Research Analyst; Investment Consultant; Portfolio Manager; and Quantitative Analyst.',
            order: 1,
          },
          {
            question: 'Consumer Product and Packaged Goods',
            answer:
              'In the last decade, an increasing number of IPS BUSINESS SCHOOL MBA graduates have pursued successful careers in Consumer Packaged Goods (CPG), working in brand management, corporate finance, supply chain operations, business development, and corporate strategy. MBA interns regularly fill positions at LG Electronics, Adani, Unilever, PepsiCo, Bajaj and Reliance among other industry leaders.',
            order: 2,
          },
          {
            question: 'Private Equity/Venture Capital',
            answer:
              'Private Equity is one of the top career choices of students entering IPS BUSINESS SCHOOL. Approximately over 10% of current IPS students have prior experience in private equity or venture capital, often combined with prior experience in investment banking. Our Placement office regularly hosts workshops on the networking process, interview preparation, offer management, and more.',
            order: 3,
          },
          {
            question: 'Startups/ Entrepreneurship and Fintech',
            answer:
              'Entrepreneurship is a primary area of interest for IPS BUSINESS SCHOOL MBAs, many of whom are considering joining a startup or starting their own business in the short or long term. Startups across industries, sizes, and stages are hiring IPS MBAs because they bring a "get it done" approach – a mix of functional and people skills that can impact scaling companies. Students have worked internships or accepted full-time jobs at companies such as Analha, HR Bot, White Hat Jr., CarDekho, Thrillophilia, among others.',
            order: 4,
          },
          {
            question: 'General Management',
            answer:
              'Every year for the last decade, over 10% of IPS BUSINESS SCHOOL MBA graduates have pursued opportunities in general management, including elite leadership development programs, in areas such as brand/product management, business development, corporate finance, and supply chain operations. Some of the top companies across sectors and industries who regularly hire IPS MBA graduates include: Amazon, HDFC, VIVO, Aditya Birla, Reliance, Axis Bank, ICICI, TCS, Shriram Group, Samsung, and Bank of Baroda among others.',
            order: 5,
          },
          {
            question: 'Investment Banking',
            answer: `Each year, approximately 15% of the graduating class pursues careers in the investment banking industry. IPS BUSINESS SCHOOL's renowned finance faculty helps shape the future leaders of the banking industry. As IPS's most popular academic major, the finance curriculum allows students to build skills in quantitative ability, negotiation, client relationships and corporate development.`,
            order: 6,
          },
        ],
      },
    ];

    const results = [];
    for (const data of sections) {
      const filter = { section: data.section };
      if (!force) {
        const exists = await PlacementsPageContent.findOne(filter).lean();
        if (exists) {
          results.push({ section: data.section, status: 'skipped (already exists)' });
          continue;
        }
      }
      await PlacementsPageContent.findOneAndUpdate(filter, { $set: data }, { upsert: true, new: true });
      results.push({ section: data.section, status: force ? 'overwritten' : 'created' });
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error('[PLACEMENTS-CONTENT SEED]', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Seed failed' },
      { status: 500 }
    );
  }
}
