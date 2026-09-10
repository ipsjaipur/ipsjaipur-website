'use client';

// Section editors
import MBABannerEditor from './editors/MBABannerEditor';
import MBAOverviewEditor from './editors/MBAOverviewEditor';
import MBASyllabusEditor from './editors/MBASyllabusEditor';
import MBASpecializationsEditor from './editors/MBASpecializationsEditor';
import MBAAdmissionEditor from './editors/MBAAdmissionEditor';
import MBADocumentsEditor from './editors/MBADocumentsEditor';
import MBASelectionEditor from './editors/MBASelectionEditor';
import MBAFeeEditor from './editors/MBAFeeEditor';
import MBAFAQEditor from './editors/MBAFAQEditor';
import MBASidebarEditor from './editors/MBASidebarEditor';

// Sections list
import MBAPageSectionsPage from './MBAPageSectionsPage';

const EDITOR_MAP = {
  banner:              MBABannerEditor,
  overview:            MBAOverviewEditor,
  syllabus:            MBASyllabusEditor,
  specializations:     MBASpecializationsEditor,
  admissionProcess:    MBAAdmissionEditor,
  documentsRequired:   MBADocumentsEditor,
  selectionProcedure:  MBASelectionEditor,
  feeStructure:        MBAFeeEditor,
  faq:                 MBAFAQEditor,
  sidebar:             MBASidebarEditor,
};

/**
 * Renders either the section list (section = null) or the specific section editor.
 * Receives `section` as a prop from the server page (read from searchParams).
 */
export default function MBAPageManager({ section }) {
  if (!section) {
    return <MBAPageSectionsPage />;
  }

  const Editor = EDITOR_MAP[section];

  if (!Editor) {
    return (
      <div className="max-w-[860px] mx-auto">
        <div className="bg-white rounded-2xl border border-red-200 p-8 text-center">
          <p className="text-[15px] font-semibold text-red-600">Unknown section: &quot;{section}&quot;</p>
          <a
            href="/dashboard/page-content/mba"
            className="mt-4 inline-block text-[13px] text-[#eb5905] hover:underline"
          >
            ← Back to MBA Page sections
          </a>
        </div>
      </div>
    );
  }

  return <Editor />;
}
