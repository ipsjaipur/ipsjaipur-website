'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  School,
  GraduationCap,
  Briefcase,
  Bot,
  TrendingUp,
  Megaphone,
  Globe,
  Trophy,
  Users,
  Building2,
  Network,
  MessageSquare,
  Factory,
  DollarSign,
  BookOpen,
  Dumbbell,
  Lightbulb,
  Handshake,
  ChevronDown,
} from 'lucide-react';
import CourseNavigation from '../CourseNavigation';
import CourseQuickLinks from '../CourseQuickLinks';
import Image from 'next/image';

export default function BBACourseDetail() {
  const [openFAQ, setOpenFAQ] = useState(0);

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'highlights', label: 'Highlights' },
    { id: 'syllabus', label: 'Syllabus' },
    { id: 'eligibility', label: 'Eligibility' },
    { id: 'admission-process', label: 'Admission Process' },
    { id: 'documents-required', label: 'Documents Required' },
    { id: 'selection-procedure', label: 'Selection Procedure' },
    { id: 'fee-structure', label: 'Fee Structure' },
  ];

  const highlights = [
    {
      icon: CheckCircle2,
      text: 'Approved by AICTE New Delhi, Government of India',
      hindiText: 'एआईसीटीई, नई दिल्ली द्वारा अनुमोदित – भारत सरकार',
    },
    {
      icon: GraduationCap,
      text: 'Affiliated with Rajasthan Technical University.',
      hindiText: 'राजस्थान तकनीकी विश्वविद्यालय से संबद्ध।',
    },
    {
      icon: Briefcase,
      text: "BBA Degree with Work Experience (with Regular On Job Training's - OJT's & Live Projects).",
      hindiText: "कार्य अनुभव के साथ बीबीए डिग्री (नियमित ऑन जॉब ट्रेनिंग - OJT's एवं लाइव प्रोजेक्ट्स के साथ)।",
    },
    {
      icon: Bot,
      text: (
        <>
          Additional Artificial Intelligence / Machine Learning Course.{' '}
          <span className="text-[10px]">(Level 1) (Level 2) (Level 3) (Level 4) (Level 5) (Level 6)</span>
        </>
      ),
      hindiText: (
        <>
          अतिरिक्त आर्टिफिशियल इंटेलिजेंस / मशीन लर्निंग कोर्स।{' '}
          <span className="text-[10px]">(लेवल 1) (लेवल 2) (लेवल 3) (लेवल 4) (लेवल 5) (लेवल 6)</span>
        </>
      ),
    },
    {
      icon: TrendingUp,
      text: (
        <>
          Additional Business Analytics Course.{' '}
          <span className="text-[10px]">(Level 1) (Level 2) (Level 3) (Level 4) (Level 5) (Level 6)</span>
        </>
      ),
      hindiText: (
        <>
          अतिरिक्त बिजनेस एनालिटिक्स कोर्स।{' '}
          <span className="text-[10px]">(लेवल 1) (लेवल 2) (लेवल 3) (लेवल 4) (लेवल 5) (लेवल 6)</span>
        </>
      ),
    },
    {
      icon: Megaphone,
      text: (
        <>
          Additional Digital Marketing Course.{' '}
          <span className="text-[10px]">(Level 1) (Level 2) (Level 3) (Level 4) (Level 5) (Level 6)</span>
        </>
      ),
      hindiText: (
        <>
          अतिरिक्त डिजिटल मार्केटिंग कोर्स।{' '}
          <span className="text-[10px]">(लेवल 1) (लेवल 2) (लेवल 3) (लेवल 4) (लेवल 5) (लेवल 6)</span>
        </>
      ),
    },
    {
      icon: Globe,
      text: '3 Months International, Trainings & Exchange Program (Sponsored / Optional)*.',
      hindiText: '3 माह का अंतरराष्ट्रीय प्रशिक्षण एवं एक्सचेंज प्रोग्राम (स्पॉन्सर्ड / वैकल्पिक)*।',
    },
    {
      icon: Trophy,
      text: 'Best Placements.',
      hindiText: 'सर्वश्रेष्ठ प्लेसमेंट।',
    },
    {
      icon: BookOpen,
      text: 'Advanced Excel Course.',
      hindiText: 'एडवांस्ड एक्सेल कोर्स।',
    },
    {
      icon: Building2,
      text: 'AC Classrooms.',
      hindiText: 'एसी युक्त कक्षाएँ।',
    },
    {
      icon: CheckCircle2,
      text: 'Industry Specialised Certifications.',
      hindiText: 'उद्योग विशेष प्रमाणपत्र।',
    },
    {
      icon: DollarSign,
      text: 'Affordable Fee Structure.',
      hindiText: 'किफायती शुल्क संरचना।',
    },
    {
      icon: Lightbulb,
      text: 'Developing Excellence by Studies and Practice Methodology.',
      hindiText: 'अध्ययन एवं अभ्यास पद्धति द्वारा उत्कृष्टता का विकास।',
    },
    {
      icon: Briefcase,
      text: 'Corporate Exposure throughout the course.',
      hindiText: 'पूरे कोर्स के दौरान कॉर्पोरेट एक्सपोजर।',
    },
    {
      icon: Users,
      text: 'The Best & Most Experienced Team of Mentors & Faculty Members including Corporate Consultants, Chartered Accountants (CA), Company Secretries (CS), Ph.D. Scholars, Industry Leaders, Research Guides & Subjective Book Authors.',
      hindiText:
        'कॉर्पोरेट कंसल्टेंट्स, चार्टर्ड अकाउंटेंट्स (CA), कंपनी सेक्रेटरीज (CS), पीएचडी स्कॉलर्स, इंडस्ट्री लीडर्स, रिसर्च गाइड्स एवं विषय विशेषज्ञ लेखकों सहित अनुभवी टीम।',
    },
    {
      icon: MessageSquare,
      text: 'Soft Skills / Communication Classes.',
      hindiText: 'सॉफ्ट स्किल्स / संचार कक्षाएँ।',
    },
    {
      icon: BookOpen,
      text: 'Industry Specific & Strong Curriculum.',
      hindiText: 'उद्योग आधारित एवं मजबूत पाठ्यक्रम।',
    },
    {
      icon: Dumbbell,
      text: 'Excellent Indoor / Outdoor Sports and Recreational Activities.',
      hindiText: 'उत्कृष्ट इनडोर / आउटडोर खेल एवं मनोरंजन गतिविधियाँ।',
    },
    {
      icon: Lightbulb,
      text: 'Emphasis on ability creation rather than just knowledge accumulation.',
      hindiText: 'केवल ज्ञान संचय के बजाय क्षमता विकास पर जोर।',
    },
    {
      icon: Handshake,
      text: 'Strong Corporate Linkages.',
      hindiText: 'मजबूत कॉर्पोरेट संबंध।',
    },
  ];

  const faqs = [
    {
      question: 'IPS BUSINESS SCHOOL JAIPUR affiliated or approved ?',
      answer:
        'Yes, IPS BUSINESS SCHOOL JAIPUR is approved by AICTE New Delhi (Government of India) and affiliated with Rajasthan Technical University (RTU).',
    },
    {
      question: 'What is the BBA Eligibility Criteria ?',
      answer:
        'Students who have completed their 10+2 graduation from a UGC-affiliated university with a minimum of 50% marks for General, 45% for OBC, 40% for SC/ST are eligible to apply for the BBA program.',
    },
    {
      question: 'How can I apply for Admission ?',
      answer:
        'Students can apply: Online through the official website https://www.ipsedu.in, By visiting the campus admission office (8:00 AM to 4 PM), By filling out the admission form and submitting required documents',
    },
    {
      question: 'What is the duration of the BBA program ?',
      answer: 'The BBA program duration is 3 years.',
    },
    {
      question: 'What documents are required for admission?',
      answer:
        'Generally required documents include: 10th & 12th Mark sheet, Transfer Certificate, Migration Certificate & Provisional Certificate, Passport-size photographs, ID Proof (Adhar Crad)',
    },
    {
      question: 'Scholarships Available ?',
      answer:
        'Yes, scholarships are provided based on: Academic performance, Merit-based criteria, Psychometric Profiling, Government scholarship schemes',
    },
    {
      question: 'Hostel Facility Available ?',
      answer:
        'Yes, hostel facilities are available at IPS BUSINESS SCHOOL JAIPUR for students.\n\nHostel/PG Facilities\n• Separate hostels for boys and girls.\n• Rooms are available in single, double-sharing, and triple-sharing options.\n• Rooms usually include bed, study table, almirah, and basic furniture.\n\nFacilities available:\n• Wi-Fi internet\n• Mess / food facility\n• 24×7 security\n• Laundry and cleaning services\n• Medical support and recreation areas.',
    },
    {
      question: 'Where is IPS BUSINESS SCHOOL located ?',
      answer: 'IPS BUSINESS SCHOOL is located in Jaipur, Rajasthan.',
    },
    {
      question: 'Where is IPS COLLEGE JAIPUR located ?',
      answer: 'IPS COLLEGE JAIPUR is located in Jaipur, Rajasthan.',
    },
    {
      question: 'BBA Internship provided during the course ?',
      answer: 'Yes, internships are provided to enhance practical knowledge.',
    },
    {
      question: 'Education Loan Facility Available ?',
      answer:
        'Yes, education loan facility is available at IPS Business School Jaipur (IPS College). However, the college itself does not directly give the loan. Instead, it helps students get education loans from banks.\n\nLoans can cover:\n• Course fees\n• Hostel fees\n• Other education expenses',
    },
    {
      question: 'IPS have modern infrastructure ?',
      answer:
        'Yes, the campus is equipped with modern infrastructure including fully air-conditioned classrooms, digital smart boards, well-equipped computer labs, and advanced learning facilities to provide a comfortable and technology-driven environment for students.',
    },
    {
      question: 'Attendance Compulsory ?',
      answer:
        'Yes, students must maintain the minimum 75% attendance as per university norms to appear in examinations.',
    },
    {
      question: 'How is attendance monitored ?',
      answer:
        'Attendance is recorded regularly, and parents are informed through letters, and phone calls if there is a shortage as per university rules.',
    },
    {
      question: 'Industry Exposure?',
      answer: 'Yes, students get industry exposure through seminars and workshops.',
    },
    {
      question: 'Experienced Faculty members available ?',
      answer: 'Yes, IPS has highly qualified and experienced faculty.',
    },
    {
      question: 'Campus Life events and activities ?',
      answer: 'Yes, various academic and cultural events are organized regularly.',
    },
    {
      question: 'Transport Facility Available?',
      answer: 'Yes, transport facilities are available for students.',
    },
    {
      question: 'IPS support Startups?',
      answer: 'Yes, IPS encourages entrepreneurship and startup initiatives.',
    },
    {
      question: 'Labs available for Practical Learning?',
      answer: 'Yes, well-equipped labs are available for students.',
    },
    {
      question: 'What are the College timings?',
      answer:
        'College timings are structured to ensure academic efficiency while allowing students time for self-study, internship and live projects along with extracurricular activities. Academic sessions and Technical Trainings are conducted from 8:00 AM to 1:00 PM initially and once students start their respective internships/live projects, the sessions start at 8:00 AM and folds up at 11:30 AM.',
    },
    {
      question: 'What is a BBA course?',
      answer:
        'A BBA (Bachelor of Business Administration) is an undergraduate program that focuses on business management, leadership, and entrepreneurial skills.',
    },
    {
      question: 'Why should I choose BBA after 12th?',
      answer:
        'BBA is ideal for students who want to build a career in business, management, marketing, finance, or start their own venture.',
    },
    {
      question: 'Who should pursue a BBA degree?',
      answer:
        'Students from any stream (Commerce, Science, or Arts) who are interested in business and management can pursue BBA.',
    },
    {
      question: 'What is the eligibility for BBA admission?',
      answer: 'Candidates must have completed 10+2 from a recognized board, usually with a minimum of 45%–50% marks.',
    },
    {
      question: 'Is there any entrance exam for BBA?',
      answer: 'Some colleges conduct entrance exams, while many offer direct admission based on merit.',
    },
    {
      question: 'What is the admission process for BBA?',
      answer:
        'The process includes application submission, merit or entrance exam evaluation, and sometimes a personal interview.',
    },
    {
      question: 'What is the duration of a BBA course?',
      answer: 'The BBA program is typically a 3-year undergraduate degree divided into 6 semesters.',
    },
    {
      question: 'What subjects are taught in BBA?',
      answer:
        'Subjects include Marketing, Finance, Human Resource Management, Business Law, Economics, and Entrepreneurship.',
    },
    {
      question: 'Are there specializations in BBA?',
      answer:
        'Yes, popular specializations include Marketing, Finance, HR, Business Analytics, and International Business.',
    },
    {
      question: 'What are career options after BBA?',
      answer:
        'Graduates can work as Marketing Executives, Business Analysts, HR Executives, Sales Managers, or pursue higher studies.',
    },
    {
      question: 'What is the salary after BBA?',
      answer: 'The average starting salary ranges from ₹2.5 LPA to ₹6 LPA, depending on skills and college reputation.',
    },
    {
      question: 'Can I do MBA after BBA?',
      answer: 'Yes, BBA is one of the best degrees to pursue before an MBA.',
    },
    {
      question: 'Does BBA provide placement opportunities?',
      answer: 'Yes, most colleges offer placement assistance with companies from various industries.',
    },
    {
      question: 'Are internships included in BBA?',
      answer: 'Yes, internships are often a part of the curriculum to provide practical exposure.',
    },
    {
      question: 'What skills will I gain in a BBA program?',
      answer: 'You will develop leadership, communication, problem-solving, analytical, and managerial skills.',
    },
    {
      question: 'Is BBA good for entrepreneurship?',
      answer: 'Yes, BBA provides knowledge of business operations, making it ideal for aspiring entrepreneurs.',
    },
    {
      question: 'What facilities should a good BBA college offer?',
      answer: 'Modern classrooms, computer labs, library, Wi-Fi campus, hostel, and placement support.',
    },
    {
      question: 'Does BBA include practical learning?',
      answer: 'Yes, through case studies, projects, internships, and industrial visits.',
    },
    {
      question: 'How does a BBA college provide industry exposure?',
      answer: 'Through guest lectures, live projects, workshops, seminars, and internships.',
    },
    {
      question: 'What are the best BBA colleges in Jaipur?',
      answer:
        'Jaipur has many reputed BBA colleges offering quality education, experienced faculty, and good placements.',
    },
    {
      question: 'Why choose Jaipur for BBA?',
      answer: 'Jaipur is an emerging education hub with affordable living and growing career opportunities.',
    },
    {
      question: 'Which BBA college offers the best placement in Jaipur?',
      answer:
        'Top BBA colleges in Jaipur provide strong placement support with reputed companies and competitive packages.',
    },
    {
      question: 'Which BBA college has the best ROI?',
      answer: 'Colleges with strong placement records and quality education offer the best return on investment.',
    },
    {
      question: 'Is BBA a good career option in 2026?',
      answer:
        'Yes, BBA remains a strong career choice due to growing demand in management, startups, and corporate sectors.',
    },
    {
      question: 'What makes a top BBA college stand out?',
      answer: 'Experienced faculty, industry exposure, modern curriculum, placement support, and infrastructure.',
    },
    {
      question: 'Can BBA students get jobs in multinational companies?',
      answer: 'Yes, many multinational companies hire BBA graduates for entry-level management roles.',
    },
    {
      question: 'Is BBA better than B.Com?',
      answer: 'BBA focuses more on management and leadership, while B.Com is more finance and accounting-oriented.',
    },
    {
      question: 'What is the future scope after BBA?',
      answer:
        'Students can pursue MBA, PGDM, or other professional courses and build careers in corporate, startups, or entrepreneurship.',
    },
  ];

  return (
    <section className="max-w-[1400px] mx-auto md:px-[16px] w-full md:pt-[24px] pb-[64px]">
      <div className="flex flex-col xl:flex-row gap-6">
        {/* Main Content with Navigation */}
        <motion.div
          className="flex-1 text-[#444444]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <div className="flex flex-col md:flex-row md:gap-6 gap-4">
            <CourseNavigation sections={sections} />
            <div className="border border-[#e9e9e9] bg-white rounded-lg p-6 md:mx-0 mx-[16px]">
              <motion.div initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                {/* Header */}
                <div className="mb-8" id="overview">
                  <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
                    <div className="w-20 h-20 md:w-24 md:h-24 shrink-0">
                      <Image
                        width={100}
                        height={100}
                        src={`${process.env.NEXT_PUBLIC_IMG_PATH}images/home/rtu.webp`}
                        alt="RTU Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="text-center flex-1">
                      <h1 className="text-xl md:text-[22px] font-bold text-black mb-2 font-rubik">
                        Bachelor of Business Administration (BBA)
                      </h1>
                      <p className="lg:text-[16px] text-[14px] font-rubik font-semibold mb-1">
                        Duration: 3 Years (6 Semesters)
                      </p>
                      <p className="text-[10px] font-semibold text-black font-rubik">
                        (Approved by AICTE New Delhi, Government of India)
                      </p>
                    </div>
                    <div className="w-20 h-20 md:w-24 md:h-24 shrink-0">
                      <Image
                        width={100}
                        height={100}
                        src={`${process.env.NEXT_PUBLIC_IMG_PATH}images/home/aicte.webp`}
                        alt="AICTE Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>

                <div id="highlights" className="mb-8">
                  {/* Highlights with Hindi translations */}
                  <div className="mb-8">
                    <h4 className="text-lg font-bold text-gray-800 mb-4 font-rubik">BBA HIGHLIGHTS:</h4>
                    <div className="space-y-3">
                      {highlights.map((highlight, index) => (
                        <div key={index}>
                          <motion.div
                            className="flex gap-3 items-start"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.2, delay: index * 0.01 }}
                          >
                            <highlight.icon className="w-5 h-5 text-[#ffa705] shrink-0 mt-1" />
                            <div className="flex flex-col gap-1">
                              <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik leading-relaxed">
                                {highlight.text}
                              </p>
                              <p className="text-[#666666] text-sm leading-relaxed font-rubik">{highlight.hindiText}</p>
                            </div>
                          </motion.div>
                          {index < highlights.length - 1 && <hr className="my-3 border-gray-200" />}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Description paragraphs */}
                  <div className="space-y-4 mb-8">
                    <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik leading-[1.8]">
                      IPS has launched a 3-year BBA course for ambitious school students who want to do things
                      differently, so IPS provided opportunities to those students through this particular course. They
                      can enrich their minds with our genius faculty. By doing this course, they can get the light of
                      the corporate world on what should be done and how it should be done. They develop strategic as
                      well as analytical skills. As they are young minds, by doing this course, they get to know the
                      path and become focused. IPS launched this course with the motive of developing young minds, as
                      they are the future of the country, and gives them the light to analyze and create a difference in
                      the world by making things differently, as IPS believes in thinking beyond the boundaries. IPS
                      belongs to the IPS Group of Colleges, and with its extensive offerings secures its name in the
                      list of leading <b> BBA colleges in Jaipur.</b>
                    </p>
                    <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik leading-[1.8]">
                      With Executive Diploma in Business Management ( Duration : 2 Years).
                    </p>
                  </div>
                  <div className="space-y-4 mb-8">
                    <h2 className="text-lg font-bold text-gray-800 mb-4 font-rubik">
                      Why IPS Business School is Recognized Among the Best Colleges for BBA in Jaipur
                    </h2>
                    <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik leading-[1.8] mb-1">
                      In a landscape where most institutes claim to be the "best BBA college in Jaipur," it takes a
                      powerful stance to assert the same by any college. However, IPS Business School has precisely what
                      it requires to stand out proudly among the crowd. Here is what makes IPS the best:
                    </p>
                    <ul className="list-disc pl-4 text-[#444444] lg:text-[16px] text-[14px] font-rubik leading-[1.8]">
                      <li>
                        <b>Technical Education Expertise:</b> When it comes to a BBA, technicality can frequently be
                        neglected. However, IPS Business School values it above all else. IPS experts' 18+ years of
                        experience in providing technically sound knowledge will provide you with the skills you need to
                        succeed in the top roles.
                      </li>
                      <li>
                        <b>Outstanding Placements & Internships:</b> IPS Business School is among the top
                        placement-oriented BBA colleges in Jaipur. IPS students have been performing extraordinarily in
                        their placement and internship statistics. It has a strong track record of successfully placing
                        all its competent students in diverse roles across multiple industries.{' '}
                      </li>
                      <li>
                        <b> Affordability:</b> IPS isn't one of those business schools that offer mediocre quality
                        education at irrationally high fees. IPS is the epitome of the{' '}
                        <b> top college for BBA in Jaipur,</b>
                        offering top-tier education at fees affordable by most students.
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Syllabus */}
                <div id="syllabus" className="mb-8">
                  <h4 className="text-lg font-bold text-gray-800 mb-4 font-rubik">SYLLABUS:</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-4 h-4 text-[#ffa705] shrink-0 mt-1" />
                      <a
                        href={`${process.env.NEXT_PUBLIC_IMG_PATH}images/courses/bcasyllabusru.pdf`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#ffa705] hover:underline lg:text-[16px] text-[14px] font-rubik"
                      >
                        BBA 3rd Year RU Syllabus
                      </a>
                    </div>
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-4 h-4 text-[#ffa705] shrink-0 mt-1" />
                      <a
                        href={`${process.env.NEXT_PUBLIC_IMG_PATH}images/courses/BBA_RTU_Syllbus_2024.pdf`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#ffa705] hover:underline lg:text-[16px] text-[14px] font-rubik"
                      >
                        BBA RTU Syllabus
                      </a>
                    </div>
                  </div>
                </div>
                {/* Eligibility Section */}
                <div id="eligibility" className="mb-8">
                  <h4 className="text-lg font-bold text-gray-800 mb-4 font-rubik">Eligibility:</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-4 h-4 text-[#ffa705] shrink-0 mt-1" />
                      <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik leading-relaxed">
                        10 + 2 in any discipline with minimum 45% marks in General & 40% marks for OBC / SC / ST
                        category.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-4 h-4 text-[#ffa705] shrink-0 mt-1" />
                      <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik leading-relaxed">
                        Selection is based on Academic Record (Overall) & Personal Interview.
                      </p>
                    </div>
                  </div>
                </div>

                {/* How to Apply */}
                <div id="admission-process" className="mb-8">
                  <h4 className="text-lg font-bold text-gray-800 mb-4 font-rubik">How to Apply:</h4>
                  <div className="space-y-3">
                    <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik">
                      <strong>Online : </strong>Application form can also be filled & submitted online on our website
                      along with online payment of Rs. 900/-.
                    </p>
                    <p>
                      <a href="#" className="text-blue-600 hover:underline lg:text-[16px] text-[14px] font-rubik">
                        Click Here to Apply Online
                      </a>
                    </p>
                    <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik">
                      <strong>Offline : </strong>Application form can be purchased from IPS Campus on cash payment of
                      Rs. 900/- & submit the same duly filled in with requisite documents.
                    </p>
                  </div>
                </div>

                {/* Documents Required */}
                <div id="documents-required" className="mb-8">
                  <h4 className="text-lg font-bold text-gray-800 mb-4 font-rubik">Documents Required:</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-4 h-4 text-[#ffa705] shrink-0 mt-1" />
                      <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik">
                        <strong>Complete Application Form (Filled Online / Offline)</strong>
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-4 h-4 text-[#ffa705] shrink-0 mt-1" />
                      <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik">
                        <strong>
                          Aadhar Card Copy for Domestic Students / Passport Copy for International Students
                        </strong>
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-4 h-4 text-[#ffa705] shrink-0 mt-1" />
                      <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik">
                        Marksheets (Original + Two Set of Photocopies)
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-4 h-4 text-[#ffa705] shrink-0 mt-1" />
                      <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik">10th Marksheet</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-4 h-4 text-[#ffa705] shrink-0 mt-1" />
                      <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik">12th Marksheet</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-4 h-4 text-[#ffa705] shrink-0 mt-1" />
                      <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik">Transfer Certificate (TC).</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-4 h-4 text-[#ffa705] shrink-0 mt-1" />
                      <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik">
                        Character Certificate (CC).
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-4 h-4 text-[#ffa705] shrink-0 mt-1" />
                      <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik">
                        Migration Certificate (MC).
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-4 h-4 text-[#ffa705] shrink-0 mt-1" />
                      <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik">
                        Passport Size Photographs – 4
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-4 h-4 text-[#ffa705] shrink-0 mt-1" />
                      <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik">
                        Anti Ragging Declaration (On Rs. 50/- Stamp Paper)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Selection Procedure */}
                <div id="selection-procedure" className="mb-8">
                  <h4 className="text-lg font-bold text-gray-800 mb-4 font-rubik">Selection Procedure:</h4>
                  <div className="space-y-2">
                    <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik font-bold">Step 1</p>
                    <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik">
                      Filling up the Admission Form. (Online / Offline). Application form can also be filled & submitted
                      online on our website along with online payment of Rs. 900/-.
                    </p>
                    <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik font-bold">Step 2</p>
                    <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik">
                      Submission of Form with Documents.
                    </p>
                    <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik font-bold">Step 3</p>
                    <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik">
                      Confirmation of the Registration after Fee Submission
                    </p>
                  </div>
                </div>

                {/* Fee Structure */}
                <div id="fee-structure" className="mb-8">
                  <h4 className="text-lg font-bold text-gray-800 mb-4 font-rubik">Fee Structure of BBA</h4>
                  <div className="text-center space-y-3">
                    <h2 className="lg:text-[16px] text-[14px] font-rubik font-bold text-black">
                      Scholarship is Available on the basis of Academic Performance & Psycho Matrix Test for Details
                      Contact : +91 8233790000
                    </h2>
                    <h2 className="lg:text-[16px] text-[14px] font-rubik font-bold text-black">
                      छात्रवृत्ति शैक्षणिक प्रदर्शन एवं साइको मैट्रिक्स टेस्ट के आधार पर उपलब्ध है। अधिक जानकारी के लिए
                      संपर्क करें: +91 8233790000
                    </h2>
                  </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-8">
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <motion.div
                        key={index}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.2, delay: index * 0.01 }}
                      >
                        <button
                          onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                          className="w-full lg:px-6 px-3 py-3 cursor-pointer lg:py-4 text-left font-semibold text-gray-800 bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center lg:text-[16px] text-[14px] font-rubik"
                        >
                          <span>{faq.question}</span>
                          <ChevronDown
                            className={`w-5 h-5 text-[#ffa705] transition-transform duration-300 shrink-0 ml-2 ${
                              openFAQ === index ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {openFAQ === index && (
                          <motion.div
                            className="px-6 py-4 bg-white text-[#444444] lg:text-[14px] text-[14px] font-rubik leading-relaxed"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {faq.answer}
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Sidebar */}
        <CourseQuickLinks
          videoUrls={[
            {
              url: 'https://www.youtube.com/embed/4Xctmx4mlQc?si=uSWDxsgpeNnCn64R',
              title: '',
            },
          ]}
        />
      </div>
    </section>
  );
}
