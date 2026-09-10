'use client';

import BBASectionEditorShell from '../BBASectionEditorShell';

export default function BBAFeeEditor() {
  return (
    <BBASectionEditorShell sectionKey="feeStructure" title="Fee Structure"
      description="Heading and scholarship contact text shown in the fee section.">
      {(data, setData) => {
        const set = (key) => (val) => setData({ ...data, [key]: val });
        const cls = 'w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition';
        return (
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
            <h2 className="text-[14px] font-bold text-[#222]">Fee Section Content</h2>
            <div>
              <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Section Heading</label>
              <input type="text" value={data?.feeHeading || ''} onChange={(e) => set('feeHeading')(e.target.value)}
                placeholder="Fee Structure of BBA" className={cls} />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Scholarship Text (English)</label>
              <textarea rows={3} value={data?.feeEnglishText || ''} onChange={(e) => set('feeEnglishText')(e.target.value)}
                placeholder="Scholarship is Available on the basis of Academic Performance…" className={`${cls} resize-none`} />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Scholarship Text (Hindi)</label>
              <textarea rows={3} value={data?.feeHindiText || ''} onChange={(e) => set('feeHindiText')(e.target.value)}
                placeholder="छात्रवृत्ति शैक्षणिक प्रदर्शन एवं साइको मैट्रिक्स टेस्ट के आधार पर…" className={`${cls} resize-none`} />
            </div>
            <p className="text-[12px] text-[#77838f] bg-[#f8f9fa] rounded-lg p-3">
              Both texts are displayed centred and bold on the page. Leave a field blank to hide it.
            </p>
          </div>
        );
      }}
    </BBASectionEditorShell>
  );
}
