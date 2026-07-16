import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

// pageName   — current page title (string)
// detailPage — array of parent crumbs: [{ slug: 'blogs', title: 'Blogs' }, ...]
export default function Breadcrumb({ pageName, detailPage = [] }) {
  return (
    <div className="w-full bg-white py-[15px] border-b border-[#e5e5e5]">
      <div className="max-w-[1320px] mx-auto lg:px-8 px-[16px] xl:px-0">
        <ul className="flex items-center flex-nowrap m-0 p-0 list-none font-['rubik',sans-serif] text-[13px] md:text-[15px]">
          <li className="relative text-black flex items-center">
            <Link href="/" className="text-black font-medium hover:text-[#e67e22] transition-colors">
              Home
            </Link>
          </li>

          {detailPage.map((crumb) => (
            <React.Fragment key={crumb.slug}>
              <span className="ml-[7px] mr-[7px] text-black font-extrabold">
                <ChevronRight size={16} />
              </span>
              <li className="text-black transition-colors">
                <Link
                  href={`/${crumb.slug}`}
                  className="text-black line-clamp-1 font-medium hover:text-[#e67e22] transition-colors"
                >
                  {crumb.title}
                </Link>
              </li>
            </React.Fragment>
          ))}

          <span className="ml-[7px] mr-[7px] text-black font-extrabold">
            <ChevronRight size={16} />
          </span>
          <li className="text-black/50 transition-colors line-clamp-1">{pageName}</li>
        </ul>
      </div>
    </div>
  );
}
