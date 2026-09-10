'use client';

import BCASectionEditorShell from '../BCASectionEditorShell';
import SortableList from '../../home-page/SortableList';

function AdmissionStepItem(item, index, update) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Mode Label</label>
        <input type="text" value={item.label || ''} onChange={(e) => update({ label: e.target.value })}
          placeholder="e.g. Online"
          className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition" />
      </div>
      <div>
        <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Description</label>
        <textarea rows={2} value={item.description || ''} onChange={(e) => update({ description: e.target.value })}
          placeholder="Application form can also be filled & submitted online…"
          className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition resize-none" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Link Text (optional)</label>
          <input type="text" value={item.linkText || ''} onChange={(e) => update({ linkText: e.target.value })}
            placeholder="Click Here to Apply Online"
            className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition" />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Link URL (optional)</label>
          <input type="text" value={item.linkHref || ''} onChange={(e) => update({ linkHref: e.target.value })}
            placeholder="https://… or #"
            className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition" />
        </div>
      </div>
    </div>
  );
}

export default function BCAAdmissionEditor() {
  return (
    <BCASectionEditorShell sectionKey="admissionProcess" title="Admission Process"
      description="Heading, intro text, and admission mode steps (Online / Offline).">
      {(data, setData) => (
        <>
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
            <h2 className="text-[14px] font-bold text-[#222]">Section Text</h2>
            <div>
              <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Heading</label>
              <input type="text" value={data?.admissionHeading || ''}
                onChange={(e) => setData({ ...data, admissionHeading: e.target.value })}
                placeholder="How to Apply:"
                className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition" />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Intro Text</label>
              <textarea rows={2} value={data?.admissionIntro || ''}
                onChange={(e) => setData({ ...data, admissionIntro: e.target.value })}
                placeholder="Optional introductory text before the steps…"
                className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition resize-none" />
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
            <h2 className="text-[14px] font-bold text-[#222] mb-1">Admission Steps</h2>
            <p className="text-[12px] text-[#77838f] mb-4">Each step shows as <strong>Label :</strong> Description.</p>
            <SortableList items={data?.admissionSteps || []}
              onChange={(admissionSteps) => setData({ ...data, admissionSteps })}
              renderItem={AdmissionStepItem}
              onAdd={() => ({ label: '', description: '', linkText: '', linkHref: '', order: 0 })}
              addLabel="Add Step" />
          </div>
        </>
      )}
    </BCASectionEditorShell>
  );
}
