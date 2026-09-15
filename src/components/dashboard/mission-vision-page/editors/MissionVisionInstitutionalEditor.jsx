'use client';

import MissionVisionSectionEditorShell from '../MissionVisionSectionEditorShell';
import ImageUpload from '../../home-page/ImageUpload';

function Field({ label, value, onChange, placeholder = '', hint = '' }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
        {label}
      </label>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
      />
      {hint && <p className="text-[11px] text-[#77838f] mt-1">{hint}</p>}
    </div>
  );
}

function TextArea({ label, value, onChange, placeholder = '', rows = 4, hint = '' }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
        {label}
      </label>
      <textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition resize-y"
      />
      {hint && <p className="text-[11px] text-[#77838f] mt-1">{hint}</p>}
    </div>
  );
}

export default function MissionVisionInstitutionalEditor() {
  return (
    <MissionVisionSectionEditorShell
      sectionKey="institutional"
      title="Institutional Section"
      description='The "Shaping Practice & Transforming Careers" section — heading, quote, body paragraphs, and side image.'
    >
      {(data, setData) => {
        const set = (key) => (val) => setData({ ...data, [key]: val });

        return (
          <>
            {/* Heading */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Section Heading</h2>
              <Field
                label="Heading"
                value={data?.institutionalHeading}
                onChange={set('institutionalHeading')}
                placeholder="Shaping Practice & Transforming Careers"
              />
            </div>

            {/* Quote */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Opening Quote</h2>
              <p className="text-[12px] text-[#77838f]">
                Displayed in the highlighted box with the orange left border. Include the surrounding quotes.
              </p>
              <TextArea
                label="Quote Text"
                value={data?.institutionalQuote}
                onChange={set('institutionalQuote')}
                placeholder='"Discover who you really are…"'
                rows={4}
              />
            </div>

            {/* Body paragraphs */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Body Paragraphs</h2>
              <TextArea
                label="Paragraph 1"
                value={data?.institutionalParagraph1}
                onChange={set('institutionalParagraph1')}
                rows={4}
              />
              <TextArea
                label="Paragraph 2"
                value={data?.institutionalParagraph2}
                onChange={set('institutionalParagraph2')}
                rows={4}
              />
            </div>

            {/* Side image */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Right-Side Image</h2>
              <p className="text-[12px] text-[#77838f]">
                Portrait-orientation image displayed on the right side of the section (aspect ratio 4:5).
                Cloudinary images are served with{' '}
                <code className="bg-gray-100 px-1 rounded text-[11px]">f_auto,q_auto,w_550</code> automatically.
              </p>
              <ImageUpload
                label="Section Image"
                value={data?.institutionalImageUrl || ''}
                onChange={set('institutionalImageUrl')}
                aspectHint="Portrait 4:5 ratio (e.g. 550×688)"
                maxWidth="240px"
                previewHeight="300px"
                objectFit="cover"
              />
              <Field
                label="Image Alt Text"
                value={data?.institutionalImageAlt}
                onChange={set('institutionalImageAlt')}
                placeholder="Shaping Practice & Transforming Careers - IPS Business School"
                hint="Shown to screen readers and search engines."
              />
            </div>
          </>
        );
      }}
    </MissionVisionSectionEditorShell>
  );
}
