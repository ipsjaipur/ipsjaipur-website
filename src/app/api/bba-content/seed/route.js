import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BBAPageContent from '@/models/BBAPageContent';
import { getAuthFromCookies } from '@/lib/auth';

/**
 * POST /api/bba-content/seed
 * Admin-protected. Inserts current BBA static data as initial DB content.
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
      // ── Banner ─────────────────────────────────────────────────────────────────
      {
        section: 'banner',
        bannerSlides: [
          { src: `${imgBase}images/courses/bba-image-3.webp`, alt: 'BBA Program - IPS Business School', priority: true, order: 0 },
          { src: `${imgBase}images/courses/bba-image-4.webp`, alt: 'BBA Program - World-Class Curriculum', priority: false, order: 1 },
          { src: `${imgBase}images/courses/bba-img-1.webp`, alt: 'BBA Program - Industry Connections', priority: false, order: 2 },
          { src: `${imgBase}images/courses/bba-img-2.webp`, alt: 'BBA Program - Career Opportunities', priority: false, order: 3 },
        ],
      },

      // ── Overview ───────────────────────────────────────────────────────────────
      {
        section: 'overview',
        overviewTitle: 'BACHELOR OF BUSINESS ADMINISTRATION (BBA)',
        overviewDuration: '3 Years (6 Semesters)',
        overviewCaption: '(Approved by AICTE New Delhi, Government of India)',
        rtuLogoUrl: `${imgBase}images/home/rtu.webp`,
        aicteLogoUrl: `${imgBase}images/home/aicte.webp`,
        approvalImageUrl: `${imgBase}images/home/blck.webp`,
        approvalImageCaption: '(Approved by AICTE New Delhi - Govt of INDIA)',
        highlightsHeading: 'BBA HIGHLIGHTS:',
        highlights: [
          { iconName: 'CheckCircle2', text: 'Approved by AICTE New Delhi, Government of India', hindiText: 'एआईसीटीई, नई दिल्ली द्वारा अनुमोदित – भारत सरकार', order: 0 },
          { iconName: 'School', text: 'Affiliated with Rajasthan Technical University.', hindiText: 'राजस्थान तकनीकी विश्वविद्यालय से संबद्ध।', order: 1 },
          { iconName: 'Briefcase', text: "BBA Degree with Work Experience (with Regular On Job Training's - OJT's & Live Projects).", hindiText: "कार्य अनुभव के साथ बीबीए डिग्री (नियमित ऑन जॉब ट्रेनिंग - OJT's एवं लाइव प्रोजेक्ट्स के साथ)।", order: 2 },
          { iconName: 'Bot', text: 'Additional Artificial Intelligence / Machine Learning Course. (Level 1) (Level 2) (Level 3) (Level 4) (Level 5) (Level 6)', hindiText: 'अतिरिक्त आर्टिफिशियल इंटेलिजेंस / मशीन लर्निंग कोर्स। (लेवल 1) (लेवल 2) (लेवल 3) (लेवल 4) (लेवल 5) (लेवल 6)', order: 3 },
          { iconName: 'TrendingUp', text: 'Additional Business Analytics Course. (Level 1) (Level 2) (Level 3) (Level 4) (Level 5) (Level 6)', hindiText: 'अतिरिक्त बिजनेस एनालिटिक्स कोर्स। (लेवल 1) (लेवल 2) (लेवल 3) (लेवल 4) (लेवल 5) (लेवल 6)', order: 4 },
          { iconName: 'Megaphone', text: 'Additional Digital Marketing Course. (Level 1) (Level 2) (Level 3) (Level 4) (Level 5) (Level 6)', hindiText: 'अतिरिक्त डिजिटल मार्केटिंग कोर्स। (लेवल 1) (लेवल 2) (लेवल 3) (लेवल 4) (लेवल 5) (लेवल 6)', order: 5 },
          { iconName: 'Globe', text: '3 Months International, Trainings & Exchange Program (Sponsored / Optional)*.', hindiText: '3 माह का अंतरराष्ट्रीय प्रशिक्षण एवं एक्सचेंज प्रोग्राम (स्पॉन्सर्ड / वैकल्पिक)*।', order: 6 },
          { iconName: 'Trophy', text: 'Best Placements.', hindiText: 'सर्वश्रेष्ठ प्लेसमेंट।', order: 7 },
          { iconName: 'BookOpen', text: 'Advanced Excel Course.', hindiText: 'एडवांस्ड एक्सेल कोर्स।', order: 8 },
          { iconName: 'Building2', text: 'AC Classrooms.', hindiText: 'एसी युक्त कक्षाएँ।', order: 9 },
          { iconName: 'CheckCircle2', text: 'Industry Specialised Certifications.', hindiText: 'उद्योग विशेष प्रमाणपत्र।', order: 10 },
          { iconName: 'DollarSign', text: 'Affordable Fee Structure.', hindiText: 'किफायती शुल्क संरचना।', order: 11 },
          { iconName: 'Lightbulb', text: 'Developing Excellence by Studies and Practice Methodology.', hindiText: 'अध्ययन एवं अभ्यास पद्धति द्वारा उत्कृष्टता का विकास।', order: 12 },
          { iconName: 'Briefcase', text: 'Corporate Exposure throughout the course.', hindiText: 'पूरे कोर्स के दौरान कॉर्पोरेट एक्सपोजर।', order: 13 },
          { iconName: 'Users', text: 'The Best & Most Experienced Team of Mentors & Faculty Members including Corporate Consultants, Chartered Accountants (CA), Company Secretaries (CS), Ph.D. Scholars, Industry Leaders, Research Guides & Subjective Book Authors.', hindiText: 'कॉर्पोरेट कंसल्टेंट्स, चार्टर्ड अकाउंटेंट्स (CA), कंपनी सेक्रेटरीज (CS), पीएचडी स्कॉलर्स, इंडस्ट्री लीडर्स, रिसर्च गाइड्स एवं विषय विशेषज्ञ लेखकों सहित अनुभवी टीम।', order: 14 },
          { iconName: 'MessageSquare', text: 'Soft Skills / Communication Classes.', hindiText: 'सॉफ्ट स्किल्स / संचार कक्षाएँ।', order: 15 },
          { iconName: 'BookOpen', text: 'Industry Specific & Strong Curriculum.', hindiText: 'उद्योग आधारित एवं मजबूत पाठ्यक्रम।', order: 16 },
          { iconName: 'Dumbbell', text: 'Excellent Indoor / Outdoor Sports and Recreational Activities.', hindiText: 'उत्कृष्ट इनडोर / आउटडोर खेल एवं मनोरंजन गतिविधियाँ।', order: 17 },
          { iconName: 'Lightbulb', text: 'Emphasis on ability creation rather than just knowledge accumulation.', hindiText: 'केवल ज्ञान संचय के बजाय क्षमता विकास पर जोर।', order: 18 },
          { iconName: 'Handshake', text: 'Strong Corporate Linkages.', hindiText: 'मजबूत कॉर्पोरेट संबंध।', order: 19 },
        ],
        descriptionParagraphs: [
          'IPS has launched a 3-year BBA course for ambitious school students who want to do things differently, so IPS provided opportunities to those students through this particular course. They can enrich their minds with our genius faculty. By doing this course, they can get the light of the corporate world on what should be done and how it should be done. They develop strategic as well as analytical skills. As they are young minds, by doing this course, they get to know the path and become focused. IPS launched this course with the motive of developing young minds, as they are the future of the country, and gives them the light to analyze and create a difference in the world by making things differently, as IPS believes in thinking beyond the boundaries. IPS belongs to the IPS Group of Colleges, and with its extensive offerings secures its name in the list of leading <b>BBA colleges in Jaipur.</b>',
          'With Executive Diploma in Business Management (Duration : 2 Years).',
        ],
        whyIpsHeading: 'Why IPS Business School is Recognized Among the Best Colleges for BBA in Jaipur',
        whyIpsIntro: 'In a landscape where most institutes claim to be the "best BBA college in Jaipur," it takes a powerful stance to assert the same by any college. However, IPS Business School has precisely what it requires to stand out proudly among the crowd. Here is what makes IPS the best:',
        whyIpsPoints: [
          "<b>Technical Education Expertise:</b> When it comes to a BBA, technicality can frequently be neglected. However, IPS Business School values it above all else. IPS experts' 18+ years of experience in providing technically sound knowledge will provide you with the skills you need to succeed in the top roles.",
          '<b>Outstanding Placements & Internships:</b> IPS Business School is among the top placement-oriented BBA colleges in Jaipur. IPS students have been performing extraordinarily in their placement and internship statistics. It has a strong track record of successfully placing all its competent students in diverse roles across multiple industries.',
          "<b>Affordability:</b> IPS isn't one of those business schools that offer mediocre quality education at irrationally high fees. IPS is the epitome of the <b>top college for BBA in Jaipur,</b> offering top-tier education at fees affordable by most students.",
        ],
      },

      // ── Syllabus ───────────────────────────────────────────────────────────────
      {
        section: 'syllabus',
        syllabusHeading: 'SYLLABUS:',
        syllabusItems: [
          { name: 'BBA 3rd Year RU Syllabus', pdfFile: `${imgBase}images/courses/bcasyllabusru.pdf`, order: 0 },
          { name: 'BBA RTU Syllabus', pdfFile: `${imgBase}images/courses/BBA_RTU_Syllbus_2024.pdf`, order: 1 },
        ],
      },

      // ── Specializations + Eligibility ──────────────────────────────────────────
      {
        section: 'specializations',
        specializationsHeading: 'SPECIALIZATIONS AVAILABLE:',
        specializations: [
          { name: 'Marketing', order: 0 },
          { name: 'Finance', order: 1 },
          { name: 'Human Resource', order: 2 },
          { name: 'Business Analytics', order: 3 },
        ],
        eligibilityHeading: 'Eligibility:',
        eligibilityPoints: [
          { text: '10 + 2 in any discipline with minimum 45% marks in General & 40% marks for OBC / SC / ST category.', order: 0 },
          { text: 'Selection is based on Academic Record (Overall) & Personal Interview.', order: 1 },
        ],
        eligibilityPriorities: [],
      },

      // ── Admission Process ──────────────────────────────────────────────────────
      {
        section: 'admissionProcess',
        admissionHeading: 'How to Apply:',
        admissionIntro: '',
        admissionSteps: [
          { label: 'Online', description: 'Application form can also be filled & submitted online on our website along with online payment of Rs. 900/-.', linkText: 'Click Here to Apply Online', linkHref: '#', order: 0 },
          { label: 'Offline', description: 'Application form can be purchased from IPS Campus on cash payment of Rs. 900/- & submit the same duly filled in with requisite documents.', linkText: '', linkHref: '', order: 1 },
        ],
      },

      // ── Documents Required ─────────────────────────────────────────────────────
      {
        section: 'documentsRequired',
        documentsHeading: 'Documents Required:',
        documents: [
          { text: 'Complete Application Form (Filled Online / Offline)', isBold: true, order: 0 },
          { text: 'Aadhar Card Copy for Domestic Students / Passport Copy for International Students', isBold: true, order: 1 },
          { text: 'Marksheets (Original + Two Set of Photocopies)', isBold: false, order: 2 },
          { text: '10th Marksheet', isBold: false, order: 3 },
          { text: '12th Marksheet', isBold: false, order: 4 },
          { text: 'Migration Certificate', isBold: false, order: 5 },
          { text: 'Copy of Scan Signatures of Student.', isBold: false, order: 6 },
          { text: 'Passport Size Photographs – 4', isBold: false, order: 7 },
          { text: 'Anti Ragging Declaration (On Rs. 50/- Stamp Paper)', isBold: false, order: 8 },
        ],
      },

      // ── Selection Procedure ────────────────────────────────────────────────────
      {
        section: 'selectionProcedure',
        selectionHeading: 'Selection Procedure:',
        selectionSteps: [
          { stepLabel: 'Step 1', description: 'Filling up the Admission Form. (Online / Offline)', order: 0 },
          { stepLabel: 'Step 2', description: 'Submission of Form with Documents.', order: 1 },
          { stepLabel: 'Step 3', description: 'Student Analysis & Personal / Telephonic Interview.', order: 2 },
          { stepLabel: 'Step 4', description: 'Declaration of Shortlisted Candidates through Email/SMS/Telephone Calls or Students may call IPS to know their results.', order: 3 },
          { stepLabel: 'Step 5', description: 'Confirmation of the Registration after Fee Submission.', order: 4 },
        ],
      },

      // ── Fee Structure ──────────────────────────────────────────────────────────
      {
        section: 'feeStructure',
        feeHeading: 'Fee Structure of BBA',
        feeEnglishText: 'Scholarship is Available on the basis of Academic Performance & Psycho Matrix Test for Details Contact : +91 8233790000',
        feeHindiText: 'छात्रवृत्ति शैक्षणिक प्रदर्शन एवं साइको मैट्रिक्स टेस्ट के आधार पर उपलब्ध है। अधिक जानकारी के लिए संपर्क करें: +91 8233790000',
      },

      // ── FAQ ────────────────────────────────────────────────────────────────────
      {
        section: 'faq',
        faqHeading: 'Frequently Asked Questions',
        faqs: [
          { question: 'IPS BUSINESS SCHOOL JAIPUR affiliated or approved ?', answer: 'Yes, IPS BUSINESS SCHOOL JAIPUR is approved by AICTE New Delhi (Government of India) and affiliated with Rajasthan Technical University (RTU).', order: 0 },
          { question: 'What is the BBA Eligibility Criteria ?', answer: 'Students who have completed their 10+2 graduation from a UGC-affiliated university with a minimum of 50% marks for General, 45% for OBC, 40% for SC/ST are eligible to apply for the BBA program.', order: 1 },
          { question: 'How can I apply for Admission ?', answer: 'Students can apply: Online through the official website https://www.ipsedu.in, By visiting the campus admission office (8:00 AM to 4 PM), By filling out the admission form and submitting required documents', order: 2 },
          { question: 'What is the duration of the BBA program ?', answer: 'The BBA program duration is 3 years.', order: 3 },
          { question: 'What documents are required for admission?', answer: 'Generally required documents include: 10th & 12th Mark sheet, Transfer Certificate, Migration Certificate & Provisional Certificate, Passport-size photographs, ID Proof (Adhar Crad)', order: 4 },
          { question: 'Scholarships Available ?', answer: 'Yes, scholarships are provided based on: Academic performance, Merit-based criteria, Psychometric Profiling, Government scholarship schemes', order: 5 },
          { question: 'Hostel Facility Available ?', answer: 'Yes, hostel facilities are available at IPS BUSINESS SCHOOL JAIPUR for students.\n\nHostel/PG Facilities\n• Separate hostels for boys and girls.\n• Rooms are available in single, double-sharing, and triple-sharing options.\n• Rooms usually include bed, study table, almirah, and basic furniture.\n\nFacilities available:\n• Wi-Fi internet\n• Mess / food facility\n• 24×7 security\n• Laundry and cleaning services\n• Medical support and recreation areas.', order: 6 },
          { question: 'Where is IPS BUSINESS SCHOOL located ?', answer: 'IPS BUSINESS SCHOOL is located in Jaipur, Rajasthan.', order: 7 },
          { question: 'Where is IPS COLLEGE JAIPUR located ?', answer: 'IPS COLLEGE JAIPUR is located in Jaipur, Rajasthan.', order: 8 },
          { question: 'BBA Internship provided during the course ?', answer: 'Yes, internships are provided to enhance practical knowledge.', order: 9 },
          { question: 'Education Loan Facility Available ?', answer: 'Yes, education loan facility is available at IPS Business School Jaipur (IPS College). However, the college itself does not directly give the loan. Instead, it helps students get education loans from banks.\n\nLoans can cover:\n• Course fees\n• Hostel fees\n• Other education expenses', order: 10 },
          { question: 'IPS have modern infrastructure ?', answer: 'Yes, the campus is equipped with modern infrastructure including fully air-conditioned classrooms, digital smart boards, well-equipped computer labs, and advanced learning facilities to provide a comfortable and technology-driven environment for students.', order: 11 },
          { question: 'Attendance Compulsory ?', answer: 'Yes, students must maintain the minimum 75% attendance as per university norms to appear in examinations.', order: 12 },
          { question: 'How is attendance monitored ?', answer: 'Attendance is recorded regularly, and parents are informed through letters, and phone calls if there is a shortage as per university rules.', order: 13 },
          { question: 'Industry Exposure?', answer: 'Yes, students get industry exposure through seminars and workshops.', order: 14 },
          { question: 'Experienced Faculty members available ?', answer: 'Yes, IPS has highly qualified and experienced faculty.', order: 15 },
          { question: 'Campus Life events and activities ?', answer: 'Yes, various academic and cultural events are organized regularly.', order: 16 },
          { question: 'Transport Facility Available?', answer: 'Yes, transport facilities are available for students.', order: 17 },
          { question: 'IPS support Startups?', answer: 'Yes, IPS encourages entrepreneurship and startup initiatives.', order: 18 },
          { question: 'Labs available for Practical Learning?', answer: 'Yes, well-equipped labs are available for students.', order: 19 },
          { question: 'What are the College timings?', answer: 'College timings are structured to ensure academic efficiency while allowing students time for self-study, internship and live projects along with extracurricular activities. Academic sessions and Technical Trainings are conducted from 8:00 AM to 1:00 PM initially and once students start their respective internships/live projects, the sessions start at 8:00 AM and folds up at 11:30 AM.', order: 20 },
          { question: 'What is a BBA course?', answer: 'A BBA (Bachelor of Business Administration) is an undergraduate program that focuses on business management, leadership, and entrepreneurial skills.', order: 21 },
          { question: 'Why should I choose BBA after 12th?', answer: 'BBA is ideal for students who want to build a career in business, management, marketing, finance, or start their own venture.', order: 22 },
          { question: 'Who should pursue a BBA degree?', answer: 'Students from any stream (Commerce, Science, or Arts) who are interested in business and management can pursue BBA.', order: 23 },
          { question: 'What is the eligibility for BBA admission?', answer: 'Candidates must have completed 10+2 from a recognized board, usually with a minimum of 45%–50% marks.', order: 24 },
          { question: 'Is there any entrance exam for BBA?', answer: 'Some colleges conduct entrance exams, while many offer direct admission based on merit.', order: 25 },
          { question: 'What is the admission process for BBA?', answer: 'The process includes application submission, merit or entrance exam evaluation, and sometimes a personal interview.', order: 26 },
          { question: 'What is the duration of a BBA course?', answer: 'The BBA program is typically a 3-year undergraduate degree divided into 6 semesters.', order: 27 },
          { question: 'What subjects are taught in BBA?', answer: 'Subjects include Marketing, Finance, Human Resource Management, Business Law, Economics, and Entrepreneurship.', order: 28 },
          { question: 'Are there specializations in BBA?', answer: 'Yes, popular specializations include Marketing, Finance, HR, Business Analytics, and International Business.', order: 29 },
          { question: 'What are career options after BBA?', answer: 'Graduates can work as Marketing Executives, Business Analysts, HR Executives, Sales Managers, or pursue higher studies.', order: 30 },
          { question: 'What is the salary after BBA?', answer: 'The average starting salary ranges from ₹2.5 LPA to ₹6 LPA, depending on skills and college reputation.', order: 31 },
          { question: 'Can I do MBA after BBA?', answer: 'Yes, BBA is one of the best degrees to pursue before an MBA.', order: 32 },
          { question: 'Does BBA provide placement opportunities?', answer: 'Yes, most colleges offer placement assistance with companies from various industries.', order: 33 },
          { question: 'Are internships included in BBA?', answer: 'Yes, internships are often a part of the curriculum to provide practical exposure.', order: 34 },
          { question: 'What skills will I gain in a BBA program?', answer: 'You will develop leadership, communication, problem-solving, analytical, and managerial skills.', order: 35 },
          { question: 'Is BBA good for entrepreneurship?', answer: 'Yes, BBA provides knowledge of business operations, making it ideal for aspiring entrepreneurs.', order: 36 },
          { question: 'What facilities should a good BBA college offer?', answer: 'Modern classrooms, computer labs, library, Wi-Fi campus, hostel, and placement support.', order: 37 },
          { question: 'Does BBA include practical learning?', answer: 'Yes, through case studies, projects, internships, and industrial visits.', order: 38 },
          { question: 'How does a BBA college provide industry exposure?', answer: 'Through guest lectures, live projects, workshops, seminars, and internships.', order: 39 },
          { question: 'What are the best BBA colleges in Jaipur?', answer: 'Jaipur has many reputed BBA colleges offering quality education, experienced faculty, and good placements.', order: 40 },
          { question: 'Why choose Jaipur for BBA?', answer: 'Jaipur is an emerging education hub with affordable living and growing career opportunities.', order: 41 },
          { question: 'Which BBA college offers the best placement in Jaipur?', answer: 'Top BBA colleges in Jaipur provide strong placement support with reputed companies and competitive packages.', order: 42 },
          { question: 'Which BBA college has the best ROI?', answer: 'Colleges with strong placement records and quality education offer the best return on investment.', order: 43 },
          { question: 'Is BBA a good career option in 2026?', answer: 'Yes, BBA remains a strong career choice due to growing demand in management, startups, and corporate sectors.', order: 44 },
          { question: 'What makes a top BBA college stand out?', answer: 'Experienced faculty, industry exposure, modern curriculum, placement support, and infrastructure.', order: 45 },
          { question: 'Can BBA students get jobs in multinational companies?', answer: 'Yes, many multinational companies hire BBA graduates for entry-level management roles.', order: 46 },
          { question: 'Is BBA better than B.Com?', answer: 'BBA focuses more on management and leadership, while B.Com is more finance and accounting-oriented.', order: 47 },
          { question: 'What is the future scope after BBA?', answer: 'Students can pursue MBA, PGDM, or other professional courses and build careers in corporate, startups, or entrepreneurship.', order: 48 },
        ],
      },

      // ── Sidebar ────────────────────────────────────────────────────────────────
      {
        section: 'sidebar',
        sidebarVideos: [
          { url: 'https://www.youtube.com/embed/ocaViRxJrdE?si=gmgh25qgaZeHh0hb', title: '', order: 0 },
          { url: 'https://www.youtube.com/embed/4aq02tSiXd4?si=AawJvooDzO8Pflx0', title: 'Raghav Sharma Video Resume', order: 1 },
        ],
      },
    ];

    const results = [];
    for (const sectionData of sections) {
      const { section } = sectionData;

      if (!force) {
        const existing = await BBAPageContent.findOne({ section });
        if (existing) {
          results.push({ section, status: 'skipped' });
          continue;
        }
      }

      await BBAPageContent.findOneAndUpdate(
        { section },
        { $set: sectionData },
        { upsert: true, new: true, runValidators: true }
      );
      results.push({ section, status: force ? 'overwritten' : 'seeded' });
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error('[BBA-CONTENT SEED]', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Seed failed' },
      { status: 500 }
    );
  }
}
