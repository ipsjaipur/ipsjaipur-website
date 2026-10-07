'use client';

import IprSectionEditorShell from '../IprSectionEditorShell';
import SortableList from '../../home-page/SortableList';

const inputCls = 'w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition';
const textareaCls = `${inputCls} resize-none`;

function FaqItem(item, index, update) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Question</label>
        <input type="text" value={item.question || ''} onChange={(e) => update({ question: e.target.value })} placeholder="e.g. Who can register?" className={inputCls} />
      </div>
      <div>
        <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Answer</label>
        <textarea rows={3} value={item.answer || ''} onChange={(e) => update({ answer: e.target.value })} placeholder="Answer text…" className={textareaCls} />
      </div>
    </div>
  );
}

export default function IprFaqEditor() {
  return (
    <IprSectionEditorShell
      sectionKey="faq"
      title="FAQ"
      description="Frequently asked questions shown as an accordion on the page."
    >
      {(data, setData) => (
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Super Text</label>
              <input type="text" value={data?.faqSuperText || ''} onChange={(e) => setData({ ...data, faqSuperText: e.target.value })} placeholder="Got Questions?" className={inputCls} />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Heading</label>
              <input type="text" value={data?.faqHeading || ''} onChange={(e) => setData({ ...data, faqHeading: e.target.value })} placeholder="Frequently Asked Questions" className={inputCls} />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Description</label>
              <input type="text" value={data?.faqDescription || ''} onChange={(e) => setData({ ...data, faqDescription: e.target.value })} placeholder="Everything you need to know before registering…" className={inputCls} />
            </div>
          </div>
          <h3 className="text-[13px] font-bold text-[#222] mb-3">FAQ Items</h3>
          <SortableList
            items={data?.faqs || []}
            onChange={(faqs) => setData({ ...data, faqs })}
            renderItem={FaqItem}
            onAdd={() => ({ question: '', answer: '', order: 0 })}
            addLabel="Add FAQ Item"
          />
        </div>
      )}
    </IprSectionEditorShell>
  );
}
