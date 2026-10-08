'use client';

import BannerEditor from './editors/BannerEditor';
import ActivitiesEditor from './editors/ActivitiesEditor';
import LifeAtIpsPageSectionsPage from './LifeAtIpsPageSectionsPage';

const EDITOR_MAP = {
  banner:     BannerEditor,
  activities: ActivitiesEditor,
};

/**
 * Renders either the section list (section = null) or the specific section editor.
 * Receives `section` as a prop from the server page (read from searchParams).
 */
export default function LifeAtIpsPageManager({ section }) {
  if (!section) {
    return <LifeAtIpsPageSectionsPage />;
  }

  const Editor = EDITOR_MAP[section];

  if (!Editor) {
    return (
      <div className="max-w-[860px] mx-auto">
        <div className="bg-white rounded-2xl border border-red-200 p-8 text-center">
          <p className="text-[15px] font-semibold text-red-600">
            Unknown section: &quot;{section}&quot;
          </p>
          <a
            href="/dashboard/page-content/life-at-ips"
            className="mt-4 inline-block text-[13px] text-[#eb5905] hover:underline"
          >
            ← Back to Life at IPS Page sections
          </a>
        </div>
      </div>
    );
  }

  return <Editor />;
}
