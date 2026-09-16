'use client';

import { PlusCircle, Trash2, GripVertical } from 'lucide-react';
import CareerSectionEditorShell from '../CareerSectionEditorShell';

export default function CareerRequirementsEditor() {
  return (
    <CareerSectionEditorShell
      sectionKey="requirements"
      title="Requirements"
      description='"We are looking for" section — heading and the list of professional requirements.'
    >
      {(data, setData) => {
        const reqs = data?.requirements || [];

        function updateHeading(val) {
          setData({ ...data, requirementsHeading: val });
        }

        function updateReq(idx, val) {
          const next = reqs.map((r, i) => (i === idx ? { ...r, text: val } : r));
          setData({ ...data, requirements: next });
        }

        function addReq() {
          const next = [...reqs, { text: '', order: reqs.length }];
          setData({ ...data, requirements: next });
        }

        function removeReq(idx) {
          const next = reqs
            .filter((_, i) => i !== idx)
            .map((r, i) => ({ ...r, order: i }));
          setData({ ...data, requirements: next });
        }

        return (
          <>
            {/* Section heading */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Section Heading</h2>
              <div>
                <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                  Heading Text
                </label>
                <input
                  type="text"
                  value={data?.requirementsHeading || ''}
                  onChange={(e) => updateHeading(e.target.value)}
                  placeholder="We are looking for the professionals who are:"
                  className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
                />
              </div>
            </div>

            {/* Requirements list */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-[14px] font-bold text-[#222]">Requirement Items</h2>
                <button
                  type="button"
                  onClick={addReq}
                  className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#eb5905] border border-[#eb5905]/30 rounded-lg px-3 py-1.5 hover:bg-[#eb5905]/5 transition cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  Add Item
                </button>
              </div>

              {reqs.length === 0 && (
                <p className="text-[12px] text-[#77838f] italic">
                  No items yet — click &ldquo;Add Item&rdquo; to get started.
                </p>
              )}

              <div className="space-y-3">
                {reqs.map((req, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <GripVertical className="w-4 h-4 text-[#aab4bf] mt-2.5 shrink-0" />
                    <textarea
                      value={req.text || ''}
                      onChange={(e) => updateReq(idx, e.target.value)}
                      rows={2}
                      placeholder={`Requirement ${idx + 1}`}
                      className="flex-1 border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition resize-y"
                    />
                    <button
                      type="button"
                      onClick={() => removeReq(idx)}
                      className="p-2 text-[#aab4bf] hover:text-red-500 transition cursor-pointer shrink-0 mt-0.5"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
      }}
    </CareerSectionEditorShell>
  );
}
