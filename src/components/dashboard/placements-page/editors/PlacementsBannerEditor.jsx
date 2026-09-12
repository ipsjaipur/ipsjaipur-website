'use client';

import PlacementsSectionEditorShell from '../PlacementsSectionEditorShell';
import ImageUpload from '../../home-page/ImageUpload';

const POSITION_OPTIONS = [
  { value: 'object-top',    label: 'Top' },
  { value: 'object-center', label: 'Center' },
  { value: 'object-bottom', label: 'Bottom' },
];

export default function PlacementsBannerEditor() {
  return (
    <PlacementsSectionEditorShell
      sectionKey="banner"
      title="Page Banner"
      description="Hero banner at the top of the Placements page — title, background image, and focal point."
    >
      {(data, setData) => (
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-5">
          <h2 className="text-[14px] font-bold text-[#222]">Banner Settings</h2>

          {/* Title */}
          <div>
            <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
              Page Title
            </label>
            <input
              type="text"
              value={data?.bannerTitle || ''}
              onChange={(e) => setData({ ...data, bannerTitle: e.target.value })}
              placeholder="Placements"
              className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
            />
            <p className="text-[10px] text-[#77838f] mt-1">Shown as the large heading on the banner overlay.</p>
          </div>

          {/* Image */}
          <div>
            <ImageUpload
              label="Background Image"
              value={data?.bannerImageUrl || ''}
              onChange={(url) => setData({ ...data, bannerImageUrl: url })}
              aspectHint="Wide landscape — 1920×400 recommended"
              maxWidth="100%"
              previewHeight="180px"
              objectFit="cover"
            />
          </div>

          {/* Position */}
          <div>
            <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
              Image Focal Point
            </label>
            <select
              value={data?.bannerPosition || 'object-bottom'}
              onChange={(e) => setData({ ...data, bannerPosition: e.target.value })}
              className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition bg-white"
            >
              {POSITION_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <p className="text-[10px] text-[#77838f] mt-1">
              Controls which part of the image stays visible when cropped on smaller screens.
            </p>
          </div>
        </div>
      )}
    </PlacementsSectionEditorShell>
  );
}
