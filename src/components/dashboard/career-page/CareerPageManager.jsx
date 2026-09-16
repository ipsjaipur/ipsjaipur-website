'use client';

import CareerBannerEditor from './editors/CareerBannerEditor';
import CareerPageDataEditor from './editors/CareerPageDataEditor';
import CareerPageSectionsPage from './CareerPageSectionsPage';

const EDITOR_MAP = {
  banner: CareerBannerEditor,
  page_data: CareerPageDataEditor,
};

export default function CareerPageManager({ section }) {
  if (!section) {
    return <CareerPageSectionsPage />;
  }

  const Editor = EDITOR_MAP[section];

  if (!Editor) {
    return (
      <div className="max-w-[860px] mx-auto">
        <div className="bg-white rounded-2xl border border-red-200 p-8 text-center">
          <p className="text-[15px] font-semibold text-red-600">Unknown section: &quot;{section}&quot;</p>
          <a
            href="/dashboard/page-content/career"
            className="mt-4 inline-block text-[13px] text-[#eb5905] hover:underline"
          >
            ← Back to Career Page sections
          </a>
        </div>
      </div>
    );
  }

  return <Editor />;
}
