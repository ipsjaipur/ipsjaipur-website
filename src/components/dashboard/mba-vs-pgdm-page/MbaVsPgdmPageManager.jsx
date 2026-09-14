'use client';

import MbaVsPgdmBannerEditor from './editors/MbaVsPgdmBannerEditor';
import MbaVsPgdmContentEditor from './editors/MbaVsPgdmContentEditor';
import MbaVsPgdmComparisonEditor from './editors/MbaVsPgdmComparisonEditor';
import MbaVsPgdmPageSectionsPage from './MbaVsPgdmPageSectionsPage';

const EDITOR_MAP = {
  banner: MbaVsPgdmBannerEditor,
  content: MbaVsPgdmContentEditor,
  comparison: MbaVsPgdmComparisonEditor,
};

/**
 * Renders either the section list (section = null) or the specific section editor.
 * Receives `section` as a prop from the server page (read from searchParams).
 */
export default function MbaVsPgdmPageManager({ section }) {
  if (!section) {
    return <MbaVsPgdmPageSectionsPage />;
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
            href="/dashboard/page-content/mba-vs-pgdm"
            className="mt-4 inline-block text-[13px] text-[#eb5905] hover:underline"
          >
            ← Back to MBA vs PGDM sections
          </a>
        </div>
      </div>
    );
  }

  return <Editor />;
}
