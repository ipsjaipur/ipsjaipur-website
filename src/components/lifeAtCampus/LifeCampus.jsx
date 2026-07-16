'use client';

import React from 'react';
import Breadcrumb from '../common/Breadcrumb';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import CommonBanner from '../courses/CommonBanner';

export default function LifeCampus() {
  const sectionsData = [
    {
      title: 'ZEPHYR Hosted by IPS COLLEGE',
      images: [
        '/images/life-at-ips/1.webp',
        '/images/life-at-ips/2.webp',
        '/images/life-at-ips/3.webp',
        '/images/life-at-ips/4.webp',
        '/images/life-at-ips/5.webp',
        '/images/life-at-ips/6.webp',
        '/images/life-at-ips/7.webp',
        '/images/life-at-ips/8.webp',
        '/images/life-at-ips/9.webp',
        '/images/life-at-ips/10.webp',
        '/images/life-at-ips/11.webp',
        '/images/life-at-ips/12.webp',
        '/images/life-at-ips/13.webp',
      ],
      paragraph:
        'Zephyr is the ultimate Annual Management & Tech Fest, blending cutting-edge competitions, cultural spectacles, and corporate buzz into an unforgettable experience. As Rajasthan’s most sought after youth festival, it draws 40,000+ students for adrenaline-pitched business battles, IT challenges, and electrifying performances. IPS COLLEGE JAIPUR - Where talent meets triumph!',
    },
    {
      title: 'SEMINARS',
      images: [
        '/images/life-at-ips/14.webp',
        '/images/life-at-ips/15.webp',
        '/images/life-at-ips/16.webp',
        '/images/life-at-ips/17.webp',
        '/images/life-at-ips/18.webp',
        '/images/life-at-ips/19.webp',
        '/images/life-at-ips/20.webp',
        '/images/life-at-ips/21.webp',
        '/images/life-at-ips/22.webp',
        '/images/life-at-ips/23.webp',
      ],
      paragraph:
        'IPS COLLEGE JAIPUR bridges academia & industry through specialized seminars, corporate workshops, and alumni interactions—tailored separately for Management (MBA/BBA) and IT (BCA) students. These sessions deliver real-world insights, emerging trends, and networking goldmines, transforming students into industry-ready professionals with a competitive edge!',
    },
    {
      title: 'UNLEASH THE FUNGAMA QUOTIENT',
      images: [
        '/images/life-at-ips/24.webp',
        '/images/life-at-ips/25.webp',
        '/images/life-at-ips/26.webp',
        '/images/life-at-ips/27.webp',
        '/images/life-at-ips/28.webp',
        '/images/life-at-ips/29.webp',
      ],
      paragraph:
        'At IPS COLLEGE JAIPUR, we believe in working hard and partying harder! Our electrifying DJ Nights, high-energy Dance Parties, and refreshing Pool Parties ensure students experience the ultimate college fun. These events aren’t just about entertainment—they foster camaraderie, stress relief, and life-long memories, making campus life vibrant and balanced.',
    },
    {
      title: 'INDUSTRIAL VISITS',
      images: [
        '/images/life-at-ips/30.webp',
        '/images/life-at-ips/31.webp',
        '/images/life-at-ips/32.webp',
        '/images/life-at-ips/33.webp',
        '/images/life-at-ips/34.webp',
        '/images/life-at-ips/35.webp',
        '/images/life-at-ips/36.webp',
        '/images/life-at-ips/37.webp',
      ],
      paragraph:
        'IPS COLLEGE JAIPUR organizes regular industrial visits to expose students to real-world operations. MBA and BBA scholars gain business processes and management insights, along with analysis of business workflows, while BCA techies explore IT infrastructure. These visits foster practical learning, industry networking, and innovation, preparing students to excel in their careers!',
    },
    {
      title: 'TREKKING',
      images: [
        '/images/life-at-ips/38.webp',
        '/images/life-at-ips/39.webp',
        '/images/life-at-ips/40.webp',
        '/images/life-at-ips/41.webp',
        '/images/life-at-ips/42.webp',
        '/images/life-at-ips/43.webp',
      ],
      paragraph:
        'IPS COLLEGE JAIPUR organizes regular treks to challenge students physically and mentally. These adventures teach resilience, teamwork, and leadership, skills essential to perform in Corporate scenarios. Students also gain problem-solving agility while navigating unpredictable terrains, mirroring real-world challenges. A thrilling way to build grit and adaptability!',
    },
    {
      title: 'FRESHERS AND FAREWELLS',
      images: [
        '/images/life-at-ips/44.webp',
        '/images/life-at-ips/45.webp',
        '/images/life-at-ips/46.webp',
        '/images/life-at-ips/47.webp',
        '/images/life-at-ips/48.webp',
      ],
      paragraph:
        "WHERE MEMORIES SPARK - IPS COLLEGE JAIPUR sets the stage for unforgettable beginnings and emotional goodbyes with its electrifying Freshers' and Farewell Parties. From dazzling performances and themed celebrations to nostalgic moments, these events create a high-energy vibe that bonds seniors and juniors. It’s more than a party—it’s where lifelong friendships and college legacies take birth.",
    },
    {
      title: 'FESTIVALS',
      images: [
        '/images/life-at-ips/49.webp',
        '/images/life-at-ips/50.webp',
        '/images/life-at-ips/51.webp',
        '/images/life-at-ips/52.webp',
        '/images/life-at-ips/53.webp',
        '/images/life-at-ips/54.webp',
      ],
      paragraph:
        "From Independence Day to Christmas, Diwali to New Year, IPS COLLEGE JAIPUR embraces India’s rich cultural tapestry while fostering global unity. Festivals like Holi, Ganesh Chaturthi, Sankranti, and Teachers' Day ignite joy, teamwork, and tradition, keeping students rooted yet globally aware. Every celebration strengthens bonds and creates unforgettable memories!",
    },
    {
      title: 'ANNUAL SPORTS WEEK',
      images: [
        '/images/life-at-ips/55.webp',
        '/images/life-at-ips/56.webp',
        '/images/life-at-ips/57.webp',
        '/images/life-at-ips/58.webp',
        '/images/life-at-ips/59.webp',
        '/images/life-at-ips/60.webp',
        '/images/life-at-ips/61.webp',
      ],
      paragraph:
        "IPSCOLLEGE JAIPUR's Annual Sports Week fuels passion, teamwork, and resilience! MBA and BBA students master leadership & strategy, learning event management & networking, while BCA techies explore data-driven performance analysis. Beyond medals, it’s a training ground for discipline, collaboration, and winning mindsets—essential for corporate success!",
    },
    {
      title: 'FLASH MOBS',
      images: [
        '/images/life-at-ips/62.webp',
        '/images/life-at-ips/63.webp',
        '/images/life-at-ips/64.webp',
        '/images/life-at-ips/65.webp',
        '/images/life-at-ips/66.webp',
      ],
      paragraph:
        'IPS COLLEGE JAIPUR sets the floor on fire with electrifying flash mobs, blending creativity and teamwork! For MBA students, it is about leadership and coordination; BBA students hone their event management skills, while BCA techies explore digital promotion. A vibrant lesson in innovation, collaboration, and brand visibility—proving learning happens everywhere!',
    },
    {
      title: 'EXPLORE WITH IPS',
      images: [
        '/images/life-at-ips/67.webp',
        '/images/life-at-ips/68.webp',
        '/images/life-at-ips/69.webp',
        '/images/life-at-ips/70.webp',
        '/images/life-at-ips/71.webp',
        '/images/life-at-ips/72.webp',
        '/images/life-at-ips/73.webp',
      ],
      paragraph:
        "IPS COLLEGE JAIPUR fuels adventure and learning through Annual Excursions and regular trips to historical and scenic destinations. These journeys transform classrooms into real-world experiences, fostering teamwork, cultural awareness, and leadership among students. From Rajasthan's heritage sites to India's Choicest Tourist hubs, every trip delivers unforgettable memories and practical insights that shape future-ready professionals!",
    },
  ];

  return (
    <>
      <div className="flex flex-col justify-center">
        <CommonBanner
          pageTitle="Life@ips"
          normalFont={true}
          bgImageUrl="images/about/life-of-ips-img.webp"
          position="object-center"
        />
        <Breadcrumb pageName="Life@ips" />
        <div className="flex flex-col gap-8 md:gap-12 justify-center py-6 md:py-12 px-6 max-w-[1320px] mx-auto w-full ">
          {sectionsData.map((item, index) => (
            <div key={index} className="grid grid-cols md:grid-cols-2 items-center gap-8 lg:gap-14">
              <div
                className={`w-full md: grid-cols relative rounded-3xl overflow-hidden shadow-md group ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}
              >
                <Swiper
                  modules={[Autoplay, Pagination]}
                  spaceBetween={0}
                  slidesPerView={1}
                  loop={true}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                    dynamicBullets: false,
                  }}
                  className="w-full h-full max-h-[220px] md:max-h-[360px]"
                >
                  {item.images.map((src, index) => (
                    <SwiperSlide key={index} className="relative w-full h-full">
                      <img src={src} alt={`Zephyr Fest slide ${index + 1}`} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div
                className={`w-full md: grid-cols flex flex-col justify-center rubik-font ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}
              >
                <h2 className="text-[22px] md:text-[24px] lg:text-[32px] font-bold text-[#111111] md:tracking-tight uppercase">
                  {item.title}
                </h2>
                <div className="w-20 h-[2px] bg-[#e87816] my-3 md:mt-3 md:mb-6 rounded-full" />
                <div className="space-y-4 text-[#505050] text-sm md:text-base leading-relaxed font-normal text-justify">
                  <p>{item.paragraph}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
