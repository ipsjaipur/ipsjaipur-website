'use client';

import BBASectionEditorShell from '../BBASectionEditorShell';
import SortableList from '../../home-page/SortableList';
import PdfUpload from '../../home-page/PdfUpload';

function SyllabusItem(item, index, update) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Label</label>
        <input type="text" value={item.name || ''} onChange={(e) => update({ name: e.target.value })}
          placeholder="e.g. BBA RTU Syllabus"
          className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition" />
      </div>
      <PdfUpload label="PDF File" value={item.pdfFile || ''} onChange={(pdfFile) => update({ pdfFile })} />
    </div>
  );
}

export default function BBASyllabusEditor() {
  return (
    <BBASectionEditorShell sectionKey="syllabus" title="Syllabus" description="Manage syllabus PDF download links shown on the BBA page.">
      {(data, setData) => (
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
          <div className="mb-4">
            <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Section Heading</label>
            <input type="text" value={data?.syllabusHeading || ''} onChange={(e) => setData({ ...data, syllabusHeading: e.target.value })}
              placeholder="SYLLABUS:"
              className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition" />
          </div>
          <h2 className="text-[14px] font-bold text-[#222] mb-1">Syllabus Items</h2>
          <p className="text-[12px] text-[#77838f] mb-4">Upload a PDF or paste an existing URL. Each item renders as a clickable download link.</p>
          <SortableList
            items={data?.syllabusItems || []}
            onChange={(syllabusItems) => setData({ ...data, syllabusItems })}
            renderItem={SyllabusItem}
            onAdd={() => ({ name: '', pdfFile: '', order: 0 })}
            addLabel="Add Syllabus Item"
          />
        </div>
      )}
    </BBASectionEditorShell>
  );
}
