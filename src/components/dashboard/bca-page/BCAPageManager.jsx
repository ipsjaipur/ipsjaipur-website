'use client';

import BCABannerEditor          from './editors/BCABannerEditor';
import BCAOverviewEditor        from './editors/BCAOverviewEditor';
import BCASyllabusEditor        from './editors/BCASyllabusEditor';
import BCASpecializationsEditor from './editors/BCASpecializationsEditor';
import BCAAdmissionEditor       from './editors/BCAAdmissionEditor';
import BCADocumentsEditor       from './editors/BCADocumentsEditor';
import BCASelectionEditor       from './editors/BCASelectionEditor';
import BCAFeeEditor             from './editors/BCAFeeEditor';
import BCAFAQEditor             from './editors/BCAFAQEditor';
import BCASidebarEditor         from './editors/BCASidebarEditor';
import BCAPageSectionsPage      from './BCAPageSectionsPage';

const EDITOR_MAP = {
  banner:              BCABannerEditor,
  overview:            BCAOverviewEditor,
  syllabus:            BCASyllabusEditor,
  specializations:     BCASpecializationsEditor,
  admissionProcess:    BCAAdmissionEditor,
  documentsRequired:   BCADocumentsEditor,
  selectionProcedure:  BCASelectionEditor,
  feeStructure:        BCAFeeEditor,
  faq:                 BCAFAQEditor,
  sidebar:             BCASidebarEditor,
};

export default function BCAPageManager({ section }) {
  if (!section) return <BCAPageSectionsPage />;

  const Editor = EDITOR_MAP[section];

  if (!Editor) {
    return (
      <div className="max-w-[860px] mx-auto">
        <div className="bg-white rounded-2xl border border-red-200 p-8 text-center">
          <p className="text-[15px] font-semibold text-red-600">Unknown section: &quot;{section}&quot;</p>
          <a href="/dashboard/page-content/bca"
            className="mt-4 inline-block text-[13px] text-[#eb5905] hover:underline">
            ← Back to BCA Page sections
          </a>
        </div>
      </div>
    );
  }

  return <Editor />;
}
