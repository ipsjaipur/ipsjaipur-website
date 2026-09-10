import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BCAPageContent from '@/models/BCAPageContent';
import { getAuthFromCookies } from '@/lib/auth';

/**
 * POST /api/bca-content/seed
 * Admin-protected. Inserts current BCA static data as initial DB content.
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
          { src: `${imgBase}images/courses/bca-image-1.webp`, alt: 'BCA Program - IPS Business School', priority: true,  order: 0 },
          { src: `${imgBase}images/courses/bca-image-2.webp`, alt: 'BCA Program - IPS Business School', priority: false, order: 1 },
          { src: `${imgBase}images/courses/bca-image-4.webp`, alt: 'BCA Program - IPS Business School', priority: false, order: 2 },
          { src: `${imgBase}images/courses/bca-image-3.webp`, alt: 'BCA Program - IPS Business School', priority: false, order: 3 },
        ],
      },

      // ── Overview ───────────────────────────────────────────────────────────────
      {
        section: 'overview',
        overviewTitle:    'Bachelor of Computer Applications (BCA)',
        overviewDuration: '3 Years',
        overviewCaption:  '(Approved by AICTE New Delhi, Government of India)',
        rtuLogoUrl:       `${imgBase}images/home/rtu.webp`,
        aicteLogoUrl:     `${imgBase}images/home/aicte.webp`,
        approvalImageUrl: '',
        approvalImageCaption: '(Approved by AICTE New Delhi - Govt of INDIA)',
        highlightsHeading: 'BCA HIGHLIGHTS:',
        highlights: [
          { iconName: 'CheckCircle2', text: 'Approved by AICTE New Delhi, Government of India',                                                                                                                          hindiText: 'एआईसीटीई, नई दिल्ली द्वारा अनुमोदित – भारत सरकार',                                                                                                                           order: 0  },
          { iconName: 'GraduationCap', text: 'Affiliated with Rajasthan Technical University.',                                                                                                                          hindiText: 'राजस्थान तकनीकी विश्वविद्यालय से संबद्ध।',                                                                                                                                    order: 1  },
          { iconName: 'Building2',     text: 'Campus situated in the Heart of Jaipur City.',                                                                                                                             hindiText: 'जयपुर शहर के मध्य स्थित परिसर।',                                                                                                                                              order: 2  },
          { iconName: 'Bot',           text: 'Additional Artificial Intelligence / Machine Learning Course. (Level 1) (Level 2) (Level 3) (Level 4) (Level 5) (Level 6)',                                                hindiText: 'अतिरिक्त आर्टिफिशियल इंटेलिजेंस / मशीन लर्निंग कोर्स। (लेवल 1) (लेवल 2) (लेवल 3) (लेवल 4) (लेवल 5) (लेवल 6)',                                                              order: 3  },
          { iconName: 'TrendingUp',    text: 'Additional Data Analytics Course. (Level 1) (Level 2) (Level 3) (Level 4) (Level 5) (Level 6)',                                                                           hindiText: 'अतिरिक्त डेटा एनालिटिक्स कोर्स। (लेवल 1) (लेवल 2) (लेवल 3) (लेवल 4) (लेवल 5) (लेवल 6)',                                                                                     order: 4  },
          { iconName: 'Megaphone',     text: 'Additional Digital Marketing Course. (Level 1) (Level 2) (Level 3) (Level 4) (Level 5) (Level 6)',                                                                        hindiText: 'अतिरिक्त डिजिटल मार्केटिंग कोर्स। (लेवल 1) (लेवल 2) (लेवल 3) (लेवल 4) (लेवल 5) (लेवल 6)',                                                                                  order: 5  },
          { iconName: 'Cloud',         text: 'Additional Cloud Computing Course.',                                                                                                                                       hindiText: 'अतिरिक्त क्लाउड कंप्यूटिंग कोर्स।',                                                                                                                                          order: 6  },
          { iconName: 'Factory',       text: 'Live Industry Projects.',                                                                                                                                                  hindiText: 'लाइव इंडस्ट्री प्रोजेक्ट्स।',                                                                                                                                                 order: 7  },
          { iconName: 'Globe',         text: '3 Months International Trainings & Exchange Program (Sponsored / Optional)*.',                                                                                             hindiText: '3 माह का अंतरराष्ट्रीय प्रशिक्षण एवं एक्सचेंज प्रोग्राम (स्पॉन्सर्ड / वैकल्पिक)*।',                                                                                         order: 8  },
          { iconName: 'Building2',     text: 'AC Classrooms.',                                                                                                                                                           hindiText: 'एसी युक्त कक्षाएँ।',                                                                                                                                                          order: 9  },
          { iconName: 'Trophy',        text: 'Best Placements.',                                                                                                                                                         hindiText: 'सर्वश्रेष्ठ प्लेसमेंट।',                                                                                                                                                      order: 10 },
          { iconName: 'DollarSign',    text: 'Affordable Fee Structure.',                                                                                                                                                hindiText: 'किफायती शुल्क संरचना।',                                                                                                                                                       order: 11 },
          { iconName: 'MessageSquare', text: 'Communications & Soft Skills Classes.',                                                                                                                                    hindiText: 'संचार एवं सॉफ्ट स्किल्स कक्षाएँ।',                                                                                                                                           order: 12 },
          { iconName: 'Lightbulb',     text: 'Developing Excellence by Studies and Practice Methodology.',                                                                                                               hindiText: 'अध्ययन एवं अभ्यास पद्धति द्वारा उत्कृष्टता का विकास।',                                                                                                                       order: 13 },
          { iconName: 'Briefcase',     text: 'Corporate Exposure throughout the course.',                                                                                                                                hindiText: 'पूरे कोर्स के दौरान कॉर्पोरेट एक्सपोजर।',                                                                                                                                   order: 14 },
          { iconName: 'BookOpen',      text: 'Industry Interfaced - Strong Curriculum.',                                                                                                                                 hindiText: 'इंडस्ट्री इंटरफेस्ड - मजबूत पाठ्यक्रम।',                                                                                                                                     order: 15 },
          { iconName: 'Dumbbell',      text: 'Excellent Indoor / Outdoor Sports and Recreational Activities.',                                                                                                           hindiText: 'उत्कृष्ट इनडोर / आउटडोर खेल एवं मनोरंजन गतिविधियाँ।',                                                                                                                        order: 16 },
        ],
        descriptionParagraphs: [
          'IPS has launched a 3-year BCA course for ambitious school students who want to do things differently, so IPS provided opportunities to those students through this particular course. They can enrich their minds with the genius faculty at our <b>BCA college in Jaipur.</b> By doing this course, they can get the light of the corporate world on what should be done and how it should be done. They develop strategic as well as analytical skills. As they are young minds, by doing this course, they get to know the path and become focused. IPS launched this course with the motive of developing young minds, as they are the future of the country, and gives them the light to analyze and create a difference in the world by making things differently, as IPS believes in thinking beyond the boundaries.',
        ],
        whyIpsHeading: 'Why IPS Business School is Recognized as the Best BCA College in Jaipur',
        whyIpsIntro:   'In a landscape where most institutes claim to be the "top BCA college in Jaipur," it takes a powerful stance to assert the same by any college. However, IPS Business School has precisely what it requires to stand out proudly among the crowd. Here is what makes IPS the best:',
        whyIpsPoints: [
          "<b>Technical Education Expertise:</b> IPS experts' 18+ years of experience in providing technically sound knowledge will provide you with the skills you need to succeed in the top roles.",
          '<b>Outstanding Placements & Internships:</b> IPS students have been performing extraordinarily in their placement and internship statistics. It has a strong track record of successfully placing all its competent students in diverse roles across multiple industries.',
          "<b>Affordability:</b> IPS isn't one of those business schools that offer mediocre quality education at irrationally high fees. IPS is the epitome of the best <b>BCA college in Rajasthan,</b> offering top-tier education at fees affordable by most students.",
        ],
      },

      // ── Syllabus ───────────────────────────────────────────────────────────────
      {
        section: 'syllabus',
        syllabusHeading: 'SYLLABUS:',
        syllabusItems: [
          { name: 'BCA 3rd Year RTU Syllabus', pdfFile: `${imgBase}images/courses/BCA_RTU_Syllbus_2024.pdf`, order: 0 },
          { name: 'BCA RTU Syllabus',          pdfFile: `${imgBase}images/courses/bcasyllabusru.pdf`,        order: 1 },
        ],
      },

      // ── Specializations + Eligibility ──────────────────────────────────────────
      {
        section: 'specializations',
        specializationsHeading: 'SPECIALIZATIONS AVAILABLE:',
        specializations: [
          { name: 'Data Science',        order: 0 },
          { name: 'Artificial Intelligence', order: 1 },
          { name: 'Cyber Security',      order: 2 },
          { name: 'Cloud Computing',     order: 3 },
        ],
        eligibilityHeading: 'Eligibility:',
        eligibilityPoints: [
          { text: '10 + 2 in any discipline with minimum 45% marks in General & 40% marks for OBC / SC / ST category.', order: 0 },
          { text: 'Selection is based on Academic Record (Overall) & Personal Interview.',                               order: 1 },
        ],
        eligibilityPriorities: [],
      },

      // ── Admission Process ──────────────────────────────────────────────────────
      {
        section: 'admissionProcess',
        admissionHeading: 'How to Apply:',
        admissionIntro: '',
        admissionSteps: [
          { label: 'Online',  description: 'Application form can also be filled & submitted online on our website along with online payment of Rs. 900/-.', linkText: 'Click Here to Apply Online', linkHref: '#', order: 0 },
          { label: 'Offline', description: 'Application form can be purchased from IPS Campus on cash payment of Rs. 900/- & submit the same duly filled in with requisite documents.', linkText: '', linkHref: '', order: 1 },
        ],
      },

      // ── Documents Required ─────────────────────────────────────────────────────
      {
        section: 'documentsRequired',
        documentsHeading: 'Documents Required:',
        documents: [
          { text: 'Complete Application Form (Filled Online / Offline)',                                                  isBold: true,  order: 0 },
          { text: 'Aadhar Card Copy for Domestic Students / Passport Copy for International Students',                    isBold: true,  order: 1 },
          { text: 'Marksheets (Original + Two Set of Photocopies)',                                                        isBold: false, order: 2 },
          { text: '10th Marksheet',                                                                                        isBold: false, order: 3 },
          { text: '12th Marksheet',                                                                                        isBold: false, order: 4 },
          { text: 'DOB Certificate',                                                                                        isBold: false, order: 5 },
          { text: 'Transfer Certificate (TC). + Original Migration Certificate',                                           isBold: false, order: 6 },
          { text: 'Passport Size Photographs – 4',                                                                         isBold: false, order: 7 },
          { text: 'Anti Ragging Declaration (On Rs. 50/- Stamp Paper)',                                                    isBold: false, order: 8 },
        ],
      },

      // ── Selection Procedure ────────────────────────────────────────────────────
      {
        section: 'selectionProcedure',
        selectionHeading: 'Selection Procedure:',
        selectionSteps: [
          { stepLabel: 'Step 1', description: 'Filling up the Admission Form. (Online / Offline)',             order: 0 },
          { stepLabel: 'Step 2', description: 'Submission of Form with Documents.',                            order: 1 },
          { stepLabel: 'Step 3', description: 'Confirmation of the Registration after Fee Submission',         order: 2 },
        ],
      },

      // ── Fee Structure ──────────────────────────────────────────────────────────
      {
        section: 'feeStructure',
        feeHeading:     'Fee Structure of BCA',
        feeEnglishText: 'Scholarship is Available on the basis of Academic Performance & Psycho Matrix Test for Details Contact : +91 8233790000',
        feeHindiText:   'छात्रवृत्ति शैक्षणिक प्रदर्शन एवं साइको मैट्रिक्स टेस्ट के आधार पर उपलब्ध है। अधिक जानकारी के लिए संपर्क करें: +91 8233790000',
      },

      // ── FAQ ────────────────────────────────────────────────────────────────────
      {
        section: 'faq',
        faqHeading: 'Frequently Asked Questions',
        faqs: [
          { question: 'IPS BUSINESS SCHOOL JAIPUR affiliated or approved ?',         answer: 'Yes, IPS BUSINESS SCHOOL JAIPUR is approved by AICTE New Delhi (Government of India) and affiliated with Rajasthan Technical University (RTU).',                                                                                                                                                                  order: 0  },
          { question: 'What documents are required for admission ?',                  answer: '10th & 12th Mark sheet, Transfer Certificate, Migration Certificate & Provisional Certificate, Passport-size photographs, ID Proof (Aadhar Card).',                                                                                                                                                                 order: 1  },
          { question: 'How can I apply for Admission ?',                              answer: 'Students can apply online through the official website, by visiting the campus admission office (8:00 AM to 4 PM), or by submitting the admission form with required documents.',                                                                                                                                    order: 2  },
          { question: 'What is the duration of the BCA program ?',                    answer: 'The BCA program duration is 3 years.',                                                                                                                                                                                                                                                                              order: 3  },
          { question: 'Scholarships Available ?',                                     answer: 'Yes, scholarships are provided based on academic performance, merit-based criteria, psychometric profiling, and government scholarship schemes.',                                                                                                                                                                    order: 4  },
          { question: 'Hostel Facility Available ?',                                  answer: 'Yes, separate hostels for boys and girls are available with Wi-Fi, mess facility, 24×7 security, laundry, medical support, and recreation areas.',                                                                                                                                                                  order: 5  },
          { question: 'Where is IPS BUSINESS SCHOOL located ?',                       answer: 'IPS BUSINESS SCHOOL is located in Jaipur, Rajasthan.',                                                                                                                                                                                                                                                             order: 6  },
          { question: 'Where is IPS COLLEGE JAIPUR located ?',                        answer: 'IPS COLLEGE JAIPUR is located in Jaipur, Rajasthan.',                                                                                                                                                                                                                                                              order: 7  },
          { question: 'BCA Internship provided during the course ?',                  answer: 'Yes, internships are provided to enhance practical knowledge and industry exposure.',                                                                                                                                                                                                                               order: 8  },
          { question: 'Education Loan Facility Available ?',                          answer: 'Yes, IPS helps students obtain education loans from banks for course fees, hostel fees, and other educational expenses.',                                                                                                                                                                                           order: 9  },
          { question: 'IPS have modern infrastructure ?',                             answer: 'Yes, the campus has air-conditioned classrooms, digital smart boards, computer labs, and advanced learning facilities.',                                                                                                                                                                                            order: 10 },
          { question: 'Attendance Compulsory ?',                                      answer: 'Yes, students must maintain at least 75% attendance as per university norms.',                                                                                                                                                                                                                                      order: 11 },
          { question: 'How is attendance monitored ?',                                answer: 'Attendance is recorded regularly and parents are informed in case of shortage as per university rules.',                                                                                                                                                                                                            order: 12 },
          { question: 'Industry Exposure?',                                           answer: 'Yes, students get industry exposure through seminars and workshops.',                                                                                                                                                                                                                                               order: 13 },
          { question: 'Experienced Faculty members available ?',                      answer: 'Yes, IPS has highly qualified and experienced faculty.',                                                                                                                                                                                                                                                            order: 14 },
          { question: 'Campus Life events and activities ?',                          answer: 'Yes, various academic and cultural events are organized regularly.',                                                                                                                                                                                                                                                order: 15 },
          { question: 'Transport Facility Available?',                                answer: 'Yes, transport facilities are available for students.',                                                                                                                                                                                                                                                             order: 16 },
          { question: 'IPS support Startups?',                                        answer: 'Yes, IPS encourages entrepreneurship and startup initiatives.',                                                                                                                                                                                                                                                    order: 17 },
          { question: 'Labs available for Practical Learning?',                       answer: 'Yes, well-equipped labs are available for students.',                                                                                                                                                                                                                                                               order: 18 },
          { question: 'What are the College timings?',                                answer: 'Academic sessions and technical training are conducted from 8:00 AM to 1:00 PM initially. Once students start internships and live projects, timings are from 8:00 AM to 11:30 AM.',                                                                                                                                order: 19 },
          { question: 'What is a BCA course?',                                        answer: 'BCA (Bachelor of Computer Applications) is an undergraduate program focused on computer science, software development, and IT skills.',                                                                                                                                                                             order: 20 },
          { question: 'Why should I choose BCA after 12th?',                          answer: 'BCA is ideal for students interested in computers, programming, software development, and building a career in the IT industry.',                                                                                                                                                                                   order: 21 },
          { question: 'Who should pursue a BCA degree?',                              answer: 'Students from any stream with an interest in computers, programming, and technology can pursue BCA.',                                                                                                                                                                                                               order: 22 },
          { question: 'What is the eligibility for BCA admission?',                   answer: 'Candidates must have completed 10+2 from a recognized board, usually with a minimum of 45%–50% marks.',                                                                                                                                                                                                            order: 23 },
          { question: 'Is there any entrance exam for BCA?',                          answer: 'Some colleges conduct entrance exams, while many offer direct admission based on merit.',                                                                                                                                                                                                                           order: 24 },
          { question: 'What subjects are taught in BCA?',                             answer: 'Subjects include Programming Languages, Data Structures, Database Management Systems, Web Development, Networking, and Software Engineering.',                                                                                                                                                                      order: 25 },
          { question: 'Are there specializations in BCA?',                            answer: 'Yes, specializations include Data Science, Artificial Intelligence, Cyber Security, and Cloud Computing.',                                                                                                                                                                                                         order: 26 },
          { question: 'What are career options after BCA?',                           answer: 'Graduates can work as Software Developers, Web Developers, System Analysts, Data Analysts, or IT Support Specialists.',                                                                                                                                                                                            order: 27 },
          { question: 'What is the salary after BCA?',                                answer: 'The average starting salary ranges from ₹3 LPA to ₹8 LPA depending on skills and experience.',                                                                                                                                                                                                                    order: 28 },
          { question: 'Can I do MCA after BCA?',                                      answer: 'Yes, MCA (Master of Computer Applications) is a popular higher education option after BCA.',                                                                                                                                                                                                                       order: 29 },
          { question: 'Does BCA provide placement opportunities?',                    answer: 'Yes, most colleges offer placement assistance with IT companies, startups, and software firms.',                                                                                                                                                                                                                    order: 30 },
          { question: 'Are internships included in BCA?',                             answer: 'Yes, internships are often part of the curriculum to provide practical industry exposure.',                                                                                                                                                                                                                         order: 31 },
          { question: 'What skills will I gain in a BCA program?',                    answer: 'Programming, problem-solving, analytical thinking, communication, and technical skills.',                                                                                                                                                                                                                           order: 32 },
          { question: 'Is BCA good for a career in IT?',                              answer: 'Yes, BCA provides a strong foundation for careers in software development, data analysis, and IT services.',                                                                                                                                                                                                       order: 33 },
          { question: 'What facilities should a good BCA college offer?',             answer: 'Modern computer labs, high-speed internet, experienced faculty, library, and placement support.',                                                                                                                                                                                                                   order: 34 },
          { question: 'Does BCA include practical learning?',                         answer: 'Yes, through coding projects, lab work, internships, and real-world applications.',                                                                                                                                                                                                                                order: 35 },
          { question: 'How does a BCA college provide industry exposure?',            answer: 'Through workshops, coding competitions, internships, guest lectures, and live projects.',                                                                                                                                                                                                                          order: 36 },
          { question: 'What are the best BCA colleges in Jaipur?',                    answer: 'Jaipur has many reputed BCA colleges offering quality education, modern infrastructure, and good placement support.',                                                                                                                                                                                               order: 37 },
          { question: 'Why choose Jaipur for BCA?',                                   answer: 'Jaipur is growing as an education and IT hub with affordable living and increasing job opportunities.',                                                                                                                                                                                                            order: 38 },
          { question: 'Which BCA college offers the best placement in Jaipur?',       answer: 'Top BCA colleges in Jaipur provide strong placement support with IT companies and competitive salary packages.',                                                                                                                                                                                                    order: 39 },
          { question: 'Which BCA college has the best ROI?',                          answer: 'Colleges with strong placement records and quality education offer the best return on investment.',                                                                                                                                                                                                                 order: 40 },
          { question: 'Is BCA a good career option in 2026?',                         answer: 'Yes, BCA is a great career option due to increasing demand for IT professionals in software, AI, and data fields.',                                                                                                                                                                                                order: 41 },
          { question: 'What makes a top BCA college stand out?',                      answer: 'Experienced faculty, updated curriculum, industry exposure, placement support, and modern labs.',                                                                                                                                                                                                                  order: 42 },
          { question: 'Can BCA students work in multinational companies?',            answer: 'Yes, many multinational IT companies hire BCA graduates for roles in development, support, and analysis.',                                                                                                                                                                                                         order: 43 },
          { question: 'Is BCA better than B.Sc Computer Science?',                   answer: 'BCA is more application and industry-focused, while B.Sc Computer Science is more theoretical and research-oriented.',                                                                                                                                                                                             order: 44 },
          { question: 'What is the future scope after BCA?',                          answer: 'Students can pursue MCA, MBA (IT), or specialize in Data Science, AI, Cyber Security, and Cloud Computing.',                                                                                                                                                                                                      order: 45 },
        ],
      },

      // ── Sidebar ────────────────────────────────────────────────────────────────
      {
        section: 'sidebar',
        sidebarVideos: [
          { url: 'https://www.youtube.com/embed/zzViqdibpv8?si=qoZEHHiu8GQMngPZ', title: '', order: 0 },
        ],
      },
    ];

    const results = [];
    for (const sectionData of sections) {
      const { section } = sectionData;

      if (!force) {
        const existing = await BCAPageContent.findOne({ section });
        if (existing) {
          results.push({ section, status: 'skipped' });
          continue;
        }
      }

      await BCAPageContent.findOneAndUpdate(
        { section },
        { $set: sectionData },
        { upsert: true, new: true, runValidators: true }
      );
      results.push({ section, status: force ? 'overwritten' : 'seeded' });
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error('[BCA-CONTENT SEED]', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Seed failed' },
      { status: 500 }
    );
  }
}
