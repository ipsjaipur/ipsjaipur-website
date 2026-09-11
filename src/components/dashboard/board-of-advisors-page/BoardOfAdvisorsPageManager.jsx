'use client';

import BoardOfAdvisorsBannerEditor    from './editors/BoardOfAdvisorsBannerEditor';
import BoardOfAdvisorsAdvisorsEditor  from './editors/BoardOfAdvisorsAdvisorsEditor';
import BoardOfAdvisorsBridgingEditor  from './editors/BoardOfAdvisorsBridgingEditor';
import BoardOfAdvisorsPageSectionsPage from './BoardOfAdvisorsPageSectionsPage';

const EDITOR_MAP = {
  banner:   BoardOfAdvisorsBannerEditor,
  advisors: BoardOfAdvisorsAdvisorsEditor,
  bridging: BoardOfAdvisorsBridgingEditor,
};

/**
 * Renders either the section list (section = null) or the specific section editor.
 * Receives `section` as a prop from the server page (read from searchParams).
 */
export default function BoardOfAdvisorsPageManager({ section }) {
  if (!section) {
    return <BoardOfAdvisorsPageSectionsPage />;
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
            href="/dashboard/page-content/board-of-advisors"
            className="mt-4 inline-block text-[13px] text-[#eb5905] hover:underline"
          >
            ← Back to Board of Advisors sections
          </a>
        </div>
      </div>
    );
  }

  return <Editor />;
}
