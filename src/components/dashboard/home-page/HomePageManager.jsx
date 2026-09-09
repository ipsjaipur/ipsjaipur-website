'use client';

// Section editors
import BannerEditor from './editors/BannerEditor';
import ApprovalsEditor from './editors/ApprovalsEditor';
import MethodologyEditor from './editors/MethodologyEditor';
import PathwayEditor from './editors/PathwayEditor';
import ProgramsEditor from './editors/ProgramsEditor';
import PlacementsEditor from './editors/PlacementsEditor';
import VideoGalleryEditor from './editors/VideoGalleryEditor';
import AchieversEditor from './editors/AchieversEditor';
import TestimonialsEditor from './editors/TestimonialsEditor';

// Sections list
import HomePageSectionsPage from './HomePageSectionsPage';

const EDITOR_MAP = {
  banner: BannerEditor,
  approvals: ApprovalsEditor,
  methodology: MethodologyEditor,
  pathway: PathwayEditor,
  programs: ProgramsEditor,
  placements: PlacementsEditor,
  videoGallery: VideoGalleryEditor,
  achievers: AchieversEditor,
  testimonials: TestimonialsEditor,
};

/**
 * Renders either the section list (section = null) or the specific section editor.
 * Receives `section` as a prop from the server page (read from searchParams).
 */
export default function HomePageManager({ section }) {
  if (!section) {
    return <HomePageSectionsPage />;
  }

  const Editor = EDITOR_MAP[section];

  if (!Editor) {
    return (
      <div className="max-w-[860px] mx-auto">
        <div className="bg-white rounded-2xl border border-red-200 p-8 text-center">
          <p className="text-[15px] font-semibold text-red-600">Unknown section: &quot;{section}&quot;</p>
          <a
            href="/dashboard/page-content/home"
            className="mt-4 inline-block text-[13px] text-[#eb5905] hover:underline"
          >
            ← Back to Home Page sections
          </a>
        </div>
      </div>
    );
  }

  return <Editor />;
}
