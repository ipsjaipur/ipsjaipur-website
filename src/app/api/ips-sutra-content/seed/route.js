import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import IpsSutraPageContent from '@/models/IpsSutraPageContent';
import { getAuthFromCookies } from '@/lib/auth';

/**
 * POST /api/ips-sutra-content/seed
 * Admin-protected. Inserts current IPS Sutra static data as initial DB content.
 * Safe to re-run — uses upsert. Pass ?force=true to overwrite existing docs.
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
      // ── Content Section ────────────────────────────────────────────────────────
      {
        section: 'content',
        bannerTitle: 'आईपीएस सूत्र',
        bannerImageUrl: `${imgBase}images/about/ips-sutra-banner-img-2.webp`,
        contentHeading: 'आईपीएस सूत्र',
        contentParagraphs: [
          '<strong>आईपीएस बिज़नेस स्कूल का बीबीए प्रोग्राम </strong> एक <strong>UGC </strong>द्वारा प्रदान किया जाने वाला 3 वर्षीय <strong>Degree Program</strong> है जिसके अंतर्गत विद्यार्थी के व्यक्तित्व के सम्पूर्ण विकास के लिए शिक्षा वर्ग के विद्वानों और व्यापार जगत के सफल व्यक्तियों द्वारा specialized session लिए जाते है |',
          'व्यापार जगत को एक कमी कई वर्षो से महसूस होती रही है कि रोजगार के लिए उपलब्द्ध विध्यार्थी शैक्षणिक दृष्टिकोण से तो उपयुक्त होते है किन्तु व्यापारिक परिदृश्य में परिपक्व नहीं होते |',
          '<strong> आईपीएस बिज़नेस स्कूल </strong> में इस विसंगति को दूर करने के लिए एक अनूठे 3 वर्षीय <strong> बीबीए प्रोग्राम </strong> की शुरुआत की है इसके अंतर्गत विध्यार्थी को <strong> बीबीए </strong> की शिक्षा के साथ – साथ व्यापार जगत में कार्य करने का अनुभव भी मिलता है |',
          'शिक्षा और व्यवसायिक अनुभव के इस अनोखे संगम से विद्यार्थी को प्रबंधन की जानकारी और व्यापार जगत में <strong> experience </strong> करने का अवसर मिलता है, जिसके फलस्वरूप <strong> बीबीए प्रोग्राम </strong> को पूर्ण करने की पश्चात व्यापार जगत को एक ऐसा प्रबंधक मिलता है जो व्यापारिक प्रबंधन के द्रिस्टीकोण से एक निपुण प्रबंधक होता है और वह व्यापार के बारीकियों और उतार – चढ़ाव का अनुभव ले चुका होता है, और वह व्यापार जगत की जिम्मेदारियों और चुनोतियो का सामना करने के लिए पूर्ण रूप से तैयार होता है |',
        ],
        ctaText: 'Start Journey Today',
        ctaHref: 'https://admissions.ipsedu.in/',
        sideImageUrl: `${imgBase}images/about/bba-ab.webp`,
        sideImageAlt: 'IPS Sutra - Skill Development Program',
      },

      // ── Advantages Section ─────────────────────────────────────────────────────
      {
        section: 'advantages',
        advantagesHeading: 'IPS Advantages',
        advantagesApplyText: 'Apply Now',
        advantagesApplyHref: 'https://admissions.ipsedu.in/',
        advantages: [
          { iconName: 'GraduationCap',   text: 'व्यवसायिक प्रशिक्षण सहित पाठ्यक्रम',                    color: 'from-orange-500 to-orange-600', order: 0 },
          { iconName: 'HandCoins',        text: 'प्रशिक्षण के साथ भुगतान',                                  color: 'from-blue-500 to-blue-600',   order: 1 },
          { iconName: 'BrainCircuit',     text: 'क्षमता निर्माण के साथ-साथ ज्ञान संचय',                  color: 'from-orange-500 to-orange-600', order: 2 },
          { iconName: 'Plane',            text: '2 महीने का अंतर्राष्ट्रीय प्रशिक्षण (Sponsored*)',       color: 'from-blue-500 to-blue-600',   order: 3 },
          { iconName: 'Factory',          text: 'नियमित उद्योगों और कंपनियों का दौरा',                    color: 'from-orange-500 to-orange-600', order: 4 },
          { iconName: 'BadgeIndianRupee', text: 'सस्ती शुल्क संरचना',                                     color: 'from-blue-500 to-blue-600',   order: 5 },
          { iconName: 'Languages',        text: 'अंतर्राष्ट्रीय भाषा का ज्ञान',                           color: 'from-orange-500 to-orange-600', order: 6 },
          { iconName: 'BadgeCheck',       text: 'औद्योगिक शिक्षा प्रमाणपत्र',                            color: 'from-blue-500 to-blue-600',   order: 7 },
          { iconName: 'Presentation',     text: 'प्रभावी प्रबंधकीय LAB',                                   color: 'from-orange-500 to-orange-600', order: 8 },
          { iconName: 'UserRoundCheck',   text: 'कॉर्पोरेट सेक्टर से मार्गदर्शन',                        color: 'from-blue-500 to-blue-600',   order: 9 },
          { iconName: 'Laptop',           text: 'Free Laptop*',                                             color: 'from-orange-500 to-orange-600', order: 10 },
          { iconName: 'MessagesSquare',   text: 'Soft Skills LAB',                                          color: 'from-blue-500 to-blue-600',   order: 11 },
          { iconName: 'Trophy',           text: 'A+ श्रेणी का प्रबंधन संस्थान',                           color: 'from-orange-500 to-orange-600', order: 12 },
        ],
      },
    ];

    const results = [];
    for (const sectionData of sections) {
      const { section } = sectionData;

      if (!force) {
        const existing = await IpsSutraPageContent.findOne({ section });
        if (existing) {
          results.push({ section, status: 'skipped' });
          continue;
        }
      }

      await IpsSutraPageContent.findOneAndUpdate(
        { section },
        { $set: sectionData },
        { upsert: true, new: true, runValidators: true }
      );
      results.push({ section, status: force ? 'overwritten' : 'seeded' });
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error('[IPS-SUTRA-CONTENT SEED]', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Seed failed' },
      { status: 500 }
    );
  }
}
