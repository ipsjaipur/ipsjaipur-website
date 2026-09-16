'use client';

import CareerSectionEditorShell from '../CareerSectionEditorShell';

export default function CareerIntroEditor() {
  return (
    <CareerSectionEditorShell
      sectionKey="intro"
      title="Introduction"
      description="Opening paragraph about IPS legacy and industry leadership shown at the top of the career page."
    >
      {(data, setData) => {
        const set = (key) => (val) => setData({ ...data, [key]: val });

        return (
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
            <h2 className="text-[14px] font-bold text-[#222]">Introduction Paragraph</h2>
            <p className="text-[12px] text-[#77838f]">
              Displayed at the top of the career content block as the opening statement about IPS.
            </p>
            <div>
              <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                Paragraph Text
              </label>
              <textarea
                value={data?.introParagraph || ''}
                onChange={(e) => set('introParagraph')(e.target.value)}
                rows={5}
                placeholder="IPS BUSINESS SCHOOL has been a flag bearer…"
                className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition resize-y"
              />
            </div>
          </div>
        );
      }}
    </CareerSectionEditorShell>
  );
}
