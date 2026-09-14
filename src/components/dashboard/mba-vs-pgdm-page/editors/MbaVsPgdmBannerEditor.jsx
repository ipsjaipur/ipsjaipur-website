'use client';

import MbaVsPgdmSectionEditorShell from '../MbaVsPgdmSectionEditorShell';
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

export default function MbaVsPgdmBannerEditor() {
  return (
    <MbaVsPgdmSectionEditorShell
      sectionKey="banner"
      title="Banner"
      description="Hero banner image, page title, and image focal position for the MBA vs PGDM page."
    >
      {(data, setData) => {
        const set = (key) => (val) => setData({ ...data, [key]: val });

        return (
          <>
            {/* Banner title */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Banner Title</h2>
              <p className="text-[12px] text-[#77838f]">
                Shown as the large heading overlaid on the banner image.
              </p>
              <Field
                label="Page Title"
                value={data?.bannerTitle}
                onChange={set('bannerTitle')}
                placeholder="MBA vs. PGDM"
              />
            </div>

            {/* Banner image */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Banner Background Image</h2>
              <p className="text-[12px] text-[#77838f]">
                Recommended: wide landscape image (1920×600). Upload to replace.
                Cloudinary images are served with <code className="bg-gray-100 px-1 rounded text-[11px]">f_auto,q_auto</code> automatically.
              </p>
              <ImageUpload
                label="Background Image"
                value={data?.bannerImageUrl || ''}
                onChange={set('bannerImageUrl')}
                aspectHint="Wide landscape (recommended 1920×600)"
                maxWidth="100%"
                previewHeight="180px"
                objectFit="cover"
              />
            </div>

            {/* Image position */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Image Focal Position</h2>
              <p className="text-[12px] text-[#77838f]">
                Controls which part of the image stays visible when cropped on smaller screens.
              </p>
              <div>
                <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                  Position
                </label>
                <select
                  value={data?.bannerPosition || 'object-[50%_35%]'}
                  onChange={(e) => set('bannerPosition')(e.target.value)}
                  className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition bg-white"
                >
                  <option value="object-[50%_35%]">Center-upper (50% 35%) — default</option>
                  <option value="object-center">Center</option>
                  <option value="object-top">Top</option>
                  <option value="object-bottom">Bottom</option>
                  <option value="object-left">Left</option>
                  <option value="object-right">Right</option>
                </select>
              </div>
            </div>
          </>
        );
      }}
    </MbaVsPgdmSectionEditorShell>
  );
}
