'use client';

import AboutSectionEditorShell from '../AboutSectionEditorShell';
import SortableList from '../../home-page/SortableList';
import ImageUpload from '../../home-page/ImageUpload';

// ── Reusable labelled field ───────────────────────────────────────────────────
function Field({ label, value, onChange, multiline = false, rows = 2, placeholder = '' }) {
  const cls =
    'w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition';
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">{label}</label>
      {multiline ? (
        <textarea
          rows={rows}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${cls} resize-none`}
        />
      ) : (
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cls}
        />
      )}
    </div>
  );
}

// ── Description paragraph list item ──────────────────────────────────────────
function DescParaItem(item, _index, update) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Paragraph</label>
      <textarea
        rows={3}
        value={item.value || ''}
        onChange={(e) => update({ value: e.target.value })}
        placeholder="Paragraph text…"
        className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition resize-none"
      />
    </div>
  );
}

// ── "Why Choose" item ─────────────────────────────────────────────────────────
function WhyChooseItem(item, _index, update) {
  return (
    <div className="space-y-3">
      {/* Bold heading */}
      <div>
        <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
          Bold Heading
        </label>
        <input
          type="text"
          value={item.boldText || ''}
          onChange={(e) => update({ boldText: e.target.value })}
          placeholder="Excelling at Research"
          className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
        />
      </div>
      {/* Description */}
      <div>
        <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
          Description
        </label>
        <textarea
          rows={3}
          value={item.description || ''}
          onChange={(e) => update({ description: e.target.value })}
          placeholder="Paragraph text following the bold heading…"
          className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition resize-none"
        />
      </div>
    </div>
  );
}

// ── Main editor ───────────────────────────────────────────────────────────────
export default function AboutContentEditor() {
  return (
    <AboutSectionEditorShell
      sectionKey="content"
      title="Page Content"
      description="Banner, page heading, opening quote, description paragraphs, and Why Choose IPS items."
    >
      {(data, setData) => {
        const set = (key) => (val) => setData({ ...data, [key]: val });

        // Adapt flat string arrays → [{ value }] objects for SortableList
        const descParas = (data?.descriptionParagraphs || []).map((v) => ({ value: v }));

        return (
          <>
            {/* ── Banner ──────────────────────────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Banner</h2>
              <Field
                label="Banner Title (shown as hero heading)"
                value={data?.bannerTitle}
                onChange={set('bannerTitle')}
                placeholder="IPS Ideology"
              />
              <ImageUpload
                label="Banner Background Image"
                value={data?.bannerImageUrl || ''}
                onChange={set('bannerImageUrl')}
                aspectHint="Wide landscape image (recommended 1920×600)"
                maxWidth="100%"
                previewHeight="170px"
                objectFit="cover"
              />
              <div>
                <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                  Image Position
                </label>
                <select
                  value={data?.bannerPosition || 'object-bottom'}
                  onChange={(e) => set('bannerPosition')(e.target.value)}
                  className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition bg-white"
                >
                  <option value="object-bottom">Bottom (object-bottom)</option>
                  <option value="object-center">Center (object-center)</option>
                  <option value="object-top">Top (object-top)</option>
                </select>
              </div>
            </div>

            {/* ── Page heading ─────────────────────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Page Heading</h2>
              <Field
                label="Section Heading (inside the bordered box)"
                value={data?.pageHeading}
                onChange={set('pageHeading')}
                placeholder="IPS IDEOLOGY"
              />
            </div>

            {/* ── Opening quote ────────────────────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Opening Quote</h2>
              <p className="text-[12px] text-[#77838f]">Displayed centered and bold at the top of the content area.</p>
              <Field
                label="Quote Text"
                value={data?.quoteText}
                onChange={set('quoteText')}
                multiline
                rows={3}
                placeholder='"Discover who you really are. Think independently…"'
              />
            </div>

            {/* ── Description paragraphs ───────────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
              <h2 className="text-[14px] font-bold text-[#222] mb-1">Description Paragraphs</h2>
              <p className="text-[12px] text-[#77838f] mb-4">
                Each paragraph appears below the opening quote. Drag to reorder.
              </p>
              <SortableList
                items={descParas}
                onChange={(items) => setData({ ...data, descriptionParagraphs: items.map((i) => i.value) })}
                renderItem={DescParaItem}
                onAdd={() => ({ value: '' })}
                addLabel="Add Paragraph"
              />
            </div>

            {/* ── Why Choose IPS ───────────────────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Why Choose IPS Section</h2>
              <Field
                label="Sub-section Heading"
                value={data?.whyChooseHeading}
                onChange={set('whyChooseHeading')}
                placeholder="Why Choose IPS BUSINESS SCHOOL?"
              />
              <p className="text-[12px] text-[#77838f]">
                Each item has a bold heading and a description paragraph. The 💡 icon is fixed on the frontend. Drag to
                reorder.
              </p>
              <SortableList
                items={data?.whyChooseItems || []}
                onChange={(whyChooseItems) => setData({ ...data, whyChooseItems })}
                renderItem={WhyChooseItem}
                onAdd={() => ({ boldText: '', description: '', order: 0 })}
                addLabel="Add Item"
              />
            </div>
          </>
        );
      }}
    </AboutSectionEditorShell>
  );
}
