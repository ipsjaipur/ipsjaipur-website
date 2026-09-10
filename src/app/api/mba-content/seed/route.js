import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import MBAPageContent from '@/models/MBAPageContent';
import { getAuthFromCookies } from '@/lib/auth';

/**
 * POST /api/mba-content/seed
 * Admin-protected. Inserts the current static MBA data as the initial DB content.
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
      // ── Banner ───────────────────────────────────────────────────────────────
      {
        section: 'banner',
        bannerSlides: [
          {
            src: `${imgBase}images/courses/mba-image-1-new.webp`,
            alt: 'MBA Program - World-Class Curriculum',
            priority: false,
            order: 0,
          },
          {
            src: `${imgBase}images/courses/mba-image-2-new.webp`,
            alt: 'MBA Program - Industry Connections',
            priority: false,
            order: 1,
          },
          {
            src: `${imgBase}images/courses/mba-image-3-new.webp`,
            alt: 'MBA Program - Career Opportunities',
            priority: false,
            order: 2,
          },
          {
            src: `${imgBase}images/courses/mba-image-4-new.webp`,
            alt: 'MBA Program - Career Opportunities',
            priority: false,
            order: 3,
          },
        ],
      },

      // ── Overview ─────────────────────────────────────────────────────────────
      {
        section: 'overview',
        overviewTitle: 'MASTER IN BUSINESS ADMINISTRATION (MBA)',
        overviewDuration: '2 Years',
        overviewCaption:
          '(Approved by AICTE New Delhi, Government of Rajasthan & and Affiliated with RTU Kota)',
        rtuLogoUrl: `${imgBase}images/home/rtu.webp`,
        aicteLogoUrl: `${imgBase}images/home/aicte.webp`,
        approvalImageUrl: `${imgBase}images/home/blck.webp`,
        approvalImageCaption: '(Approved by AICTE New Delhi - Govt of INDIA)',
        highlightsHeading: 'MBA HIGHLIGHTS:',
        highlights: [
          {
            iconName: 'CheckCircle2',
            text: 'Approved by AICTE New Delhi - Govt of INDIA.',
            hindiText: 'एआईसीटीई, नई दिल्ली द्वारा अनुमोदित – भारत सरकार',
            order: 0,
          },
          {
            iconName: 'School',
            text: 'Affiliated with Rajasthan Technical University (RTU)',
            hindiText: 'राजस्थान तकनीकी विश्वविद्यालय (RTU) से संबद्ध',
            order: 1,
          },
          {
            iconName: 'GraduationCap',
            text: 'Master in Business Administration (MBA) Degree with Dual Specialization.',
            hindiText: 'दो विषयों में विशेषज्ञता के साथ मास्टर इन बिजनेस एडमिनिस्ट्रेशन (MBA) डिग्री।',
            order: 2,
          },
          {
            iconName: 'Briefcase',
            text: "Realtime Corporate Experience through Regular OJT's (On Job Training) & Live Projects.",
            hindiText:
              'नियमित OJT (ऑन जॉब ट्रेनिंग) एवं लाइव प्रोजेक्ट्स के माध्यम से रियलटाइम कॉर्पोरेट अनुभव।',
            order: 3,
          },
          {
            iconName: 'Bot',
            text: 'Additional Artificial Intelligence / Machine Learning Course. (Level 1-4)',
            hindiText: 'अतिरिक्त आर्टिफिशियल इंटेलिजेंस / मशीन लर्निंग कोर्स। (लेवल 1-4)',
            order: 4,
          },
          {
            iconName: 'TrendingUp',
            text: 'Additional Business Analytics Course. (Level 1-4)',
            hindiText: 'अतिरिक्त बिजनेस एनालिटिक्स कोर्स। (लेवल 1-4)',
            order: 5,
          },
          {
            iconName: 'Megaphone',
            text: 'Additional Digital Marketing Course. (Level 1-4)',
            hindiText: 'अतिरिक्त डिजिटल मार्केटिंग कोर्स। (लेवल 1-4)',
            order: 6,
          },
          {
            iconName: 'Globe',
            text: '3 Months International, Trainings & Exchange Program (Sponsored / Optional)*.',
            hindiText: '3 माह का अंतरराष्ट्रीय प्रशिक्षण एवं एक्सचेंज प्रोग्राम (स्पॉन्सर्ड / वैकल्पिक)*।',
            order: 7,
          },
          {
            iconName: 'Trophy',
            text: 'Best Placements.',
            hindiText: 'सर्वश्रेष्ठ प्लेसमेंट।',
            order: 8,
          },
          {
            iconName: 'Users',
            text: 'The Best & Most Experienced Team of Mentors & Faculty Members including Corporate Consultants, Chartered Accountants (CA), Company Secretaries (CS), Ph.D. Scholars, Industry Leaders, Research Guides & Subjective Book Authors.',
            hindiText:
              'कॉर्पोरेट कंसल्टेंट्स, चार्टर्ड अकाउंटेंट्स (CA), कंपनी सेक्रेटरीज (CS), पीएचडी स्कॉलर्स, इंडस्ट्री लीडर्स, रिसर्च गाइड्स एवं विषय विशेषज्ञ लेखकों सहित अनुभवी मेंटर्स एवं फैकल्टी की टीम।',
            order: 9,
          },
          {
            iconName: 'Building2',
            text: 'AC Classrooms.',
            hindiText: 'एसी युक्त कक्षाएँ।',
            order: 10,
          },
          {
            iconName: 'Network',
            text: 'Offering Dual Major Specialization*. (1. Marketing 2. Finance 3. Information Technology 4. Human Resource 5. Business Analytics)',
            hindiText:
              'दो विषयों में विशेषज्ञता प्रदान की जाती है* (1. मार्केटिंग 2. फाइनेंस 3. आईटी 4. मानव संसाधन 5. बिजनेस एनालिटिक्स)',
            order: 11,
          },
          {
            iconName: 'MessageSquare',
            text: 'Communication, Employability and Soft Skills.',
            hindiText: 'कम्युनिकेशन स्किल्स, रोजगार क्षमता एवं सॉफ्ट स्किल्स।',
            order: 12,
          },
          {
            iconName: 'Factory',
            text: 'Regular Industrial Tours & Excursions.',
            hindiText: 'नियमित औद्योगिक भ्रमण एवं शैक्षणिक यात्राएँ।',
            order: 13,
          },
          {
            iconName: 'DollarSign',
            text: 'Affordable Fee Structure.',
            hindiText: 'किफायती शुल्क संरचना।',
            order: 14,
          },
          {
            iconName: 'BookOpen',
            text: 'Industry Specific & Strong Curriculum.',
            hindiText: 'उद्योग आधारित एवं मजबूत पाठ्यक्रम।',
            order: 15,
          },
          {
            iconName: 'Dumbbell',
            text: 'Excellent Indoor / Outdoor Sports and Recreational Activities.',
            hindiText: 'उत्कृष्ट इनडोर/आउटडोर खेल एवं मनोरंजन गतिविधियाँ।',
            order: 16,
          },
          {
            iconName: 'Users',
            text: 'Strong Alumni Network.',
            hindiText: 'मजबूत एलुमनाई नेटवर्क।',
            order: 17,
          },
          {
            iconName: 'Lightbulb',
            text: 'Emphasis on ability creation rather than just knowledge accumulation.',
            hindiText: 'केवल ज्ञान संचय के बजाय क्षमता विकास पर जोर।',
            order: 18,
          },
          {
            iconName: 'Handshake',
            text: 'Strong Corporate Linkages.',
            hindiText: 'मजबूत कॉर्पोरेट संबंध।',
            order: 19,
          },
        ],
        descriptionParagraphs: [
          'IPS launched this unique 2-year MBA Program owing to its practical industry oriented training in the teaching methodologies. The course structure is designed and monitored by our Academic Council, which comprises prominent internal and external academicians and professionals who continuously introduce new concepts and ideas in the related modules. The detailed structure and learning places the college as the leading <b>MBA college in Jaipur.</b>',
          'Armed with a UGC recognized MBA Degree the students are not only abreast with the latest management theories but also with incisive practical analysis, research findings, hands-on experience, and in-depth understanding of their respective specializations. The basic motto is to update the present MBA syllabus as per industry demand and become the students\' go-to option for <b>the top MBA institute in Jaipur</b>. As the gap between what is taught and what the industry demands is broadening every year, this course is conceptualized, structured, and implemented directly by the industry - driven by a strong corporate alliance. IPS belongs to the IPS Group of Colleges.',
        ],
        whyIpsHeading:
          'Why IPS Business School is Recognized as the Best MBA College in Jaipur',
        whyIpsIntro:
          'In a landscape where most institutes claim to be the "best MBA college in Jaipur," it takes a powerful stance to assert the same by any college. However, IPS Business School has precisely what it requires to stand out proudly among the crowd. Here is what makes IPS the best:',
        whyIpsPoints: [
          '<b>Technical Education Expertise:</b> When it comes to an MBA, technicality can frequently be neglected. However, IPS Business School values it above all else. IPS experts\' 18+ years of experience in providing technically sound knowledge will provide you with the skills you need to succeed in the top roles.',
          '<b>Outstanding Placements & Internships:</b> IPS students have been performing extraordinarily in their placement and internship statistics. It has a strong track record of successfully placing all its competent students in diverse roles across multiple industries.',
          '<b>Affordability:</b> IPS isn\'t one of those business schools that offer mediocre quality education at irrationally high fees. IPS is the epitome of the best college in Jaipur for MBA, offering top-tier education at fees affordable by most students.',
        ],
      },

      // ── Syllabus ─────────────────────────────────────────────────────────────
      {
        section: 'syllabus',
        syllabusHeading: 'SYLLABUS:',
        syllabusItems: [
          {
            name: 'MBA Syllabus (1st Semester)',
            pdfFile: `${imgBase}images/courses/mba-1-sam.pdf`,
            order: 0,
          },
          {
            name: 'MBA Syllabus (2nd Semester)',
            pdfFile: `${imgBase}images/courses/mba-2-sam.pdf`,
            order: 1,
          },
          {
            name: 'MBA Syllabus (3rd Semester)',
            pdfFile: `${imgBase}images/courses/mba-3-sam.pdf`,
            order: 2,
          },
          {
            name: 'MBA Syllabus (4th Semester)',
            pdfFile: `${imgBase}images/courses/mba-4-sam.pdf`,
            order: 3,
          },
        ],
      },

      // ── Specializations ───────────────────────────────────────────────────────
      {
        section: 'specializations',
        specializationsHeading: 'SPECIALIZATIONS ARE AVAILABLE IN FOLLOWING AREA:',
        specializations: [
          { name: 'Marketing', order: 0 },
          { name: 'Finance', order: 1 },
          { name: 'Information Technology', order: 2 },
          { name: 'Human Resource', order: 3 },
          { name: 'Business Analytics', order: 4 },
        ],
        eligibilityHeading: 'Eligibility:',
        eligibilityPoints: [
          {
            text: 'Students who have completed their 10+2+3 graduation from a UGC-affiliated university with a minimum of 50% marks for General, 45% for OBC, 45% for SC/ST are eligible to apply for the MBA program.',
            order: 0,
          },
          {
            text: '* Final Year Students must submit all documents except final year or final semester marksheet and Final Semester / Year Graduation result & marksheet must be submitted before 15th August 2026 or (Within a one month arrival of result whichever comes before).',
            order: 1,
          },
          {
            text: 'IPS accepts GMAT, MH-CET, CAT, CMAT, XAT, MAT, ATMA or Any State Level or Central Level Test score.',
            order: 2,
          },
          {
            text: 'Final year students can also apply for the registration.',
            order: 3,
          },
          {
            text: 'There is no cut-off predefined, but the merit is prepared on the basis of general profiling based on X, XII, GRADUATION MARKS, WORK EXPERIENCE, GMAT/MH-CET/CMAT/CAT/MAT/XAT/ATMA for Interview and final selection.',
            order: 4,
          },
          {
            text: 'For candidates with respective equal CMAT/CAT/MAT score, the preference will be given to the candidates in following order:-',
            order: 5,
          },
        ],
        eligibilityPriorities: [
          {
            text: 'Percentage of qualifying examination or equivalent CGPA',
            order: 0,
          },
          {
            text: 'Percentage of marks final in qualifying examination or equivalent CGPA',
            order: 1,
          },
          {
            text: 'Date of Birth (candidate who is older in age shall be given priority).',
            order: 2,
          },
        ],
      },

      // ── Admission Process ─────────────────────────────────────────────────────
      {
        section: 'admissionProcess',
        admissionHeading: 'How to Apply:',
        admissionIntro:
          'Date of Birth (candidate who is older in age shall be given priority).',
        admissionSteps: [
          {
            label: 'Online',
            description:
              'Application form can also be filled & submitted online on our website along with online payment of Rs. 900/-.',
            linkText: 'Click Here to Apply Online',
            linkHref: '#',
            order: 0,
          },
          {
            label: 'Offline',
            description:
              'Application form can be purchased from IPS Campus on cash payment of Rs. 900/- & submit the same duly filled in with requisite documents.',
            linkText: '',
            linkHref: '',
            order: 1,
          },
        ],
      },

      // ── Documents Required ────────────────────────────────────────────────────
      {
        section: 'documentsRequired',
        documentsHeading: 'Documents Required:',
        documents: [
          { text: 'Complete Application Form (Filled Online / Offline)', isBold: true, order: 0 },
          {
            text: 'Aadhar Card Copy for Domestic Students / Passport Copy for International Students',
            isBold: true,
            order: 1,
          },
          { text: 'Marksheets (Original + Two Set of Photocopies)', isBold: false, order: 2 },
          { text: '10th Marksheet', isBold: false, order: 3 },
          { text: '12th Marksheet', isBold: false, order: 4 },
          { text: 'Graduation (All Years or Semesters)', isBold: false, order: 5 },
          { text: 'Migration Certificate', isBold: false, order: 6 },
          { text: 'Entrance Test Score Card – CMAT/MAT/CAT/XAT/ATMA', isBold: false, order: 7 },
          { text: 'Copy of Scan Signatures of Student.', isBold: false, order: 8 },
          { text: 'Passport Size Photographs – 4', isBold: false, order: 9 },
          {
            text: 'Anti Ragging Declaration (On Rs. 50/- Stamp Paper)',
            isBold: false,
            order: 10,
          },
          {
            text: '* Final Year Students must submit all documents except final year or final semester marksheet and Final Semester / Year Graduation result & marksheet must be submitted before 15th August 2026 or (Within a one month arrival of result whichever comes before).',
            isBold: false,
            order: 11,
          },
        ],
      },

      // ── Selection Procedure ────────────────────────────────────────────────────
      {
        section: 'selectionProcedure',
        selectionHeading: 'Selection Procedure:',
        selectionSteps: [
          { stepLabel: 'Step 1', description: 'Filling up the Admission Form. (Online / Offline)', order: 0 },
          { stepLabel: 'Step 2', description: 'Submission of Form with Documents.', order: 1 },
          {
            stepLabel: 'Step 3',
            description: 'Student Analysis & Personal/ Telephonic Interview.',
            order: 2,
          },
          {
            stepLabel: 'Step 4',
            description:
              'Declaration of Shortlisted Candidates through Email/SMS/Telephone Calls or Students may call IPS to know their results.',
            order: 3,
          },
          {
            stepLabel: 'Step 5',
            description: 'Confirmation of the Registration after Fee Submission.',
            order: 4,
          },
        ],
      },

      // ── Fee Structure ──────────────────────────────────────────────────────────
      {
        section: 'feeStructure',
        feeHeading: 'Fee Structure of MBA',
        feeEnglishText:
          'Scholarship is Available on the basis of Academic Performance & Psycho Matrix Test for Details Contact : +91 8233790000',
        feeHindiText:
          'छात्रवृत्ति शैक्षणिक प्रदर्शन एवं साइको मैट्रिक्स टेस्ट के आधार पर उपलब्ध है। अधिक जानकारी के लिए संपर्क करें: +91 8233790000',
      },

      // ── FAQ ────────────────────────────────────────────────────────────────────
      {
        section: 'faq',
        faqHeading: 'Frequently Asked Questions',
        faqs: [
          { question: 'IPS BUSINESS SCHOOL JAIPUR affiliated or approved ?', answer: 'Yes, IPS BUSINESS SCHOOL JAIPUR is approved by AICTE New Delhi (Government of India) and affiliated with Rajasthan Technical University (RTU).', order: 0 },
          { question: 'What is the MBA Eligibility Criteria ?', answer: '(10+2+3) for an UGC Recognized University in any Discipline with Minimum 50% Marks in General & 45% Marks for OBC/SC/ST Category', order: 1 },
          { question: 'How can I apply for Admission ?', answer: 'Students can apply: Online through the official website https://www.ipsedu.in, By visiting the campus admission office (8:00 AM to 4 PM), By filling out the admission form and submitting required documents', order: 2 },
          { question: 'What is the duration of the MBA program ?', answer: 'The MBA program duration is 2 years.', order: 3 },
          { question: 'What documents are required for admission?', answer: 'Generally required documents include: 10th & 12th Mark sheet, Graduation Mark sheet (for PG courses), Transfer Certificate, Migration Certificate & Provisional Certificate, Passport-size photographs, ID Proof (Adhar Crad)', order: 4 },
          { question: 'Scholarships Available ?', answer: 'Yes, scholarships are provided based on: Academic performance, Merit-based criteria, Psychometric Profiling, Government scholarship schemes', order: 5 },
          { question: 'Hostel Facility Available ?', answer: 'Yes, hostel facilities are available at IPS BUSINESS SCHOOL JAIPUR for students.\n\nHostel/PG Facilities\n• Separate hostels for boys and girls.\n• Rooms are available in single, double-sharing, and triple-sharing options.\n• Rooms usually include bed, study table, almirah, and basic furniture.\n\nFacilities available:\n• Wi-Fi internet\n• Mess / food facility\n• 24×7 security\n• Laundry and cleaning services\n• Medical support and recreation areas.', order: 6 },
          { question: 'Where is IPS BUSINESS SCHOOL located ?', answer: 'IPS BUSINESS SCHOOL is located in Jaipur, Rajasthan.', order: 7 },
          { question: 'Where is IPS COLLEGE JAIPUR located ?', answer: 'IPS COLLEGE JAIPUR is located in Jaipur, Rajasthan.', order: 8 },
          { question: 'MBA Internship provided during the course ?', answer: 'Yes, internships are provided to enhance practical knowledge.', order: 9 },
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
          { question: 'What is an MBA and why should I pursue it?', answer: 'An MBA (Master of Business Administration) is a postgraduate program designed to develop leadership, management, and business skills. It helps students build careers in areas like marketing, finance, HR, analytics, and entrepreneurship.', order: 21 },
          { question: 'What are the benefits of doing an MBA?', answer: 'An MBA enhances career opportunities, improves salary potential, builds leadership skills, and provides strong industry exposure through internships and projects.', order: 22 },
          { question: 'Who should pursue an MBA?', answer: 'Graduates from any stream who want to build a career in management, leadership roles, or start their own business should consider an MBA.', order: 23 },
          { question: 'What is the eligibility criteria for MBA admission?', answer: "Candidates must have a bachelor's degree (minimum 50% marks, 45% for reserved categories) from a recognized university.", order: 24 },
          { question: 'Which entrance exams are accepted for MBA admission?', answer: 'Common exams include CAT, MAT, CMAT, XAT, and state-level entrance tests.', order: 25 },
          { question: 'Is work experience required for MBA?', answer: 'No, fresh graduates can apply. However, work experience is an added advantage.', order: 26 },
          { question: 'What is the MBA admission process?', answer: 'The process typically includes entrance exam score, group discussion (GD), personal interview (PI), and academic performance evaluation.', order: 27 },
          { question: 'What are the popular MBA specializations?', answer: 'Marketing, Finance, Human Resource (HR), Business Analytics, International Business, Operations, and Entrepreneurship.', order: 28 },
          { question: 'Which MBA specialization is best?', answer: 'The best specialization depends on your career goals, interests, and industry demand.', order: 29 },
          { question: 'Are scholarships available for MBA students?', answer: 'Yes, many colleges offer merit-based, need-based, and category-based scholarships.', order: 30 },
          { question: 'Is an MBA worth the investment?', answer: 'Yes, if pursued from a good institute with strong placements and industry exposure.', order: 31 },
          { question: 'What are the placement opportunities after MBA?', answer: 'Students get placed in roles like Marketing Manager, Financial Analyst, HR Manager, Business Analyst, and Consultant.', order: 32 },
          { question: 'What is the average salary after MBA?', answer: 'It depends on the college and specialization, typically ranging from ₹4 LPA to ₹12 LPA or higher.', order: 33 },
          { question: 'Which companies hire MBA graduates?', answer: 'Top recruiters include consulting firms, banks, FMCG companies, IT firms, and startups.', order: 34 },
          { question: 'What skills are developed during an MBA?', answer: 'Leadership, communication, analytical thinking, problem-solving, teamwork, and decision-making.', order: 35 },
          { question: 'What is the importance of tools like SPSS in MBA?', answer: 'SPSS helps students analyze data, conduct research, and make data-driven decisions—an essential skill in modern business environments.', order: 36 },
          { question: 'What facilities should a good MBA college provide?', answer: 'Modern classrooms, library, computer labs, Wi-Fi campus, hostel, industry exposure, and placement support.', order: 37 },
          { question: 'Does the college provide internship opportunities?', answer: 'Yes, most MBA programs include mandatory internships for practical exposure.', order: 38 },
          { question: 'How does an MBA college provide industry exposure?', answer: 'Through guest lectures, live projects, internships, industrial visits, and workshops.', order: 39 },
          { question: 'Why is practical learning important in MBA?', answer: 'It bridges the gap between theory and real-world business challenges.', order: 40 },
          { question: 'What are the best MBA colleges in Jaipur?', answer: 'Jaipur offers several reputed MBA colleges known for quality education, experienced faculty, and strong placement support.', order: 41 },
          { question: 'Why choose Jaipur for MBA?', answer: 'Jaipur is an emerging education hub with affordable living, good infrastructure, and growing corporate exposure.', order: 42 },
          { question: 'Which MBA college offers the best placement in Jaipur?', answer: 'Top MBA colleges in Jaipur offer strong placement support with reputed recruiters and competitive salary packages.', order: 43 },
          { question: 'Which MBA college provides the best ROI?', answer: 'Colleges with moderate fees and strong placement records offer the best return on investment.', order: 44 },
          { question: 'What makes a top MBA college stand out?', answer: 'Strong faculty, industry connections, placement record, practical learning, and modern curriculum.', order: 45 },
        ],
      },

      // ── Sidebar ────────────────────────────────────────────────────────────────
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
        const existing = await MBAPageContent.findOne({ section });
        if (existing) {
          results.push({ section, status: 'skipped' });
          continue;
        }
      }

      await MBAPageContent.findOneAndUpdate(
        { section },
        { $set: sectionData },
        { upsert: true, new: true, runValidators: true }
      );
      results.push({ section, status: force ? 'overwritten' : 'seeded' });
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error('[MBA-CONTENT SEED]', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Seed failed' },
      { status: 500 }
    );
  }
}
