'use client';

import SectionEditorShell from '../SectionEditorShell';
import SortableList from '../SortableList';

const ICON_OPTIONS = ['FlaskConical', 'BookOpen', 'Users', 'Briefcase', 'Star', 'Zap', 'Target', 'Globe'];

function FeatureItem(item, index, update) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Icon</label>
          <select
            value={item.iconName || 'FlaskConical'}
            onChange={(e) => update({ iconName: e.target.value })}
            className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition bg-white"
          >
            {ICON_OPTIONS.map((icon) => (
              <option key={icon} value={icon}>{icon}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Title</label>
          <input
            type="text"
            value={item.title || ''}
            onChange={(e) => update({ title: e.target.value })}
            className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
          />
        </div>
      </div>
      <div>
        <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Description</label>
        <textarea
          rows={2}
          value={item.text || ''}
          onChange={(e) => update({ text: e.target.value })}
          className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition resize-none"
        />
      </div>
    </div>
  );
}

function Field({ label, value, onChange, multiline = false, rows = 3 }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">{label}</label>
      {multiline ? (
        <textarea
          rows={rows}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition resize-none"
        />
      ) : (
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
        />
      )}
    </div>
  );
}

export default function MethodologyEditor() {
  return (
    <SectionEditorShell
      sectionKey="methodology"
      title="About / IPS Methodology"
      description="The left text block and feature list on the home page."
    >
      {(data, setData) => {
        const set = (key) => (val) => setData({ ...data, [key]: val });
        return (
          <>
            {/* Text content */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Section Text</h2>
              <Field label="Section Label (small caps above heading)" value={data?.methodologySectionLabel} onChange={set('methodologySectionLabel')} />
              <Field label="Main Heading" value={data?.methodologyHeading} onChange={set('methodologyHeading')} />
              <Field label="Description Paragraph" value={data?.methodologyDescription} onChange={set('methodologyDescription')} multiline rows={4} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="CTA Button Text" value={data?.methodologyCTAText} onChange={set('methodologyCTAText')} />
                <Field label="CTA Button Link" value={data?.methodologyCTALink} onChange={set('methodologyCTALink')} />
              </div>
            </div>

            {/* Feature list */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
              <h2 className="text-[14px] font-bold text-[#222] mb-1">Feature List Items</h2>
              <p className="text-[12px] text-[#77838f] mb-4">Drag to reorder. Icon is the Lucide icon name.</p>
              <SortableList
                items={data?.methodologyFeatures || []}
                onChange={(methodologyFeatures) => setData({ ...data, methodologyFeatures })}
                renderItem={FeatureItem}
                onAdd={() => ({ iconName: 'FlaskConical', title: '', text: '', order: 0 })}
                addLabel="Add Feature"
              />
            </div>
          </>
        );
      }}
    </SectionEditorShell>
  );
}
