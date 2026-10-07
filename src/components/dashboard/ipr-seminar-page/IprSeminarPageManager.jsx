'use client';

import IprConfigEditor     from './editors/IprConfigEditor';
import IprHeroEditor       from './editors/IprHeroEditor';
import IprTopicsEditor     from './editors/IprTopicsEditor';
import IprAboutEditor      from './editors/IprAboutEditor';
import IprTakeawaysEditor  from './editors/IprTakeawaysEditor';
import IprAudienceEditor   from './editors/IprAudienceEditor';
import IprAgendaEditor     from './editors/IprAgendaEditor';
import IprFaqEditor        from './editors/IprFaqEditor';
import IprCtaEditor        from './editors/IprCtaEditor';
import IprSeminarPageSectionsPage from './IprSeminarPageSectionsPage';

const EDITOR_MAP = {
  config:     IprConfigEditor,
  hero:       IprHeroEditor,
  topics:     IprTopicsEditor,
  about:      IprAboutEditor,
  takeaways:  IprTakeawaysEditor,
  audience:   IprAudienceEditor,
  agenda:     IprAgendaEditor,
  faq:        IprFaqEditor,
  cta:        IprCtaEditor,
};

/**
 * Renders either the section list (section = null) or the specific section editor.
 * `section` prop is read from searchParams by the server page and passed down.
 */
export default function IprSeminarPageManager({ section }) {
  if (!section) {
    return <IprSeminarPageSectionsPage />;
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
            href="/dashboard/page-content/ipr-seminar"
            className="mt-4 inline-block text-[13px] text-[#eb5905] hover:underline"
          >
            ← Back to IPR Seminar sections
          </a>
        </div>
      </div>
    );
  }

  return <Editor />;
}
