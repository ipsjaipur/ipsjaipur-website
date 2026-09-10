'use client';

import BCASectionEditorShell from '../BCASectionEditorShell';
import SortableList from '../../home-page/SortableList';

function DocumentItem(item, index, update) {
  return (
    <div className="space-y-2">
      <div>
        <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Document Text</label>
        <textarea rows={2} value={item.text || ''} onChange={(e) => update({ text: e.target.value })}
          placeholder="Document name or description…"
          className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition resize-none" />
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" id={`bca-doc-bold-${index}`} checked={!!item.isBold}
          onChange={(e) => update({ isBold: e.target.checked })} className="w-4 h-4 accent-[#eb5905]" />
        <label htmlFor={`bca-doc-bold-${index}`} className="text-[13px] font-medium text-[#4a5568]">Show as bold text</label>
      </div>
    </div>
  );
}

export default function BCADocumentsEditor() {
  return (
    <BCASectionEditorShell sectionKey="documentsRequired" title="Documents Required"
      description="List of documents students need to submit for BCA admission.">
      {(data, setData) => (
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
          <div className="mb-4">
            <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Section Heading</label>
            <input type="text" value={data?.documentsHeading || ''}
              onChange={(e) => setData({ ...data, documentsHeading: e.target.value })}
              placeholder="Documents Required:"
              className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition" />
          </div>
          <h2 className="text-[14px] font-bold text-[#222] mb-1">Document List</h2>
          <p className="text-[12px] text-[#77838f] mb-4">Each item appears with a lightbulb icon. Check &quot;bold&quot; for important items.</p>
          <SortableList items={data?.documents || []}
            onChange={(documents) => setData({ ...data, documents })}
            renderItem={DocumentItem}
            onAdd={() => ({ text: '', isBold: false, order: 0 })}
            addLabel="Add Document" />
        </div>
      )}
    </BCASectionEditorShell>
  );
}
