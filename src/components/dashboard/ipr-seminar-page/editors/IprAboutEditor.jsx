'use client';

import IprSectionEditorShell from '../IprSectionEditorShell';
import ImageUpload from '../../home-page/ImageUpload';

const inputCls = 'w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition';
const textareaCls = `${inputCls} resize-none`;

function Field({ label, hint, children }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">{label}</label>
      {hint && <p className="text-[11px] text-[#77838f] mb-1.5">{hint}</p>}
      {children}
    </div>
  );
}

export default function IprAboutEditor() {
  return (
    <IprSectionEditorShell
      sectionKey="about"
      title="About the Seminar"
      description="Two-column section: left has heading + paragraphs + badges, right has an event image with floating stats."
    >
      {(data, setData) => (
        <div className="space-y-5">

          {/* Text content */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
            <h2 className="text-[14px] font-bold text-[#222] mb-4">Text Content</h2>
            <div className="space-y-4">
              <Field label="Super Text (small label above heading)">
                <input type="text" value={data?.aboutSuperText || ''} onChange={(e) => setData({ ...data, aboutSuperText: e.target.value })} placeholder="About the Event" className={inputCls} />
              </Field>
              <Field label="Heading">
                <input type="text" value={data?.aboutHeading || ''} onChange={(e) => setData({ ...data, aboutHeading: e.target.value })} placeholder="Your Idea Has Value…" className={inputCls} />
              </Field>
              <Field label="Paragraph 1">
                <textarea rows={3} value={data?.aboutParagraph1 || ''} onChange={(e) => setData({ ...data, aboutParagraph1: e.target.value })} className={textareaCls} />
              </Field>
              <Field label="Paragraph 2">
                <textarea rows={3} value={data?.aboutParagraph2 || ''} onChange={(e) => setData({ ...data, aboutParagraph2: e.target.value })} className={textareaCls} />
              </Field>
            </div>
          </div>

          {/* Image & floating badges */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
            <h2 className="text-[14px] font-bold text-[#222] mb-4">Image & Floating Badge</h2>
            <div className="space-y-4">
              <ImageUpload
                label="Event Image (right column)"
                value={data?.aboutImageUrl || ''}
                onChange={(url) => setData({ ...data, aboutImageUrl: url })}
              />
              <div className="grid sm:grid-cols-3 gap-3">
                <Field label="Attendees Count">
                  <input type="text" value={data?.aboutAttendeesCount || ''} onChange={(e) => setData({ ...data, aboutAttendeesCount: e.target.value })} placeholder="500+" className={inputCls} />
                </Field>
                <Field label="Attendees Label">
                  <input type="text" value={data?.aboutAttendeesLabel || ''} onChange={(e) => setData({ ...data, aboutAttendeesLabel: e.target.value })} placeholder="Attendees" className={inputCls} />
                </Field>
                <Field label="Attendees Sub-label">
                  <input type="text" value={data?.aboutAttendeesSubLabel || ''} onChange={(e) => setData({ ...data, aboutAttendeesSubLabel: e.target.value })} placeholder="Expected" className={inputCls} />
                </Field>
              </div>
            </div>
          </div>

        </div>
      )}
    </IprSectionEditorShell>
  );
}
