'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import Link from 'next/link';
import Image from 'next/image';

const STATIC_PLACEMENT_NEWS = [
  {
    id: 'static-1',
    image: 'images/home/news-image-1.webp',
    title: 'Kajal Bhardwaj Secures Campus Placement at Airtel as Key Account Manager',
  },
  {
    id: 'static-2',
    image: 'images/home/news-image-2.webp',
    title: 'Tanya Singh Secures Campus Placement at Vivo as Brand Manager',
  },
  {
    id: 'static-3',
    image: 'images/home/news-image-3.webp',
    title: 'IPS Business School Student Rahul Saini Placed at MRF as Territory Manager',
  },
  {
    id: 'static-4',
    image: 'images/home/news-image-4.webp',
    title: 'Deeya Kumawat Secures Campus Placement at Deutsche Bank as Documentary Trade Analyst',
  },
];

const STATIC_IPS_NEWS = [
  {
    id: 'static-5',
    image: 'images/home/news-image-5.webp',
    title: 'Virendra Singh Secures Campus Placement at Reliance as Customer Development Manager',
  },
  {
    id: 'static-6',
    image: 'images/home/news-image-6.webp',
    title: 'Govind Khandelwal Secures Campus Placement at Unilever as Territory Manager',
  },
];

const STATIC_BLOGS = [
  {
    id: 'static-blog-1',
    image: 'images/home/new-girl.webp',
    title:
      'Ips Business School Collaborates With Iims, Iits, Xlri, And Mica Enabling World-class Education Accessible For Jaipurites',
  },
  {
    id: 'static-blog-2',
    image: 'images/home/new-girl.webp',
    title: 'Excellence in Business Education - IPS Business School Leading the Way',
  },
  {
    id: 'static-blog-3',
    image: 'images/home/new-girl.webp',
    title: 'Campus Life at IPS - Where Learning Meets Innovation',
  },
];

export default function CampusNews({ placementsNews = [], ipsNews = [], blogs = [] }) {
  const displayPlacementNews = placementsNews.length > 0 ? placementsNews : STATIC_PLACEMENT_NEWS;
  const displayIpsNews = ipsNews.length > 0 ? ipsNews : STATIC_IPS_NEWS;
  const displayBlogs = blogs.length > 0 ? blogs : STATIC_BLOGS;

  return (
    <section
      aria-label="Campus News"
      className="relative overflow-hidden pt-[80px] md:pt-[100px] pb-[40px] px-[16px] bg-white"
    >
      <div className="relative w-full max-w-[1202px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-[40px] md:mb-[60px] relative">
          <p className="absolute left-[50%] top-[-50%] md:top-[-70%] translate-x-[-50%] font-bold leading-tight figtree-font text-[60px] md:text-[100px] lg:text-[156px]">
            <span className="text-[#1B2E4A]/5 font-extrabold block">NEWS</span>
          </p>
          <h2 className="relative">
            <span className="text-[#1a237e] text-[32px] md:text-[40px] lg:text-[48px] font-bold figtree-font">
              Campus <span className="text-[#FF9E3D]">News</span>
            </span>
          </h2>
        </div>

        {/* News Grid — all 3 columns stretch to same height */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-6 items-stretch justify-center">
          {/* ── Left: Placements News ── */}
          <div className="w-full lg:w-[300px] xl:w-[340px] flex-shrink-0 flex flex-col">
            <h3 className="text-[#1B2E4A] text-[20px] md:text-[22px] font-bold mb-4 figtree-font">Placements News</h3>
            {/* card list fills remaining height equally */}
            <div className="flex flex-col gap-2 flex-1">
              {displayPlacementNews.map((news) => {
                const isStatic = news.id?.startsWith('static');
                const newsLink = isStatic ? '#' : `/campus-news/${news.slug}`;
                const imageUrl = isStatic
                  ? `${process.env.NEXT_PUBLIC_IMG_PATH}${news.image}`
                  : news.featuredImage?.url;

                return (
                  <Link
                    key={news._id || news.id}
                    href={newsLink}
                    className="flex gap-3 p-2.5 border border-[#c2c2c2] rounded-lg hover:bg-gray-50 transition-colors group flex-1 items-center"
                  >
                    {imageUrl && (
                      <div className="w-[64px] h-[64px] flex-shrink-0 rounded-lg overflow-hidden relative">
                        {isStatic ? (
                          <img
                            src={imageUrl}
                            alt={news.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                          />
                        ) : (
                          <Image
                            src={imageUrl}
                            alt={news.featuredImage?.alt || news.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                            sizes="64px"
                          />
                        )}
                      </div>
                    )}
                    <p className="text-[#1B2E4A] text-[12px] leading-snug line-clamp-3 font-medium flex-1">
                      {news.title}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ── Center: IPS Blogs Slider ── */}
          <div className="w-full lg:flex-1 lg:max-w-[460px] flex flex-col">
            <h3 className="text-[#1B2E4A] text-[20px] md:text-[22px] font-bold mb-4 figtree-font">IPS Blogs</h3>
            {/* flex-1 so it grows to match sibling column heights */}
            <div className="relative flex-1 rounded-xl overflow-hidden min-h-[260px]">
              <Swiper
                modules={[Autoplay, Navigation]}
                spaceBetween={0}
                slidesPerView={1}
                loop={displayBlogs.length > 1}
                autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                navigation={false}
                className="campus-news-main-slider h-full"
              >
                {displayBlogs.map((blog) => {
                  const isStatic = blog.id?.startsWith('static');
                  const blogLink = isStatic ? '#' : `/blogs/${blog.slug}`;
                  const imageUrl = isStatic
                    ? `${process.env.NEXT_PUBLIC_IMG_PATH}${blog.image}`
                    : blog.featuredImage?.url;

                  return (
                    <SwiperSlide key={blog._id || blog.id} className="h-full">
                      <Link href={blogLink} className="relative w-full h-full group cursor-pointer block">
                        {imageUrl && (
                          <>
                            {isStatic ? (
                              <img
                                src={imageUrl}
                                alt={blog.title}
                                className="absolute inset-0 w-full h-full object-cover"
                                loading="lazy"
                              />
                            ) : (
                              <Image
                                src={imageUrl}
                                alt={blog.featuredImage?.alt || blog.title}
                                fill
                                className="object-cover object-[10%_top]"
                                sizes="(max-width: 768px) 100vw, 420px"
                              />
                            )}
                          </>
                        )}
                        {/* gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                        {/* text content */}
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <span className="inline-block bg-[#C8501F] text-white text-[11px] font-semibold px-3 py-1 rounded-full mb-2">
                            IPS Blogs
                          </span>
                          <h4 className="text-white text-[15px] lg:text-[16px] font-bold leading-snug line-clamp-2 figtree-font">
                            {blog.title}
                          </h4>
                        </div>
                      </Link>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>

          {/* ── Right: IPS News ── */}
          <div className="w-full lg:w-[260px] xl:w-[220px] flex-shrink-0 flex flex-col">
            <h3 className="text-[#1B2E4A] text-[20px] md:text-[22px] font-bold mb-4 figtree-font">IPS News</h3>
            <div className="flex flex-col gap-3 flex-1">
              {displayIpsNews.slice(0, 2).map((news) => {
                const isStatic = news.id?.startsWith('static');
                const newsLink = isStatic ? '#' : `/campus-news/${news.slug}`;
                const imageUrl = isStatic
                  ? `${process.env.NEXT_PUBLIC_IMG_PATH}${news.image}`
                  : news.featuredImage?.url;

                return (
                  <Link
                    key={news._id || news.id}
                    href={newsLink}
                    className="rounded-xl overflow-hidden hover:shadow-lg transition-shadow group bg-white border border-gray-200 flex flex-col flex-1"
                  >
                    {imageUrl && (
                      <div className="relative w-full flex-1 min-h-[120px]">
                        {isStatic ? (
                          <img
                            src={imageUrl}
                            alt={news.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        ) : (
                          <Image
                            src={imageUrl}
                            alt={news.featuredImage?.alt || news.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 1024px) 50vw, 280px"
                          />
                        )}
                      </div>
                    )}
                    <div className="p-3 flex-shrink-0">
                      <p className="text-[#1B2E4A] text-[12px] leading-snug line-clamp-2 font-medium">{news.title}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        :global(.campus-news-main-slider) {
          width: 100%;
          height: 100%;
          position: absolute;
          inset: 0;
        }
        :global(.campus-news-main-slider .swiper-wrapper),
        :global(.campus-news-main-slider .swiper-slide) {
          height: 100%;
        }
        :global(.figtree-font) {
          font-family:
            'Figtree',
            -apple-system,
            BlinkMacSystemFont,
            'Segoe UI',
            sans-serif;
        }
      `}</style>
    </section>
  );
}
