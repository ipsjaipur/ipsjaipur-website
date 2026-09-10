'use client';

import { useState } from 'react';
import BCASectionEditorShell from '../BCASectionEditorShell';
import SortableList from '../../home-page/SortableList';
import { ChevronDown } from 'lucide-react';

function FAQItem({ item, index, update }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="space-y-2">
      <div>
        <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Question</label>
        <input type="text" value={item.question || ''} onChange={(e) => update({ question: e.target.value })}
          placeholder="FAQ question…"
          className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition" />
      </div>
      <button type="button" onClick={() => setExpanded((v) => !v)}
        className="flex items-center gap-1 text-[11px] text-[#eb5905] font-semibold hover:underline cursor-pointer">
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        {expanded ? 'Hide Answer' : 'Edit Answer'}
      </button>
      {expanded && (
        <div>
          <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Answer</label>
          <textarea rows={4} value={item.answer || ''} onChange={(e) => update({ answer: e.target.value })}
            placeholder="FAQ answer…"
            className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition resize-none" />
        </div>
      )}
    </div>
  );
}

export default function BCAFAQEditor() {
  return (
    <BCASectionEditorShell sectionKey="faq" title="FAQ"
      description="Manage frequently asked questions shown on the BCA page.">
      {(data, setData) => (
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
          <div className="mb-4">
            <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Section Heading</label>
            <input type="text" value={data?.faqHeading || ''}
              onChange={(e) => setData({ ...data, faqHeading: e.target.value })}
              placeholder="Frequently Asked Questions"
              className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition" />
          </div>
          <h2 className="text-[14px] font-bold text-[#222] mb-1">
            FAQ Items
            <span className="ml-2 text-[12px] font-normal text-[#77838f]">({data?.faqs?.length || 0} questions)</span>
          </h2>
          <p className="text-[12px] text-[#77838f] mb-4">
            Click &quot;Edit Answer&quot; to expand and edit each answer. Drag to reorder.
          </p>
          <SortableList
            items={data?.faqs || []}
            onChange={(faqs) => setData({ ...data, faqs })}
            renderItem={(item, index, update) => <FAQItem item={item} index={index} update={update} />}
            onAdd={() => ({ question: '', answer: '', order: 0 })}
            addLabel="Add FAQ"
          />
        </div>
      )}
    </BCASectionEditorShell>
  );
}
