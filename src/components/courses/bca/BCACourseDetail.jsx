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
  Cloud,
} from 'lucide-react';
import CourseNavigation from '../CourseNavigation';
import CourseQuickLinks from '../CourseQuickLinks';
import Image from 'next/image';

export default function BCACourseDetail() {
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
      icon: Building2,
      text: 'Campus situated in the Heart of Jaipur City.',
      hindiText: 'जयपुर शहर के मध्य स्थित परिसर।',
    },
    {
      icon: Bot,
      text: (
        <>
          Additional Artificial Intelligence / Machine Learning Course.{' '}
          <span className="text-[10px]"> (Level 1) (Level 2) (Level 3) (Level 4) (Level 5) (Level 6)</span>
        </>
      ),
      hindiText: (
        <>
          अतिरिक्त आर्टिफिशियल इंटेलिजेंस / मशीन लर्निंग कोर्स।{' '}
          <span className="text-[10px]"> (लेवल 1) (लेवल 2) (लेवल 3) (लेवल 4) (लेवल 5) (लेवल 6)</span>
        </>
      ),
    },
    {
      icon: TrendingUp,
      text: (
        <>
          Additional Data Analytics Course.{' '}
          <span className="text-[10px]"> (Level 1) (Level 2) (Level 3) (Level 4) (Level 5) (Level 6)</span>
        </>
      ),
      hindiText: (
        <>
          अतिरिक्त डेटा एनालिटिक्स कोर्स।{' '}
          <span className="text-[10px]"> (लेवल 1) (लेवल 2) (लेवल 3) (लेवल 4) (लेवल 5) (लेवल 6)</span>
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
      icon: Cloud,
      text: 'Additional Cloud Computing Course.',
      hindiText: 'अतिरिक्त क्लाउड कंप्यूटिंग कोर्स।',
    },
    {
      icon: Factory,
      text: 'Live Industry Projects.',
      hindiText: 'लाइव इंडस्ट्री प्रोजेक्ट्स।',
    },
    {
      icon: Globe,
      text: '3 Months International Trainings & Exchange Program (Sponsored / Optional)*.',
      hindiText: '3 माह का अंतरराष्ट्रीय प्रशिक्षण एवं एक्सचेंज प्रोग्राम (स्पॉन्सर्ड / वैकल्पिक)*।',
    },
    {
      icon: Building2,
      text: 'AC Classrooms.',
      hindiText: 'एसी युक्त कक्षाएँ।',
    },
    {
      icon: Trophy,
      text: 'Best Placements.',
      hindiText: 'सर्वश्रेष्ठ प्लेसमेंट।',
    },
    {
      icon: DollarSign,
      text: 'Affordable Fee Structure.',
      hindiText: 'किफायती शुल्क संरचना।',
    },
    {
      icon: MessageSquare,
      text: 'Communications & Soft Skills Classes.',
      hindiText: 'संचार एवं सॉफ्ट स्किल्स कक्षाएँ।',
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
      icon: BookOpen,
      text: 'Industry Interfaced - Strong Curriculum.',
      hindiText: 'इंडस्ट्री इंटरफेस्ड - मजबूत पाठ्यक्रम।',
    },
    {
      icon: Dumbbell,
      text: 'Excellent Indoor / Outdoor Sports and Recreational Activities.',
      hindiText: 'उत्कृष्ट इनडोर / आउटडोर खेल एवं मनोरंजन गतिविधियाँ।',
    },
  ];

  const faqs = [
    {
      question: 'IPS BUSINESS SCHOOL JAIPUR affiliated or approved ?',
      answer:
        'Yes, IPS BUSINESS SCHOOL JAIPUR is approved by AICTE New Delhi (Government of India) and affiliated with Rajasthan Technical University (RTU).',
    },
    {
      question: 'What documents are required for admission ?',
      answer:
        '10th & 12th Mark sheet, Transfer Certificate, Migration Certificate & Provisional Certificate, Passport-size photographs, ID Proof (Aadhar Card).',
    },
    {
      question: 'How can I apply for Admission ?',
      answer:
        'Students can apply online through the official website, by visiting the campus admission office (8:00 AM to 4 PM), or by submitting the admission form with required documents.',
    },
    {
      question: 'What is the duration of the BCA program ?',
      answer: 'The BCA program duration is 3 years.',
    },
    {
      question: 'Scholarships Available ?',
      answer:
        'Yes, scholarships are provided based on academic performance, merit-based criteria, psychometric profiling, and government scholarship schemes.',
    },
    {
      question: 'Hostel Facility Available ?',
      answer:
        'Yes, separate hostels for boys and girls are available with Wi-Fi, mess facility, 24×7 security, laundry, medical support, and recreation areas.',
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
      question: 'BCA Internship provided during the course ?',
      answer: 'Yes, internships are provided to enhance practical knowledge and industry exposure.',
    },
    {
      question: 'Education Loan Facility Available ?',
      answer:
        'Yes, IPS helps students obtain education loans from banks for course fees, hostel fees, and other educational expenses.',
    },
    {
      question: 'IPS have modern infrastructure ?',
      answer:
        'Yes, the campus has air-conditioned classrooms, digital smart boards, computer labs, and advanced learning facilities.',
    },
    {
      question: 'Attendance Compulsory ?',
      answer: 'Yes, students must maintain at least 75% attendance as per university norms.',
    },
    {
      question: 'How is attendance monitored ?',
      answer: 'Attendance is recorded regularly and parents are informed in case of shortage as per university rules.',
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
        'Academic sessions and technical training are conducted from 8:00 AM to 1:00 PM initially. Once students start internships and live projects, timings are from 8:00 AM to 11:30 AM.',
    },
    {
      question: 'What is a BCA course?',
      answer:
        'BCA (Bachelor of Computer Applications) is an undergraduate program focused on computer science, software development, and IT skills.',
    },
    {
      question: 'Why should I choose BCA after 12th?',
      answer:
        'BCA is ideal for students interested in computers, programming, software development, and building a career in the IT industry.',
    },
    {
      question: 'Who should pursue a BCA degree?',
      answer: 'Students from any stream with an interest in computers, programming, and technology can pursue BCA.',
    },
    {
      question: 'What is the eligibility for BCA admission?',
      answer: 'Candidates must have completed 10+2 from a recognized board, usually with a minimum of 45%–50% marks.',
    },
    {
      question: 'Is there any entrance exam for BCA?',
      answer: 'Some colleges conduct entrance exams, while many offer direct admission based on merit.',
    },
    {
      question: 'What subjects are taught in BCA?',
      answer:
        'Subjects include Programming Languages, Data Structures, Database Management Systems, Web Development, Networking, and Software Engineering.',
    },
    {
      question: 'Are there specializations in BCA?',
      answer:
        'Yes, specializations include Data Science, Artificial Intelligence, Cyber Security, and Cloud Computing.',
    },
    {
      question: 'What are career options after BCA?',
      answer:
        'Graduates can work as Software Developers, Web Developers, System Analysts, Data Analysts, or IT Support Specialists.',
    },
    {
      question: 'What is the salary after BCA?',
      answer: 'The average starting salary ranges from ₹3 LPA to ₹8 LPA depending on skills and experience.',
    },
    {
      question: 'Can I do MCA after BCA?',
      answer: 'Yes, MCA (Master of Computer Applications) is a popular higher education option after BCA.',
    },
    {
      question: 'Does BCA provide placement opportunities?',
      answer: 'Yes, most colleges offer placement assistance with IT companies, startups, and software firms.',
    },
    {
      question: 'Are internships included in BCA?',
      answer: 'Yes, internships are often part of the curriculum to provide practical industry exposure.',
    },
    {
      question: 'What skills will I gain in a BCA program?',
      answer: 'Programming, problem-solving, analytical thinking, communication, and technical skills.',
    },
    {
      question: 'Is BCA good for a career in IT?',
      answer:
        'Yes, BCA provides a strong foundation for careers in software development, data analysis, and IT services.',
    },
    {
      question: 'What facilities should a good BCA college offer?',
      answer: 'Modern computer labs, high-speed internet, experienced faculty, library, and placement support.',
    },
    {
      question: 'Does BCA include practical learning?',
      answer: 'Yes, through coding projects, lab work, internships, and real-world applications.',
    },
    {
      question: 'How does a BCA college provide industry exposure?',
      answer: 'Through workshops, coding competitions, internships, guest lectures, and live projects.',
    },
    {
      question: 'What are the best BCA colleges in Jaipur?',
      answer:
        'Jaipur has many reputed BCA colleges offering quality education, modern infrastructure, and good placement support.',
    },
    {
      question: 'Why choose Jaipur for BCA?',
      answer: 'Jaipur is growing as an education and IT hub with affordable living and increasing job opportunities.',
    },
    {
      question: 'Which BCA college offers the best placement in Jaipur?',
      answer:
        'Top BCA colleges in Jaipur provide strong placement support with IT companies and competitive salary packages.',
    },
    {
      question: 'Which BCA college has the best ROI?',
      answer: 'Colleges with strong placement records and quality education offer the best return on investment.',
    },
    {
      question: 'Is BCA a good career option in 2026?',
      answer:
        'Yes, BCA is a great career option due to increasing demand for IT professionals in software, AI, and data fields.',
    },
    {
      question: 'What makes a top BCA college stand out?',
      answer: 'Experienced faculty, updated curriculum, industry exposure, placement support, and modern labs.',
    },
    {
      question: 'Can BCA students work in multinational companies?',
      answer:
        'Yes, many multinational IT companies hire BCA graduates for roles in development, support, and analysis.',
    },
    {
      question: 'Is BCA better than B.Sc Computer Science?',
      answer:
        'BCA is more application and industry-focused, while B.Sc Computer Science is more theoretical and research-oriented.',
    },
    {
      question: 'What is the future scope after BCA?',
      answer:
        'Students can pursue MCA, MBA (IT), or specialize in Data Science, AI, Cyber Security, and Cloud Computing.',
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
                        Bachelor of Computer Applications (BCA)
                      </h1>
                      <p className="lg:text-[16px] text-[14px] font-rubik font-semibold mb-1">Duration: 3 Years</p>
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
                    <h4 className="text-lg font-bold text-gray-800 mb-4 font-rubik">BCA HIGHLIGHTS:</h4>
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
                      IPS has launched a 3-year BCA course for ambitious school students who want to do things
                      differently, so IPS provided opportunities to those students through this particular course. They
                      can enrich their minds with the genius faculty at our <b> BCA college in Jaipur.</b> By doing this
                      course, they can get the light of the corporate world on what should be done and how it should be
                      done. They develop strategic as well as analytical skills. As they are young minds, by doing this
                      course, they get to know the path and become focused. IPS launched this course with the motive of
                      developing young minds, as they are the future of the country, and gives them the light to analyze
                      and create a difference in the world by making things differently, as IPS believes in thinking
                      beyond the boundaries.{' '}
                    </p>
                  </div>
                  <div className="space-y-4 mb-8">
                    <h2 className="text-lg font-bold text-gray-800 mb-4 font-rubik">
                      Why IPS Business School is Recognized as the Best BCA College in Jaipur
                    </h2>
                    <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik leading-[1.8] mb-1">
                      In a landscape where most institutes claim to be the "top BCA college in Jaipur," it takes a
                      powerful stance to assert the same by any college. However, IPS Business School has precisely what
                      it requires to stand out proudly among the crowd. Here is what makes IPS the best:{' '}
                    </p>
                    <ul className="list-disc pl-4 text-[#444444] lg:text-[16px] text-[14px] font-rubik leading-[1.8]">
                      <li>
                        <b>Technical Education Expertise:</b> IPS experts' 18+ years of experience in providing
                        technically sound knowledge will provide you with the skills you need to succeed in the top
                        roles.
                      </li>
                      <li>
                        <b>Outstanding Placements & Internships:</b> IPS students have been performing extraordinarily
                        in their placement and internship statistics. It has a strong track record of successfully
                        placing all its competent students in diverse roles across multiple industries.{' '}
                      </li>
                      <li>
                        <b> Affordability:</b> IPS isn't one of those business schools that offer mediocre quality
                        education at irrationally high fees. IPS is the epitome of the best{' '}
                        <b>BCA college in Rajasthan,</b>
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
                        href={`${process.env.NEXT_PUBLIC_IMG_PATH}images/courses/BCA_RTU_Syllbus_2024.pdf`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#ffa705] hover:underline lg:text-[16px] text-[14px] font-rubik"
                      >
                        BCA 3rd Year RTU Syllabus
                      </a>
                    </div>
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-4 h-4 text-[#ffa705] shrink-0 mt-1" />
                      <a
                        href={`${process.env.NEXT_PUBLIC_IMG_PATH}images/courses/bcasyllabusru.pdf`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#ffa705] hover:underline lg:text-[16px] text-[14px] font-rubik"
                      >
                        BCA RTU Syllabus
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
                      <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik">DOB Certificate</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-4 h-4 text-[#ffa705] shrink-0 mt-1" />
                      <p className="text-[#444444] lg:text-[16px] text-[14px] font-rubik">
                        Transfer Certificate (TC). + Original Migration Certificate
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
                      Filling up the Admission Form. (Online / Offline)
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
                  <h4 className="text-lg font-bold text-gray-800 mb-4 font-rubik">Fee Structure of BCA</h4>
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
                          className="w-full lg:px-6 cursor-pointer px-3 py-3 lg:py-4 text-left font-semibold text-gray-800 bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center lg:text-[16px] text-[14px] font-rubik"
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
              url: 'https://www.youtube.com/embed/zzViqdibpv8?si=qoZEHHiu8GQMngPZ',
              title: '',
            },
          ]}
        />
      </div>
    </section>
  );
}
