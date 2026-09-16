'use client';

import { PlusCircle, Trash2, GripVertical } from 'lucide-react';
import CareerSectionEditorShell from '../CareerSectionEditorShell';

export default function CareerPerksEditor() {
  return (
    <CareerSectionEditorShell
      sectionKey="perks"
      title="Perks / Why Join"
      description='"If you have it in you" section — heading and the list of benefits / opportunities.'
    >
      {(data, setData) => {
        const perks = data?.perks || [];

        function updateHeading(val) {
          setData({ ...data, perksHeading: val });
        }

        function updatePerk(idx, val) {
          const next = perks.map((p, i) => (i === idx ? { ...p, text: val } : p));
          setData({ ...data, perks: next });
        }

        function addPerk() {
          const next = [...perks, { text: '', order: perks.length }];
          setData({ ...data, perks: next });
        }

        function removePerk(idx) {
          const next = perks
            .filter((_, i) => i !== idx)
            .map((p, i) => ({ ...p, order: i }));
          setData({ ...data, perks: next });
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
                  value={data?.perksHeading || ''}
                  onChange={(e) => updateHeading(e.target.value)}
                  placeholder="If you have it in you, IPS BUSINESS SCHOOL is the right place for you"
                  className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
                />
              </div>
            </div>

            {/* Perks list */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-[14px] font-bold text-[#222]">Perk / Benefit Items</h2>
                <button
                  type="button"
                  onClick={addPerk}
                  className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#eb5905] border border-[#eb5905]/30 rounded-lg px-3 py-1.5 hover:bg-[#eb5905]/5 transition cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  Add Item
                </button>
              </div>

              {perks.length === 0 && (
                <p className="text-[12px] text-[#77838f] italic">
                  No items yet — click &ldquo;Add Item&rdquo; to get started.
                </p>
              )}

              <div className="space-y-3">
                {perks.map((perk, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <GripVertical className="w-4 h-4 text-[#aab4bf] mt-2.5 shrink-0" />
                    <textarea
                      value={perk.text || ''}
                      onChange={(e) => updatePerk(idx, e.target.value)}
                      rows={2}
                      placeholder={`Perk ${idx + 1}`}
                      className="flex-1 border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition resize-y"
                    />
                    <button
                      type="button"
                      onClick={() => removePerk(idx)}
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
