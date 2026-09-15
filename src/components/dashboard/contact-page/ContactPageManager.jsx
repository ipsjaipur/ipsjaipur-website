'use client';

import ContactBannerEditor from './editors/ContactBannerEditor';
import ContactInfoEditor from './editors/ContactInfoEditor';
import ContactPageSectionsPage from './ContactPageSectionsPage';

const EDITOR_MAP = {
  banner: ContactBannerEditor,
  info:   ContactInfoEditor,
};

export default function ContactPageManager({ section }) {
  if (!section) {
    return <ContactPageSectionsPage />;
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
            href="/dashboard/page-content/contact"
            className="mt-4 inline-block text-[13px] text-[#eb5905] hover:underline"
          >
            ← Back to Contact Page sections
          </a>
        </div>
      </div>
    );
  }

  return <Editor />;
}
