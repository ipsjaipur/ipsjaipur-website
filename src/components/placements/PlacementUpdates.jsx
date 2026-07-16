'use client';
import React from 'react';
import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function PlacementUpdates() {
  // Placement updates data
  const placementUpdates = [
    { id: 1, name: 'Tanishka Pareekh', company: 'Archer & Bull', image: 'images/placements/Tanishka-Pareekh.webp' },
    { id: 2, name: 'Sonali Sharma', company: 'Haleon', image: 'images/placements/Sonali-Sharma.webp' },
    { id: 3, name: 'Manisha Sharma', company: 'Wonder Home Finance', image: 'images/placements/Manisha-Sharma.webp' },
    { id: 4, name: 'Kunal Malhotra', company: 'Zomato', image: 'images/placements/Kunal-Malhotra.webp' },
    { id: 5, name: 'Hemendra Purohit', company: 'HDFC Life', image: 'images/placements/Hemendra-Purohit.webp' },
    { id: 6, name: 'Drishti Pamnani', company: 'HDFC Mutual Funds', image: 'images/placements/Drishti-Pamnani.webp' },
    { id: 7, name: 'Deeya Kumawat', company: 'Deutsche Bank', image: 'images/placements/Deeya-Kumawat.webp' },
    { id: 8, name: 'Bhavesh Pal', company: 'Policy Bazaar', image: 'images/placements/Bhavesh-Pal.webp' },
    { id: 9, name: 'Ankit Kumar', company: 'Bajaj Finserv', image: 'images/placements/Ankit-Kumar.webp' },
    {
      id: 10,
      name: 'Anak Mathur',
      company: 'Namdev Finvest Private Limited',
      image: 'images/placements/ANAK-MATHUR.webp',
    },
    { id: 11, name: 'Akshita Jain', company: 'TCS', image: 'images/placements/Akshita-Jain.webp' },
    { id: 12, name: 'Tanvi Saxena', company: 'Delphic', image: 'images/placements/Tanvi-Saxena.webp' },
    {
      id: 13,
      name: 'Sarthak Maheshwari',
      company: 'Unique Builders',
      image: 'images/placements/Sarthak-Maheshwari.webp',
    },
    {
      id: 14,
      name: 'Raviraj Singh Rathore',
      company: 'City Union Bank',
      image: 'images/placements/Raviraj-Singh-Rathore.webp',
    },
    { id: 15, name: 'Srishti Gupta', company: 'ICICI Bank Ltd.', image: 'images/placements/Srishti-400x400.webp' },
    { id: 16, name: 'Nikita Badaya', company: 'Axis Bank Ltd.', image: 'images/placements/Nikita-1-400x400.webp' },
    { id: 17, name: 'Monika Jain', company: 'Aditya Birla Money', image: 'images/placements/Monika-jain.webp' },
    { id: 18, name: 'Abhishek', company: 'Parle', image: 'images/placements/Abhishek.webp' },
    { id: 19, name: 'Ranveer Singh', company: 'Airtel', image: 'images/placements/Ranveer-Singh.webp' },
    { id: 20, name: 'Nikhil Sharma', company: 'Color Jewels (Dubai)', image: 'images/placements/Nikhil-sharma.webp' },
    { id: 21, name: 'Balram Singh', company: 'Accenture', image: 'images/placements/Balram-Singh.webp' },
    { id: 22, name: 'Simran Soni', company: 'Public Sector Bank', image: 'images/placements/Simran-1-300x300-1.webp' },
    {
      id: 23,
      name: 'Neeru Tak',
      company: 'Shriram General Insurance Ltd',
      image: 'images/placements/Neeru-Tak-400x400.webp',
    },
    { id: 24, name: 'Sanjeet Kumar', company: 'OPPO', image: 'images/placements/sanjeet-400x400.webp' },
    {
      id: 25,
      name: 'Pinkey (Nishi)',
      company: 'Samasta Microfinance Ltd.',
      image: 'images/placements/Pinkey-400x400.webp',
    },
    { id: 26, name: 'Shubham Kumawat', company: 'HDFC Bank', image: 'images/placements/shubham-kumwat-400x400.webp' },
    { id: 27, name: 'Manisha', company: 'Amazon', image: 'images/placements/Manisha-400x400.webp' },
    { id: 28, name: 'Piyush Mathur', company: 'HFFC', image: 'images/placements/Piyush-Mathur-400x400.webp' },
    { id: 29, name: 'Ankit Kumar', company: 'OPPO', image: 'images/placements/ankit-400x400.webp' },
    { id: 30, name: 'Vishal Kumar', company: 'LG Electronics', image: 'images/placements/Vishal-Kumar-400x400.webp' },
    { id: 31, name: 'Gurpreet Kaur', company: 'Reliance Jio', image: 'images/placements/Gurpreet-Kaur-400x400.webp' },
    { id: 32, name: 'Abhishek Mundra', company: 'HDFC Bank', image: 'images/placements/Abhishek-Mundra-400x400.webp' },
    { id: 33, name: 'Manish Swami', company: 'Bajaj Finserv', image: 'images/placements/Swami.webp' },
    { id: 34, name: 'Mukul Agrawal', company: 'OYO', image: 'images/placements/Mukul-Agarwal-400x400.webp' },
    {
      id: 35,
      name: 'Anjali Choudhary',
      company: 'AU Bank Ltd.',
      image: 'images/placements/Anjali-Choudhary-400x400.webp',
    },
    { id: 36, name: 'Samreen Bano', company: 'Airtel', image: 'images/placements/Samreen-400x400.webp' },
    { id: 37, name: 'Rohit Dixit', company: 'LG Electronics', image: 'images/placements/Rohit-Dixit-400x400.webp' },
    {
      id: 38,
      name: 'Ashita Khandelwal',
      company: 'AU Bank Ltd.',
      image: 'images/placements/Ashita-Khandelwal-400x400.webp',
    },
    { id: 39, name: 'Anand Saraswat', company: 'Airtel', image: 'images/placements/Anand-400x400.webp' },
    { id: 40, name: 'Kriti Sharma', company: 'AU Bank Ltd.', image: 'images/placements/kriti-Sharma-400x400.webp' },

    { id: 41, name: 'Mohit Bhardwaj', company: 'LG Electronics', image: 'images/placements/mohit-400x400.webp' },
    {
      id: 42,
      name: 'Kartika Bhargava',
      company: 'AU Bank Ltd.',
      image: 'images/placements/kartika-Bhargava-400x400.webp',
    },
    { id: 43, name: 'Kinjal Mor', company: 'Airtel', image: 'images/placements/Kinjal-Mor-400x400.webp' },
    {
      id: 44,
      name: 'Kartik Balecha',
      company: 'LG Electronics',
      image: 'images/placements/kartik-Balecha-400x400.webp',
    },
    { id: 45, name: 'Abhishek Singh', company: 'Airtel', image: 'images/placements/Abhishek-Singh-400x400.webp' },
    { id: 46, name: 'Khusboo Sharma', company: 'AU Bank Ltd.', image: 'images/placements/khusboo-400x400.webp' },
    { id: 47, name: 'Dinesh Gurjar', company: 'VIVO', image: 'images/placements/Dinesh-Gurjar-400x400.webp' },
    { id: 48, name: 'Shreya Goyal', company: 'HDFC Mutual Fund', image: 'images/placements/Shriya-Goyal-400x400.webp' },
    {
      id: 49,
      name: 'Anash Mazid Siddqui',
      company: 'VIVO',
      image: 'images/placements/Anash-Mazid-Siddiqui-400x400.webp',
    },
    { id: 50, name: 'Nikhil Jain', company: 'ICICI Bank Ltd.', image: 'images/placements/Nikhil-Jain-400x400.webp' },
    { id: 51, name: 'Kritika Goel', company: 'Axis Bank Ltd.', image: 'images/placements/Kritika-Goel-400x400.webp' },
    { id: 52, name: 'Himangi Sharma', company: 'OPPO', image: 'images/placements/Himangi-Sharma-400x400.webp' },
    {
      id: 53,
      name: 'Ankita Singh',
      company: 'Hyrefox (Smart Hiring)',
      image: 'images/placements/Neeru-Tak-1-400x400.webp',
    },
    { id: 54, name: 'Aditri Bang', company: 'Bank of Baroda', image: 'images/placements/Aditri-Bang-400x400.webp' },
    {
      id: 55,
      name: 'Archit Maheshwari',
      company: 'Shriram General Insurance Ltd.',
      image: 'images/placements/Archit-Maheshwari-400x400.webp',
    },
    { id: 56, name: 'Himani Duggar', company: 'AU Bank Ltd.', image: 'images/placements/Himani-Duggar-400x400.webp' },
    { id: 57, name: 'Arpit Verma', company: 'Bank of Baroda', image: 'images/placements/Arpit-Verma-400x400.webp' },
    {
      id: 58,
      name: 'Adtiya Srivastava',
      company: 'Shriram General Insurance Ltd.',
      image: 'images/placements/Aditya-Srivastava-1-400x400.webp',
    },
    { id: 59, name: 'Pragya Tailor', company: 'Bank of Baroda', image: 'images/placements/Pragya-Tailor-400x400.webp' },
    {
      id: 60,
      name: 'Vishakha Kumari',
      company: 'Bank of Baroda',
      image: 'images/placements/Vishakha-Kumari-400x400.webp',
    },

    {
      id: 61,
      name: 'Pratiksha Jain',
      company: 'Axis Bank Ltd.',
      image: 'images/placements/Pratiksha-JAin-400x400.webp',
    },
    {
      id: 62,
      name: 'Vikram Birkh',
      company: 'India Shelter Home Loans',
      image: 'images/placements/Vikram-Birkh-400x400.webp',
    },
    {
      id: 63,
      name: 'Mohita Mathur',
      company: 'Hyrefox (Smart Hiring)',
      image: 'images/placements/Mohita-Mathur-1-400x400.webp',
    },
    {
      id: 64,
      name: 'Rakshita Bansal',
      company: 'AU Bank Ltd.',
      image: 'images/placements/Rakshita-BAnsal-400x400.webp',
    },
    { id: 65, name: 'Rajesh Jain', company: 'HDFC Bank Ltd.', image: 'images/placements/Rajesh-Jain-400x400.webp' },
    {
      id: 66,
      name: 'Mintu Jha',
      company: 'India Shelter Home Loans',
      image: 'images/placements/Mintu-Jha-400x400.webp',
    },
    { id: 67, name: 'Rinkle Jain', company: 'Aditya Birla Group', image: 'images/placements/Rinkle-JAin-400x400.webp' },
    { id: 68, name: 'Nitu Kumari', company: 'Axis Bank Ltd.', image: 'images/placements/Nitu-Kumari-400x400.webp' },
    { id: 69, name: 'Monika Sharma', company: 'VIVO', image: 'images/placements/monika-sharma-400x400.webp' },
    {
      id: 70,
      name: 'Nitisha Sharma',
      company: 'Reliance Industries Ltd.',
      image: 'images/placements/Nitisha-Sharma-400x400.webp',
    },
    { id: 71, name: 'Ayush Chirania', company: 'HDFC Bank', image: 'images/placements/ayush-chirania-1-400x400.webp' },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="px-[16px] py-[64px] bg-linear-to-b from-white to-gray-50">
      <motion.div className="w-full max-w-[1320px] mx-auto relative ">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 lg:mb-12"
        >
          <h2 className="text-gray-900 font-bold rubik-fonts text-[28px] md:text-[32px] lg:text-[40px] lg:mb-4 mb-2">
            PLACEMENT <span className="text-[#FF9E3D]">UPDATES</span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="h-1 bg-[#FF9E3D] mx-auto rounded-full"
          />
        </motion.div>

        {/* Placement Coordinator Contact Details Marquee */}
        <motion.div className="mb-8">
          <Marquee gradient={false} speed={50} pauseOnHover={true}>
            <div className="flex pl-20 items-center gap-8 text-[14px] md:text-[16px] font-normal text-gray-800 rubik-fonts">
              <span>
                <strong>Placement Coordinator Contact Details: Prof. Sudhir Agarwal :</strong>{' '}
                <a href="tel:919829016449" className="text-[#FF6B00] hover:text-[#FF9E3D] transition-colors">
                  +91 9829016449
                </a>{' '}
                |{' '}
                <a href="tel:918233970000" className="text-[#FF6B00] hover:text-[#FF9E3D] transition-colors">
                  +91 82339700000
                </a>
              </span>
              <span className="mx-4 text-[#FF6B00]">•</span>
              <span>
                For Placements send your Queries to{' '}
                <a href="mailto:sudhir@ipsedu.in" className="text-[#FF6B00] hover:text-[#FF9E3D] transition-colors">
                  sudhir@ipsedu.in
                </a>{' '}
                or{' '}
                <a href="mailto:info@ipsedu.in" className="text-[#FF6B00] hover:text-[#FF9E3D] transition-colors">
                  info@ipsedu.in
                </a>
              </span>
            </div>
          </Marquee>
        </motion.div>

        {/* Placement Cards Grid */}
        <motion.div
          key={placementUpdates.length} // 👈 yahi karo
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {placementUpdates.map((student, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl overflow-hidden transition-all duration-300 border border-gray-100 shadow-md hover:shadow-xl"
            >
              <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
                <Image
                  fill
                  unoptimized
                  quality={100}
                  alt={student.name}
                  src={`${process.env.NEXT_PUBLIC_IMG_PATH}${student.image}`}
                  className="object-cover transition-transform duration-500 group-hover:scale-108"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 25vw"
                />
              </div>

              {/* Student Details */}
              <div className="p-3 md:p-4 text-center">
                <h3 className="text-gray-900 font-bold text-[14px] md:text-[16px] lg:text-[18px] mb-1 rubik-fonts line-clamp-1">
                  {student.name}
                </h3>
                <p className="text-[#FF6B00] font-medium text-[12px] md:text-[14px] rubik-fonts line-clamp-2">
                  Placed at {student.company}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
