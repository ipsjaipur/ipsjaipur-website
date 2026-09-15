'use client';

import MissionVisionBannerEditor       from './editors/MissionVisionBannerEditor';
import MissionVisionInstitutionalEditor from './editors/MissionVisionInstitutionalEditor';
import MissionVisionCardsEditor         from './editors/MissionVisionCardsEditor';
import MissionVisionCoreValuesEditor    from './editors/MissionVisionCoreValuesEditor';
import MissionVisionPageSectionsPage    from './MissionVisionPageSectionsPage';

const EDITOR_MAP = {
  banner:          MissionVisionBannerEditor,
  institutional:   MissionVisionInstitutionalEditor,
  vision_mission:  MissionVisionCardsEditor,
  core_values:     MissionVisionCoreValuesEditor,
};

export default function MissionVisionPageManager({ section }) {
  if (!section) {
    return <MissionVisionPageSectionsPage />;
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
            href="/dashboard/page-content/mission-vision"
            className="mt-4 inline-block text-[13px] text-[#eb5905] hover:underline"
          >
            ← Back to Mission &amp; Vision Page sections
          </a>
        </div>
      </div>
    );
  }

  return <Editor />;
}
