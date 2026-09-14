'use client';

import InfrastructureSectionEditorShell from '../InfrastructureSectionEditorShell';
import ImageUpload from '../../home-page/ImageUpload';

function Field({ label, value, onChange, placeholder = '' }) {
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
    </div>
  );
}

export default function BannerEditor() {
  return (
    <InfrastructureSectionEditorShell
      sectionKey="banner"
      title="Banner"
      description="Hero banner title, background image, and image position."
    >
      {(data, setData) => {
        const set = (key) => (val) => setData({ ...data, [key]: val });
        return (
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
            <h2 className="text-[14px] font-bold text-[#222]">Banner</h2>
            <Field
              label="Banner Title"
              value={data?.bannerTitle}
              onChange={set('bannerTitle')}
              placeholder="Infrastructure"
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
                <option value="object-top">Top (object-top)</option>
                <option value="object-center">Center (object-center)</option>
                <option value="object-bottom">Bottom (object-bottom)</option>
              </select>
            </div>
          </div>
        );
      }}
    </InfrastructureSectionEditorShell>
  );
}
