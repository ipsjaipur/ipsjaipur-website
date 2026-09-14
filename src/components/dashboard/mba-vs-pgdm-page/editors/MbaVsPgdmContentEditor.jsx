'use client';

import MbaVsPgdmSectionEditorShell from '../MbaVsPgdmSectionEditorShell';
import ImageUpload from '../../home-page/ImageUpload';

// ── Reusable field ────────────────────────────────────────────────────────────
function Field({ label, value, onChange, multiline = false, rows = 2, placeholder = '', hint = '' }) {
  const cls =
    'w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition';
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
        {label}
      </label>
      {hint && <p className="text-[11px] text-[#77838f] mb-1">{hint}</p>}
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

export default function MbaVsPgdmContentEditor() {
  return (
    <MbaVsPgdmSectionEditorShell
      sectionKey="content"
      title="Page Content"
      description="Main heading, intro paragraphs, approval cards (AICTE & RTU logos), and the IPS Hybrid Solution dark card."
    >
      {(data, setData) => {
        const set = (key) => (val) => setData({ ...data, [key]: val });

        return (
          <>
            {/* ── Heading & Intro ───────────────────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Heading &amp; Intro</h2>

              <Field
                label="Background Watermark Text"
                value={data?.backgroundWatermarkText}
                onChange={set('backgroundWatermarkText')}
                placeholder="Strategic Decision"
                hint="Large ghost text shown behind the heading."
              />
              <Field
                label="Main Heading"
                value={data?.mainHeading}
                onChange={set('mainHeading')}
                placeholder="University MBA vs. Autonomous PGDM"
              />
              <Field
                label="Intro Paragraph"
                value={data?.introParagraph}
                onChange={set('introParagraph')}
                multiline
                rows={3}
                placeholder="Making the right choice between a Master of Business Administration…"
              />
              <Field
                label="Paragraph 2 (supports HTML bold tags)"
                value={data?.paragraph2}
                onChange={set('paragraph2')}
                multiline
                rows={3}
                hint="Use <strong>…</strong> for bold text."
                placeholder="While <strong>traditional university MBA degrees</strong> provide…"
              />
              <Field
                label="Paragraph 3 (supports HTML bold tags)"
                value={data?.paragraph3}
                onChange={set('paragraph3')}
                multiline
                rows={3}
                hint="Use <strong>…</strong> for bold text."
                placeholder="<strong>IPS Business School</strong>, this dilemma is resolved…"
              />
            </div>

            {/* ── Approval Card 1 (AICTE) ───────────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Approval Card 1 (e.g. AICTE)</h2>
              <ImageUpload
                label="Logo Image"
                value={data?.card1LogoUrl || ''}
                onChange={set('card1LogoUrl')}
                aspectHint="Square logo (recommended 100×100)"
                maxWidth="160px"
                previewHeight="100px"
                objectFit="contain"
              />
              <Field
                label="Card Title"
                value={data?.card1Title}
                onChange={set('card1Title')}
                placeholder="AICTE Approved"
              />
              <Field
                label="Card Subtitle"
                value={data?.card1Subtitle}
                onChange={set('card1Subtitle')}
                placeholder="Govt. of India Statutory Body"
              />
              <div>
                <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                  Subtitle Colour
                </label>
                <select
                  value={data?.card1SubtitleColor || 'blue'}
                  onChange={(e) => set('card1SubtitleColor')(e.target.value)}
                  className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition bg-white"
                >
                  <option value="blue">Blue</option>
                  <option value="orange">Orange</option>
                </select>
              </div>
            </div>

            {/* ── Approval Card 2 (RTU) ─────────────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Approval Card 2 (e.g. RTU)</h2>
              <ImageUpload
                label="Logo Image"
                value={data?.card2LogoUrl || ''}
                onChange={set('card2LogoUrl')}
                aspectHint="Square logo (recommended 100×100)"
                maxWidth="160px"
                previewHeight="100px"
                objectFit="contain"
              />
              <Field
                label="Card Title"
                value={data?.card2Title}
                onChange={set('card2Title')}
                placeholder="RTU Affiliated"
              />
              <Field
                label="Card Subtitle"
                value={data?.card2Subtitle}
                onChange={set('card2Subtitle')}
                placeholder="UGC Recognized University Degree"
              />
              <div>
                <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                  Subtitle Colour
                </label>
                <select
                  value={data?.card2SubtitleColor || 'orange'}
                  onChange={(e) => set('card2SubtitleColor')(e.target.value)}
                  className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition bg-white"
                >
                  <option value="blue">Blue</option>
                  <option value="orange">Orange</option>
                </select>
              </div>
            </div>

            {/* ── IPS Hybrid Solution Card ──────────────────────────────────── */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">IPS Hybrid Solution Card (right dark card)</h2>
              <Field
                label="Badge Text"
                value={data?.hybridBadgeText}
                onChange={set('hybridBadgeText')}
                placeholder="The IPS Hybrid Solution"
              />
              <Field
                label="Heading"
                value={data?.hybridHeading}
                onChange={set('hybridHeading')}
                placeholder="Get the Best of Both Worlds"
              />
              <Field
                label="Description (supports HTML bold tags)"
                value={data?.hybridDescription}
                onChange={set('hybridDescription')}
                multiline
                rows={4}
                hint='Use <strong class="text-white">…</strong> for white bold text inside the dark card.'
                placeholder="Why compromise? At IPS Business School, students earn…"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="CTA Button Text"
                  value={data?.hybridCtaText}
                  onChange={set('hybridCtaText')}
                  placeholder="Explore MBA Program"
                />
                <Field
                  label="CTA Button Link (href)"
                  value={data?.hybridCtaHref}
                  onChange={set('hybridCtaHref')}
                  placeholder="/mba"
                />
              </div>
            </div>
          </>
        );
      }}
    </MbaVsPgdmSectionEditorShell>
  );
}
