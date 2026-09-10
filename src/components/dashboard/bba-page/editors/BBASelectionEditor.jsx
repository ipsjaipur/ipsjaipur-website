'use client';

import BBASectionEditorShell from '../BBASectionEditorShell';
import SortableList from '../../home-page/SortableList';

function SelectionStepItem(item, index, update) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div>
        <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Step Label</label>
        <input type="text" value={item.stepLabel || ''} onChange={(e) => update({ stepLabel: e.target.value })}
          placeholder="Step 1"
          className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition" />
      </div>
      <div className="sm:col-span-2">
        <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Description</label>
        <textarea rows={2} value={item.description || ''} onChange={(e) => update({ description: e.target.value })}
          placeholder="What happens in this step…"
          className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition resize-none" />
      </div>
    </div>
  );
}

export default function BBASelectionEditor() {
  return (
    <BBASectionEditorShell sectionKey="selectionProcedure" title="Selection Procedure"
      description="Step-by-step selection process shown on the BBA page.">
      {(data, setData) => (
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
          <div className="mb-4">
            <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Section Heading</label>
            <input type="text" value={data?.selectionHeading || ''} onChange={(e) => setData({ ...data, selectionHeading: e.target.value })}
              placeholder="Selection Procedure:"
              className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition" />
          </div>
          <h2 className="text-[14px] font-bold text-[#222] mb-1">Selection Steps</h2>
          <p className="text-[12px] text-[#77838f] mb-4">Each step renders its label in bold, followed by the description.</p>
          <SortableList items={data?.selectionSteps || []} onChange={(selectionSteps) => setData({ ...data, selectionSteps })}
            renderItem={SelectionStepItem}
            onAdd={() => ({ stepLabel: `Step ${(data?.selectionSteps?.length || 0) + 1}`, description: '', order: 0 })}
            addLabel="Add Step" />
        </div>
      )}
    </BBASectionEditorShell>
  );
}
