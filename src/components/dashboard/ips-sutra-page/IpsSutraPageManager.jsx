'use client';

import IpsSutraContentEditor    from './editors/IpsSutraContentEditor';
import IpsSutraAdvantagesEditor from './editors/IpsSutraAdvantagesEditor';
import IpsSutraPageSectionsPage from './IpsSutraPageSectionsPage';

const EDITOR_MAP = {
  content:    IpsSutraContentEditor,
  advantages: IpsSutraAdvantagesEditor,
};

export default function IpsSutraPageManager({ section }) {
  if (!section) return <IpsSutraPageSectionsPage />;

  const Editor = EDITOR_MAP[section];

  if (!Editor) {
    return (
      <div className="max-w-[860px] mx-auto">
        <div className="bg-white rounded-2xl border border-red-200 p-8 text-center">
          <p className="text-[15px] font-semibold text-red-600">
            Unknown section: &quot;{section}&quot;
          </p>
          <a
            href="/dashboard/page-content/ips-sutra"
            className="mt-4 inline-block text-[13px] text-[#eb5905] hover:underline"
          >
            ← Back to IPS Sutra Page sections
          </a>
        </div>
      </div>
    );
  }

  return <Editor />;
}
