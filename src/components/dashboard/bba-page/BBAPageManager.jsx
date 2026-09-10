'use client';

import BBABannerEditor       from './editors/BBABannerEditor';
import BBAOverviewEditor     from './editors/BBAOverviewEditor';
import BBASyllabusEditor     from './editors/BBASyllabusEditor';
import BBASpecializationsEditor from './editors/BBASpecializationsEditor';
import BBAAdmissionEditor    from './editors/BBAAdmissionEditor';
import BBADocumentsEditor    from './editors/BBADocumentsEditor';
import BBASelectionEditor    from './editors/BBASelectionEditor';
import BBAFeeEditor          from './editors/BBAFeeEditor';
import BBAFAQEditor          from './editors/BBAFAQEditor';
import BBASidebarEditor      from './editors/BBASidebarEditor';
import BBAPageSectionsPage   from './BBAPageSectionsPage';

const EDITOR_MAP = {
  banner:              BBABannerEditor,
  overview:            BBAOverviewEditor,
  syllabus:            BBASyllabusEditor,
  specializations:     BBASpecializationsEditor,
  admissionProcess:    BBAAdmissionEditor,
  documentsRequired:   BBADocumentsEditor,
  selectionProcedure:  BBASelectionEditor,
  feeStructure:        BBAFeeEditor,
  faq:                 BBAFAQEditor,
  sidebar:             BBASidebarEditor,
};

export default function BBAPageManager({ section }) {
  if (!section) return <BBAPageSectionsPage />;

  const Editor = EDITOR_MAP[section];

  if (!Editor) {
    return (
      <div className="max-w-[860px] mx-auto">
        <div className="bg-white rounded-2xl border border-red-200 p-8 text-center">
          <p className="text-[15px] font-semibold text-red-600">Unknown section: &quot;{section}&quot;</p>
          <a href="/dashboard/page-content/bba"
            className="mt-4 inline-block text-[13px] text-[#eb5905] hover:underline">
            ← Back to BBA Page sections
          </a>
        </div>
      </div>
    );
  }

  return <Editor />;
}
