'use client';

import BannerEditor from './editors/BannerEditor';
import CampusEditor from './editors/CampusEditor';
import StudentClubEditor from './editors/StudentClubEditor';
import SportsClubEditor from './editors/SportsClubEditor';
import IndoorGamesEditor from './editors/IndoorGamesEditor';
import CommitteesEditor from './editors/CommitteesEditor';
import SidebarEditor from './editors/SidebarEditor';
import StudentLifePageSectionsPage from './StudentLifePageSectionsPage';

const EDITOR_MAP = {
  banner:          BannerEditor,
  campus:          CampusEditor,
  'student-club':  StudentClubEditor,
  'sports-club':   SportsClubEditor,
  'indoor-games':  IndoorGamesEditor,
  committees:      CommitteesEditor,
  sidebar:         SidebarEditor,
};

/**
 * Renders either the section list (section = null) or the specific section editor.
 * Receives `section` as a prop from the server page (read from searchParams).
 */
export default function StudentLifePageManager({ section }) {
  if (!section) {
    return <StudentLifePageSectionsPage />;
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
            href="/dashboard/page-content/student-life"
            className="mt-4 inline-block text-[13px] text-[#eb5905] hover:underline"
          >
            ← Back to Student Life Page sections
          </a>
        </div>
      </div>
    );
  }

  return <Editor />;
}
