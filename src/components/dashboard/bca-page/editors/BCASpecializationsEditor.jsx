'use client';

import BCASectionEditorShell from '../BCASectionEditorShell';
import SortableList from '../../home-page/SortableList';

function SpecItem(item, index, update) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Specialization Name</label>
      <input type="text" value={item.name || ''} onChange={(e) => update({ name: e.target.value })}
        placeholder="e.g. Data Science"
        className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition" />
    </div>
  );
}

function EligibilityPointItem(item, index, update) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Eligibility Point</label>
      <textarea rows={2} value={item.text || ''} onChange={(e) => update({ text: e.target.value })}
        placeholder="Eligibility criteria text…"
        className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition resize-none" />
    </div>
  );
}

function PriorityItem(item, index, update) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Priority Rule</label>
      <input type="text" value={item.text || ''} onChange={(e) => update({ text: e.target.value })}
        placeholder="e.g. Percentage of qualifying examination or equivalent CGPA"
        className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition" />
    </div>
  );
}

function Field({ label, value, onChange, placeholder = '' }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">{label}</label>
      <input type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition" />
    </div>
  );
}

export default function BCASpecializationsEditor() {
  return (
    <BCASectionEditorShell sectionKey="specializations" title="Specializations & Eligibility"
      description="Manage available specializations and eligibility criteria.">
      {(data, setData) => {
        const set = (key) => (val) => setData({ ...data, [key]: val });
        return (
          <>
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
              <div className="mb-4">
                <Field label="Specializations Heading" value={data?.specializationsHeading}
                  onChange={set('specializationsHeading')} placeholder="SPECIALIZATIONS AVAILABLE:" />
              </div>
              <h2 className="text-[14px] font-bold text-[#222] mb-1">Specializations</h2>
              <p className="text-[12px] text-[#77838f] mb-4">Drag to reorder.</p>
              <SortableList items={data?.specializations || []}
                onChange={(specializations) => setData({ ...data, specializations })}
                renderItem={SpecItem} onAdd={() => ({ name: '', order: 0 })} addLabel="Add Specialization" />
            </div>

            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
              <div className="mb-4">
                <Field label="Eligibility Heading" value={data?.eligibilityHeading}
                  onChange={set('eligibilityHeading')} placeholder="Eligibility:" />
              </div>
              <h2 className="text-[14px] font-bold text-[#222] mb-1">Eligibility Points</h2>
              <p className="text-[12px] text-[#77838f] mb-4">Each point is shown with a lightbulb icon.</p>
              <SortableList items={data?.eligibilityPoints || []}
                onChange={(eligibilityPoints) => setData({ ...data, eligibilityPoints })}
                renderItem={EligibilityPointItem} onAdd={() => ({ text: '', order: 0 })} addLabel="Add Eligibility Point" />
            </div>

            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
              <h2 className="text-[14px] font-bold text-[#222] mb-1">Priority Rules (tie-breaker list)</h2>
              <p className="text-[12px] text-[#77838f] mb-4">Shown indented below the eligibility points.</p>
              <SortableList items={data?.eligibilityPriorities || []}
                onChange={(eligibilityPriorities) => setData({ ...data, eligibilityPriorities })}
                renderItem={PriorityItem} onAdd={() => ({ text: '', order: 0 })} addLabel="Add Priority Rule" />
            </div>
          </>
        );
      }}
    </BCASectionEditorShell>
  );
}
