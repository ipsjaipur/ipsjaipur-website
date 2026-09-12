'use client';

import PlacementsSectionEditorShell from '../PlacementsSectionEditorShell';
import SortableList from '../../home-page/SortableList';

function FAQItem(item, index, update) {
  return (
    <div className="space-y-2">
      <div>
        <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Question / Category</label>
        <input
          type="text"
          value={item.question || ''}
          onChange={(e) => update({ question: e.target.value })}
          placeholder="Consulting"
          className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
        />
      </div>
      <div>
        <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Answer</label>
        <textarea
          rows={4}
          value={item.answer || ''}
          onChange={(e) => update({ answer: e.target.value })}
          placeholder="Enter the answer text..."
          className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition resize-y"
        />
      </div>
    </div>
  );
}

export default function PlacementsFAQEditor() {
  return (
    <PlacementsSectionEditorShell
      sectionKey="faq"
      title="Industry Hiring Practices (FAQ)"
      description="Accordion FAQ — each item is a collapsible industry category with descriptive answer text."
    >
      {(data, setData) => (
        <>
          {/* Section Text */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
            <h2 className="text-[14px] font-bold text-[#222]">Section Text</h2>
            <div>
              <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Heading</label>
              <input
                type="text"
                value={data?.faqHeading || ''}
                onChange={(e) => setData({ ...data, faqHeading: e.target.value })}
                placeholder="Industry Hiring Practices"
                className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Sub-text</label>
              <textarea
                rows={3}
                value={data?.faqSubText || ''}
                onChange={(e) => setData({ ...data, faqSubText: e.target.value })}
                className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition resize-none"
              />
            </div>
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
            <h2 className="text-[14px] font-bold text-[#222] mb-1">FAQ Items</h2>
            <p className="text-[12px] text-[#77838f] mb-4">Drag to reorder. Each item renders as a collapsible accordion row.</p>
            <SortableList
              items={data?.faqs || []}
              onChange={(faqs) => setData({ ...data, faqs })}
              renderItem={FAQItem}
              onAdd={() => ({ question: '', answer: '', order: 0 })}
              addLabel="Add FAQ Item"
            />
          </div>
        </>
      )}
    </PlacementsSectionEditorShell>
  );
}
