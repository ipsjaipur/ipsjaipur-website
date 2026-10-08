'use client';

import IprSectionEditorShell from '../IprSectionEditorShell';
import PdfUpload from '../../home-page/PdfUpload';
import { Globe, FileEdit, EyeOff } from 'lucide-react';

function Field({ label, hint, children }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">{label}</label>
      {hint && <p className="text-[11px] text-[#77838f] mb-1.5">{hint}</p>}
      {children}
    </div>
  );
}

const inputCls =
  'w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition';

export default function IprConfigEditor() {
  return (
    <IprSectionEditorShell
      sectionKey="config"
      title="Config & Global Settings"
      description="Theme, header top-bar button, and brochure PDF for all download buttons on the page."
    >
      {(data, setData) => (
        <div className="space-y-5">
          {/* ── Slug ── */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
            <h2 className="text-[14px] font-bold text-[#222] mb-1">Page Slug</h2>
            <p className="text-[12px] text-[#77838f] mb-4">
              Sets the public URL of this seminar page. The header top-bar button will automatically link to this URL —
              no separate link field needed.
            </p>
            <Field label="Slug" hint="Lowercase letters, numbers and hyphens only. No spaces.">
              <input
                type="text"
                value={data?.slug || ''}
                onChange={(e) =>
                  setData({
                    ...data,
                    slug: e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9-]/g, '-')
                      .replace(/-+/g, '-')
                      .replace(/^-|-$/g, ''),
                  })
                }
                placeholder="ipr-seminar-2026"
                className={inputCls}
              />
            </Field>
            {/* Derived URL preview */}
            <p className="mt-2 text-[11px] text-[#77838f]">
              Page URL:{' '}
              <code className="bg-[#f4f6f9] px-1.5 py-0.5 rounded text-[#eb5905] font-mono">
                /seminar/{data?.slug || 'ipr-seminar-2026'}
              </code>{' '}
              — this is also the link the header top-bar button uses.
            </p>
          </div>

          {/* ── Publish Status ── */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
            <h2 className="text-[14px] font-bold text-[#222] mb-1">Page Status</h2>
            <p className="text-[12px] text-[#77838f] mb-4">
              Controls whether the seminar page is publicly accessible.{' '}
              <strong className="text-[#222]">Unpublished</strong> or <strong className="text-[#222]">Draft</strong>{' '}
              pages return a 404 to visitors.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              {[
                {
                  value: 'published',
                  label: 'Published',
                  sub: 'Live — visible to everyone at /seminar/' + (data?.slug || '…'),
                  Icon: Globe,
                  activeColor: '#16a34a',
                  activeBg: '#f0fdf4',
                  activeBorder: '#16a34a',
                },
                {
                  value: 'draft',
                  label: 'Draft',
                  sub: 'Saved in DB but returns 404 for public visitors',
                  Icon: FileEdit,
                  activeColor: '#d97706',
                  activeBg: '#fffbeb',
                  activeBorder: '#d97706',
                },
                {
                  value: 'unpublished',
                  label: 'Unpublished',
                  sub: 'Taken down — returns 404 for public visitors',
                  Icon: EyeOff,
                  activeColor: '#dc2626',
                  activeBg: '#fef2f2',
                  activeBorder: '#dc2626',
                },
              ].map(({ value, label, sub, Icon, activeColor, activeBg, activeBorder }) => {
                const isActive = (data?.status ?? 'published') === value;
                return (
                  <label
                    key={value}
                    className="flex-1 flex items-start gap-3 rounded-xl border-2 px-4 py-3.5 cursor-pointer transition"
                    style={{
                      borderColor: isActive ? activeBorder : '#e2e8f0',
                      backgroundColor: isActive ? activeBg : '#fff',
                    }}
                  >
                    <input
                      type="radio"
                      name="status"
                      value={value}
                      checked={isActive}
                      onChange={() => setData({ ...data, status: value })}
                      className="sr-only"
                    />
                    <Icon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: isActive ? activeColor : '#aab4bf' }} />
                    <div>
                      <p className="text-[13px] font-bold" style={{ color: isActive ? activeColor : '#222' }}>
                        {label}
                      </p>
                      <p className="text-[11px] text-[#77838f] mt-0.5">{sub}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* ── Theme ── */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
            <h2 className="text-[14px] font-bold text-[#222] mb-1">Page Theme</h2>
            <p className="text-[12px] text-[#77838f] mb-4">
              Choose between the dark (navy/gold) template or the light (white/orange) template.
            </p>
            <div className="flex gap-4">
              {['dark', 'light'].map((t) => (
                <label
                  key={t}
                  className={`flex-1 flex items-center gap-3 rounded-xl border-2 px-4 py-4 cursor-pointer transition ${
                    data?.theme === t ? 'border-[#eb5905] bg-[#eb5905]/5' : 'border-[#e2e8f0] hover:border-[#eb5905]/40'
                  }`}
                >
                  <input
                    type="radio"
                    name="theme"
                    value={t}
                    checked={data?.theme === t}
                    onChange={() => setData({ ...data, theme: t })}
                    className="accent-[#eb5905]"
                  />
                  <div>
                    <p className="text-[13px] font-bold text-[#222] capitalize">{t} Theme</p>
                    <p className="text-[11px] text-[#77838f]">
                      {t === 'dark'
                        ? 'Navy & gold background — current default'
                        : 'White & orange — clean professional look'}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* ── Top Bar Strip ── */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
            <h2 className="text-[14px] font-bold text-[#222] mb-1">Header Top-Bar Button</h2>
            <p className="text-[12px] text-[#77838f] mb-4">
              The animated spinning-border button shown in the top announcement bar and mobile drawer.
            </p>
            <div className="space-y-4">
              {/* Show toggle */}
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={data?.topBarIsShow ?? true}
                    onChange={(e) => setData({ ...data, topBarIsShow: e.target.checked })}
                  />
                  <div
                    className={`w-10 h-6 rounded-full transition-colors ${data?.topBarIsShow !== false ? 'bg-[#eb5905]' : 'bg-gray-300'}`}
                  />
                  <div
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${data?.topBarIsShow !== false ? 'left-5' : 'left-1'}`}
                  />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-[#222]">Show in Header</p>
                  <p className="text-[11px] text-[#77838f]">Toggle to show or hide the IPR button in the top bar</p>
                </div>
              </label>

              <Field label="Button Text">
                <input
                  type="text"
                  value={data?.topBarButtonText || ''}
                  onChange={(e) => setData({ ...data, topBarButtonText: e.target.value })}
                  placeholder="IPR Seminar — Oct 9, 2026"
                  className={inputCls}
                />
              </Field>
              {/* Button link is always /seminar/<slug> — derived automatically */}
              <p className="text-[11px] text-[#77838f]">
                Button link:{' '}
                <code className="bg-[#f4f6f9] px-1.5 py-0.5 rounded text-[#eb5905] font-mono">
                  /seminar/{data?.slug || 'ipr-seminar-2026'}
                </code>{' '}
                — automatically derived from the slug above.
              </p>
            </div>
          </div>

          {/* ── Brochure PDF ── */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
            <h2 className="text-[14px] font-bold text-[#222] mb-1">Brochure PDF</h2>
            <p className="text-[12px] text-[#77838f] mb-4">
              This PDF is used by all "Download Brochure" buttons on the Seminar page.
            </p>
            <div className="space-y-4">
              <PdfUpload
                label="Brochure PDF File"
                value={data?.brochurePdfUrl || ''}
                onChange={(url) => setData({ ...data, brochurePdfUrl: url })}
              />
              <Field label="Download Filename" hint="The filename shown when a visitor saves the PDF.">
                <input
                  type="text"
                  value={data?.brochureDownloadName || ''}
                  onChange={(e) => setData({ ...data, brochureDownloadName: e.target.value })}
                  placeholder="IPS-IPR-Seminar-Brochure.pdf"
                  className={inputCls}
                />
              </Field>
            </div>
          </div>
        </div>
      )}
    </IprSectionEditorShell>
  );
}
