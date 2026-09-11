'use client';

import IpsSutraSectionEditorShell from '../IpsSutraSectionEditorShell';
import ImageUpload from '../../home-page/ImageUpload';
import SortableList from '../../home-page/SortableList';

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

function ParagraphItem(item, _index, update) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
        Paragraph (HTML supported — use &lt;strong&gt; for bold)
      </label>
      <textarea
        rows={4}
        value={item.value || ''}
        onChange={(e) => update({ value: e.target.value })}
        placeholder="Hindi/English paragraph text… <strong>bold text</strong> is supported."
        className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition resize-none font-mono"
      />
    </div>
  );
}

export default function IpsSutraContentEditor() {
  return (
    <IpsSutraSectionEditorShell
      sectionKey="content"
      title="Page Content Section"
      description="Banner, main heading, Hindi paragraphs, CTA button, and side image."
    >
      {(data, setData) => {
        const set = (key) => (val) => setData({ ...data, [key]: val });
        const paragraphs = (data?.contentParagraphs || []).map((v) => ({ value: v }));

        return (
          <>
            {/* Banner */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Banner</h2>
              <Field
                label="Banner Title (shown as page heading)"
                value={data?.bannerTitle}
                onChange={set('bannerTitle')}
                placeholder="आईपीएस सूत्र"
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
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Main Content</h2>
              <Field
                label="Section Heading"
                value={data?.contentHeading}
                onChange={set('contentHeading')}
                placeholder="आईपीएस सूत्र"
              />
              <div>
                <p className="text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-2">
                  Content Paragraphs
                </p>
                <p className="text-[12px] text-[#77838f] mb-3">
                  HTML tags like &lt;strong&gt;bold&lt;/strong&gt; are rendered on the page.
                </p>
                <SortableList
                  items={paragraphs}
                  onChange={(items) => setData({ ...data, contentParagraphs: items.map((i) => i.value) })}
                  renderItem={ParagraphItem}
                  onAdd={() => ({ value: '' })}
                  addLabel="Add Paragraph"
                />
              </div>
            </div>

            {/* CTA Button */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">CTA Button</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Button Text"
                  value={data?.ctaText}
                  onChange={set('ctaText')}
                  placeholder="Start Journey Today"
                />
                <Field
                  label="Button URL"
                  value={data?.ctaHref}
                  onChange={set('ctaHref')}
                  placeholder="https://admissions.ipsedu.in/"
                />
              </div>
            </div>

            {/* Side Image */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Side Image</h2>
              <ImageUpload
                label="Side Image"
                value={data?.sideImageUrl || ''}
                onChange={set('sideImageUrl')}
                aspectHint="Portrait image (recommended 4:5 ratio)"
                maxWidth="300px"
                previewHeight="200px"
                objectFit="cover"
              />
              <Field
                label="Image Alt Text"
                value={data?.sideImageAlt}
                onChange={set('sideImageAlt')}
                placeholder="IPS Sutra - Skill Development Program"
              />
            </div>
          </>
        );
      }}
    </IpsSutraSectionEditorShell>
  );
}
