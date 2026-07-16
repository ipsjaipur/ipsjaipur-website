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

export default function MBACourseDetail() {
  const [openFAQ, setOpenFAQ] = useState(0);

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'syllabus', label: 'Syllabus' },
    // { id: 'highlights', label: 'Highlights' },
    { id: 'specializations', label: 'Specializations' },
    { id: 'admission-process', label: 'Admission Process' },
    { id: 'documents-required', label: 'Documents Required' },
    { id: 'selection-procedure', label: 'Selection Procedure' },
    { id: 'fee-structure', label: 'Fee Structure' },
  ];

  const highlights = [
    {
      icon: CheckCircle2,
      text: 'Approved by AICTE New Delhi - Govt of INDIA.',
      hindiText: 'एआईसीटीई, नई दिल्ली द्वारा अनुमोदित – भारत सरकार',
    },
    {
      icon: School,
      text: 'Affiliated with Rajasthan Technical University (RTU)',
      hindiText: 'राजस्थान तकनीकी विश्वविद्यालय (RTU) से संबद्ध',
    },
    {
      icon: GraduationCap,
      text: 'Master in Business Administration (MBA) Degree with Dual Specialization.',
      hindiText: 'दो विषयों में विशेषज्ञता के साथ मास्टर इन बिजनेस एडमिनिस्ट्रेशन (MBA) डिग्री।',
    },
    {
      icon: Briefcase,
      text: "Realtime Corporate Experience through Regular OJT's (On Job Training) & Live Projects.",
      hindiText: 'नियमित OJT (ऑन जॉब ट्रेनिंग) एवं लाइव प्रोजेक्ट्स के माध्यम से रियलटाइम कॉर्पोरेट अनुभव।',
    },
    {
      icon: Bot,
      text: (
        <>
          Additional Artificial Intelligence / Machine Learning Course. <span className="text-[10px]">(Level 1-4)</span>
        </>
      ),
      hindiText: (
        <>
          अतिरिक्त आर्टिफिशियल इंटेलिजेंस / मशीन लर्निंग कोर्स। <span className="text-[10px]">(लेवल 1-4)</span>
        </>
      ),
    },
    {
      icon: TrendingUp,
      text: (
        <>
          Additional Business Analytics Course. <span className="text-[10px]">(Level 1-4)</span>
        </>
      ),
      hindiText: (
        <>
          अतिरिक्त बिजनेस एनालिटिक्स कोर्स। <span className="text-[10px]">(लेवल 1-4)</span>
        </>
      ),
    },
    {
      icon: Megaphone,
      text: (
        <>
          Additional Digital Marketing Course. <span className="text-[10px]">(Level 1-4)</span>
        </>
      ),
      hindiText: (
        <>
          अतिरिक्त डिजिटल मार्केटिंग कोर्स। <span className="text-[10px]">(लेवल 1-4)</span>
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
      icon: Users,
      text: 'The Best & Most Experienced Team of Mentors & Faculty Members including Corporate Consultants, Chartered Accountants (CA), Company Secretaries (CS), Ph.D. Scholars, Industry Leaders, Research Guides & Subjective Book Authors.',
      hindiText:
        'कॉर्पोरेट कंसल्टेंट्स, चार्टर्ड अकाउंटेंट्स (CA), कंपनी सेक्रेटरीज (CS), पीएचडी स्कॉलर्स, इंडस्ट्री लीडर्स, रिसर्च गाइड्स एवं विषय विशेषज्ञ लेखकों सहित अनुभवी मेंटर्स एवं फैकल्टी की टीम।',
    },
    {
      icon: Building2,
      text: 'AC Classrooms.',
      hindiText: 'एसी युक्त कक्षाएँ।',
    },
    {
      icon: Network,
      text: 'Offering Dual Major Specialization*. (1. Marketing 2. Finance 3. Information Technology 4. Human Resource 5. Business Analytics)',
      hindiText:
        'दो विषयों में विशेषज्ञता प्रदान की जाती है* (1. मार्केटिंग 2. फाइनेंस 3. आईटी 4. मानव संसाधन 5. बिजनेस एनालिटिक्स)',
    },
    {
      icon: MessageSquare,
      text: 'Communication, Employability and Soft Skills.',
      hindiText: 'कम्युनिकेशन स्किल्स, रोजगार क्षमता एवं सॉफ्ट स्किल्स।',
    },
    {
      icon: Factory,
      text: 'Regular Industrial Tours & Excursions.',
      hindiText: 'नियमित औद्योगिक भ्रमण एवं शैक्षणिक यात्राएँ।',
    },
    {
      icon: DollarSign,
      text: 'Affordable Fee Structure.',
      hindiText: 'किफायती शुल्क संरचना।',
    },
    {
      icon: BookOpen,
      text: 'Industry Specific & Strong Curriculum.',
      hindiText: 'उद्योग आधारित एवं मजबूत पाठ्यक्रम।',
    },
    {
      icon: Dumbbell,
      text: 'Excellent Indoor / Outdoor Sports and Recreational Activities.',
      hindiText: 'उत्कृष्ट इनडोर/आउटडोर खेल एवं मनोरंजन गतिविधियाँ।',
    },
    {
      icon: Users,
      text: 'Strong Alumni Network.',
      hindiText: 'मजबूत एलुमनाई नेटवर्क।',
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
      question: 'What is the MBA Eligibility Criteria ?',
      answer:
        '(10+2+3) for an UGC Recognized University in any Discipline with Minimum 50% Marks in General & 45% Marks for OBC/SC/ST Category',
    },
    {
      question: 'How can I apply for Admission ?',
      answer:
        'Students can apply: Online through the official website https://www.ipsedu.in, By visiting the campus admission office (8:00 AM to 4 PM), By filling out the admission form and submitting required documents',
    },
    {
      question: 'What is the duration of the MBA program ?',
      answer: 'The MBA program duration is 2 years.',
    },
    {
      question: 'What documents are required for admission?',
      answer:
        'Generally required documents include: 10th & 12th Mark sheet, Graduation Mark sheet (for PG courses), Transfer Certificate, Migration Certificate & Provisional Certificate, Passport-size photographs, ID Proof (Adhar Crad)',
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
      question: 'MBA Internship provided during the course ?',
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
      question: 'What is an MBA and why should I pursue it?',
      answer:
        'An MBA (Master of Business Administration) is a postgraduate program designed to develop leadership, management, and business skills. It helps students build careers in areas like marketing, finance, HR, analytics, and entrepreneurship.',
    },
    {
      question: 'What are the benefits of doing an MBA?',
      answer:
        'An MBA enhances career opportunities, improves salary potential, builds leadership skills, and provides strong industry exposure through internships and projects.',
    },
    {
      question: 'Who should pursue an MBA?',
      answer:
        'Graduates from any stream who want to build a career in management, leadership roles, or start their own business should consider an MBA.',
    },
    {
      question: 'What is the eligibility criteria for MBA admission?',
      answer:
        "Candidates must have a bachelor's degree (minimum 50% marks, 45% for reserved categories) from a recognized university.",
    },
    {
      question: 'Which entrance exams are accepted for MBA admission?',
      answer: 'Common exams include CAT, MAT, CMAT, XAT, and state-level entrance tests.',
    },
    {
      question: 'Is work experience required for MBA?',
      answer: 'No, fresh graduates can apply. However, work experience is an added advantage.',
    },
    {
      question: 'What is the MBA admission process?',
      answer:
        'The process typically includes entrance exam score, group discussion (GD), personal interview (PI), and academic performance evaluation.',
    },
    {
      question: 'What are the popular MBA specializations?',
      answer:
        'Marketing, Finance, Human Resource (HR), Business Analytics, International Business, Operations, and Entrepreneurship.',
    },
    {
      question: 'Which MBA specialization is best?',
      answer: 'The best specialization depends on your career goals, interests, and industry demand.',
    },
    {
      question: 'Are scholarships available for MBA students?',
      answer: 'Yes, many colleges offer merit-based, need-based, and category-based scholarships.',
    },
    {
      question: 'Is an MBA worth the investment?',
      answer: 'Yes, if pursued from a good institute with strong placements and industry exposure.',
    },
    {
      question: 'What are the placement opportunities after MBA?',
      answer:
        'Students get placed in roles like Marketing Manager, Financial Analyst, HR Manager, Business Analyst, and Consultant.',
    },
    {
      question: 'What is the average salary after MBA?',
      answer: 'It depends on the college and specialization, typically ranging from ₹4 LPA to ₹12 LPA or higher.',
    },
    {
      question: 'Which companies hire MBA graduates?',
      answer: 'Top recruiters include consulting firms, banks, FMCG companies, IT firms, and startups.',
    },
    {
      question: 'What skills are developed during an MBA?',
      answer: 'Leadership, communication, analytical thinking, problem-solving, teamwork, and decision-making.',
    },
    {
      question: 'What is the importance of tools like SPSS in MBA?',
      answer:
        'SPSS helps students analyze data, conduct research, and make data-driven decisions—an essential skill in modern business environments.',
    },
    {
      question: 'What facilities should a good MBA college provide?',
      answer:
        'Modern classrooms, library, computer labs, Wi-Fi campus, hostel, industry exposure, and placement support.',
    },
    {
      question: 'Does the college provide internship opportunities?',
      answer: 'Yes, most MBA programs include mandatory internships for practical exposure.',
    },
    {
      question: 'How does an MBA college provide industry exposure?',
      answer: 'Through guest lectures, live projects, internships, industrial visits, and workshops.',
    },
    {
      question: 'Why is practical learning important in MBA?',
      answer: 'It bridges the gap between theory and real-world business challenges.',
    },
    {
      question: 'What are the best MBA colleges in Jaipur?',
      answer:
        'Jaipur offers several reputed MBA colleges known for quality education, experienced faculty, and strong placement support.',
    },
    {
      question: 'Why choose Jaipur for MBA?',
      answer:
        'Jaipur is an emerging education hub with affordable living, good infrastructure, and growing corporate exposure.',
    },
    {
      question: 'Which MBA college offers the best placement in Jaipur?',
      answer:
        'Top MBA colleges in Jaipur offer strong placement support with reputed recruiters and competitive salary packages.',
    },
    {
      question: 'Which MBA college provides the best ROI?',
      answer: 'Colleges with moderate fees and strong placement records offer the best return on investment.',
    },
    {
      question: 'What makes a top MBA college stand out?',
      answer: 'Strong faculty, industry connections, placement record, practical learning, and modern curriculum.',
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
                        MASTER IN BUSINESS ADMINISTRATION (MBA)
                      </h1>
                      <p className="lg:text-[16px] text-[14px] font-rubik font-semibold mb-1">Duration: 2 Years</p>
                      <p className="text-[10px] font-semibold text-black font-rubik">
                        (Approved by AICTE New Delhi, Government of Rajasthan & and Affiliated with RTU Kota)
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

                  {/* Highlights with Hindi translations */}
                  <div className="mb-8">
                    <h4 className="text-lg font-bold text-gray-800 mb-4 font-rubik">MBA HIGHLIGHTS:</h4>
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

                  {/* Black line image placeholder */}
                  <div className="text-center mb-4">
                    <Image
                      width={180}
                      height={100}
                      src={`${process.env.NEXT_PUBLIC_IMG_PATH}images/home/blck.webp`}
                      alt="RTU Logo"
                      className="object-contain mx-auto"
                    />
                  </div>

                  {/* AICTE Approval caption */}
                  <p className="text-center text-xs text-[#444444] mb-4 font-medium font-rubik">
                    (Approved by AICTE New Delhi - Govt of INDIA)
                  </p>

                  {/* Description paragraphs */}
                  <div className="space-y-4 mb-8">
                    <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik leading-[1.8]">
                      IPS launched this unique 2-year MBA Program owing to its practical industry oriented training in
                      the teaching methodologies. The course structure is designed and monitored by our Academic
                      Council, which comprises prominent internal and external academicians and professionals who
                      continuously introduce new concepts and ideas in the related modules. The detailed structure and
                      learning places the college as the leading <b> MBA college in Jaipur.</b>
                    </p>
                    <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik leading-[1.8]">
                      Armed with a UGC recognized MBA Degree the students are not only abreast with the latest
                      management theories but also with incisive practical analysis, research findings, hands-on
                      experience, and in-depth understanding of their respective specializations. The basic motto is to
                      update the present MBA syllabus as per industry demand and become the students’ go-to option for
                      <b> the top MBA institute in Jaipur</b>. As the gap between what is taught and what the industry
                      demands is broadening every year, this course is conceptualized, structured, and implemented
                      directly by the industry - driven by a strong corporate alliance. IPS belongs to the IPS Group of
                      Colleges.
                    </p>
                  </div>
                  <div className="space-y-4 mb-8">
                    <h2 className="text-lg font-bold text-gray-800 mb-4 font-rubik">
                      Why IPS Business School is Recognized as the Best MBA College in Jaipur
                    </h2>
                    <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik leading-[1.8] mb-1">
                      In a landscape where most institutes claim to be the "best MBA college in Jaipur," it takes a
                      powerful stance to assert the same by any college. However, IPS Business School has precisely what
                      it requires to stand out proudly among the crowd. Here is what makes IPS the best:
                    </p>
                    <ul className="list-disc pl-4 text-[#444444] lg:text-[16px] text-[14px] font-rubik leading-[1.8]">
                      <li>
                        <b>Technical Education Expertise:</b> When it comes to an MBA, technicality can frequently be
                        neglected. However, IPS Business School values it above all else. IPS experts' 18+ years of
                        experience in providing technically sound knowledge will provide you with the skills you need to
                        succeed in the top roles.
                      </li>
                      <li>
                        <b>Outstanding Placements & Internships:</b> IPS students have been performing extraordinarily
                        in their placement and internship statistics. It has a strong track record of successfully
                        placing all its competent students in diverse roles across multiple industries.
                      </li>
                      <li>
                        <b> Affordability:</b> IPS isn't one of those business schools that offer mediocre quality
                        education at irrationally high fees. IPS is the epitome of the best college in Jaipur for MBA,
                        offering top-tier education at fees affordable by most students.
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Syllabus */}
                <div id="syllabus" className="mb-8">
                  <h4 className="text-lg font-bold text-gray-800 mb-4 font-rubik">SYLLABUS:</h4>
                  <div className="space-y-2">
                    {[
                      { name: 'MBA Syllabus (1st Semester)', pdfFile: 'mba-1-sam.pdf' },
                      { name: 'MBA Syllabus (2nd Semester)', pdfFile: 'mba-2-sam.pdf' },
                      { name: 'MBA Syllabus (3rd Semester)', pdfFile: 'mba-3-sam.pdf' },
                      { name: 'MBA Syllabus (4th Semester)', pdfFile: 'mba-4-sam.pdf' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Lightbulb className="w-4 h-4 text-[#ffa705] shrink-0 mt-1" />
                        <a
                          href={`${process.env.NEXT_PUBLIC_IMG_PATH}images/courses/${item.pdfFile}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#ffa705] hover:underline lg:text-[16px] text-[14px] font-rubik"
                        >
                          {item.name}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Specializations and Eligibility Combined Section */}
                <div id="specializations" className="mb-8">
                  <h4 className="text-lg font-bold text-gray-800 mb-4 font-rubik">
                    SPECIALIZATIONS ARE AVAILABLE IN FOLLOWING AREA:
                  </h4>
                  <div className="space-y-2 mb-6">
                    {['Marketing', 'Finance', 'Information Technology', 'Human Resource', 'Business Analytics'].map(
                      (spec, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Lightbulb className="w-4 h-4 text-[#ffa705]" />
                          <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik">{spec}</p>
                        </div>
                      ),
                    )}
                  </div>

                  {/* Eligibility within Specializations section */}
                  <h4 className="text-lg font-bold text-gray-800 mb-4 font-rubik">Eligibility:</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-4 h-4 text-[#ffa705] shrink-0 mt-1" />
                      <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik leading-relaxed">
                        Students who have completed their 10+2+3 graduation from a UGC-affiliated university with a
                        minimum of 50% marks for General, 45% for OBC, 45% for SC/ST are eligible to apply for the MBA
                        program.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-4 h-4 text-[#ffa705] shrink-0 mt-1" />
                      <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik leading-relaxed">
                        * Final Year Students must submit all documents except final year or final semester marksheet
                        and Final Semester / Year Graduation result & marksheet must be submitted before 15th August
                        2026 or (Within a one month arrival of result whichever comes before).
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-4 h-4 text-[#ffa705] shrink-0 mt-1" />
                      <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik leading-relaxed">
                        IPS accepts GMAT, MH-CET, CAT, CMAT, XAT, MAT, ATMA or Any State Level or Central Level Test
                        score.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-4 h-4 text-[#ffa705] shrink-0 mt-1" />
                      <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik leading-relaxed">
                        Final year students can also apply for the registration.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-4 h-4 text-[#ffa705] shrink-0 mt-1" />
                      <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik leading-relaxed">
                        There is no cut-off predefined, but the merit is prepared on the basis of general profiling
                        based on X, XII, GRADUATION MARKS, WORK EXPERIENCE, GMAT/MH-CET/CMAT/CAT/MAT/XAT/ATMA for
                        Interview and final selection.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-4 h-4 text-[#ffa705] shrink-0 mt-1" />
                      <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik leading-relaxed">
                        For candidates with respective equal CMAT/CAT/MAT score, the preference will be given to the
                        candidates in following order:-
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 space-y-2 ml-7">
                    <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik">
                      Percentage of qualifying examination or equivalent CGPA
                    </p>
                    <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik">
                      Percentage of marks final in qualifying examination or equivalent CGPA
                    </p>
                    <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik">
                      Date of Birth (candidate who is older in age shall be given priority).
                    </p>
                  </div>
                </div>

                {/* How to Apply */}
                <div id="admission-process" className="mb-8">
                  <h4 className="text-lg font-bold text-gray-800 mb-4 font-rubik">How to Apply:</h4>
                  <div className="space-y-3">
                    <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik">
                      Date of Birth (candidate who is older in age shall be given priority).
                    </p>
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
                      <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik">
                        Graduation (All Years or Semesters)
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-4 h-4 text-[#ffa705] shrink-0 mt-1" />
                      <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik">Migration Certificate</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-4 h-4 text-[#ffa705] shrink-0 mt-1" />
                      <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik">
                        Entrance Test Score Card – CMAT/MAT/CAT/XAT/ATMA
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-4 h-4 text-[#ffa705] shrink-0 mt-1" />
                      <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik">
                        Copy of Scan Signatures of Student.
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
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-4 h-4 text-[#ffa705] shrink-0 mt-1" />
                      <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik">
                        * Final Year Students must submit all documents except final year or final semester marksheet
                        and Final Semester / Year Graduation result & marksheet must be submitted before 15th August
                        2026 or (Within a one month arrival of result whichever comes before).
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
                      Filling up the Admission Form. (Online / Offline)
                    </p>
                    <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik font-bold">Step 2</p>
                    <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik">
                      Submission of Form with Documents.
                    </p>
                    <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik font-bold">Step 3</p>
                    <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik">
                      Student Analysis & Personal/ Telephonic Interview.
                    </p>
                    <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik font-bold">Step 4</p>
                    <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik">
                      Declaration of Shortlisted Candidates through Email/SMS/Telephone Calls or Students may call IPS
                      to know their results.
                    </p>
                    <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik font-bold">Step 5</p>
                    <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik">
                      Confirmation of the Registration after Fee Submission.
                    </p>
                  </div>
                </div>

                {/* Fee Structure */}
                <div id="fee-structure" className="mb-8">
                  <h4 className="text-lg font-bold text-gray-800 mb-4 font-rubik">Fee Structure of MBA</h4>
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
                          className="w-full lg:px-6 px-3 cursor-pointer py-3 lg:py-4 text-left font-semibold text-gray-800 bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center lg:text-[16px] text-[14px] font-rubik"
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
              url: 'https://www.youtube.com/embed/ocaViRxJrdE?si=gmgh25qgaZeHh0hb',
              title: '',
            },
            {
              url: 'https://www.youtube.com/embed/4aq02tSiXd4?si=AawJvooDzO8Pflx0',
              title: 'Raghav Sharma Video Resume',
            },
          ]}
        />
      </div>
    </section>
  );
}
