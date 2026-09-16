'use client';

import { Mail, Phone } from 'lucide-react';
import CareerSectionEditorShell from '../CareerSectionEditorShell';

function Field({ label, value, onChange, placeholder = '', hint = '', icon: Icon }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aab4bf]" />}
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full border border-[#e2e8f0] rounded-lg py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition ${Icon ? 'pl-9 pr-3' : 'px-3'}`}
        />
      </div>
      {hint && <p className="text-[11px] text-[#77838f] mt-1">{hint}</p>}
    </div>
  );
}

export default function CareerContactEditor() {
  return (
    <CareerSectionEditorShell
      sectionKey="contact"
      title="Contact / Apply"
      description='"You may apply to" section — heading, email address, and phone number for job applications.'
    >
      {(data, setData) => {
        const set = (key) => (val) => setData({ ...data, [key]: val });

        return (
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-5">
            <h2 className="text-[14px] font-bold text-[#222]">Application Contact Details</h2>
            <p className="text-[12px] text-[#77838f]">
              These details are displayed at the bottom of the career page with clickable email and phone links.
            </p>

            <Field
              label="Section Heading"
              value={data?.contactHeading}
              onChange={set('contactHeading')}
              placeholder="You may apply to"
              hint='e.g. "You may apply to" or "Apply Now"'
            />

            <Field
              label="Email Address"
              value={data?.contactEmail}
              onChange={set('contactEmail')}
              placeholder="careers@ipsedu.in"
              hint="Rendered as a mailto: link on the page."
              icon={Mail}
            />

            <Field
              label="Phone Number"
              value={data?.contactPhone}
              onChange={set('contactPhone')}
              placeholder="+91-9829047517"
              hint="Rendered as a tel: link on the page."
              icon={Phone}
            />
          </div>
        );
      }}
    </CareerSectionEditorShell>
  );
}
