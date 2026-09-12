'use client';

import PlacementsStatsEditor from './editors/PlacementsStatsEditor';
import PlacementsUpdatesEditor from './editors/PlacementsUpdatesEditor';
import PlacementsResumeBookEditor from './editors/PlacementsResumeBookEditor';
import PlacementsFAQEditor from './editors/PlacementsFAQEditor';
import PlacementsCoordinatorEditor from './editors/PlacementsCoordinatorEditor';
import PlacementsBannerEditor from './editors/PlacementsBannerEditor';
import PlacementsPageSectionsPage from './PlacementsPageSectionsPage';

const EDITOR_MAP = {
  banner: PlacementsBannerEditor,
  stats: PlacementsStatsEditor,
  updates: PlacementsUpdatesEditor,
  resumeBook: PlacementsResumeBookEditor,
  faq: PlacementsFAQEditor,
  coordinator: PlacementsCoordinatorEditor,
};

/**
 * Renders either the section list (section = null) or the specific section editor.
 * Receives `section` as a prop from the server page (read from searchParams).
 */
export default function PlacementsPageManager({ section }) {
  if (!section) {
    return <PlacementsPageSectionsPage />;
  }

  const Editor = EDITOR_MAP[section];

  if (!Editor) {
    return (
      <div className="max-w-[860px] mx-auto">
        <div className="bg-white rounded-2xl border border-red-200 p-8 text-center">
          <p className="text-[15px] font-semibold text-red-600">Unknown section: &quot;{section}&quot;</p>
          <a
            href="/dashboard/page-content/placements"
            className="mt-4 inline-block text-[13px] text-[#eb5905] hover:underline"
          >
            ← Back to Placements Page sections
          </a>
        </div>
      </div>
    );
  }

  return <Editor />;
}
