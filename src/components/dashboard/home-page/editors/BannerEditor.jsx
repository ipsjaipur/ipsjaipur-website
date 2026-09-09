'use client';

import SectionEditorShell from '../SectionEditorShell';
import SortableList from '../SortableList';
import ImageUpload from '../ImageUpload';

function BannerSlideItem(item, index, update) {
  return (
    <div className="space-y-3">
      <ImageUpload
        label="Slide Image"
        value={item.src || ''}
        onChange={(url) => update({ src: url })}
        aspectHint="Recommended: 1920×650px"
        maxWidth="300px"
        previewHeight="120px"
        objectFit="cover"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
            Alt Text
          </label>
          <input
            type="text"
            value={item.alt || ''}
            onChange={(e) => update({ alt: e.target.value })}
            placeholder="Describe the image for SEO & accessibility"
            className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] text-[#222] placeholder-[#aab4bf] focus:outline-none focus:border-[#eb5905] transition"
          />
        </div>
        <div className="flex items-center gap-2 pt-5">
          <input
            type="checkbox"
            id={`priority-${index}`}
            checked={!!item.priority}
            onChange={(e) => update({ priority: e.target.checked })}
            className="w-4 h-4 accent-[#eb5905]"
          />
          <label htmlFor={`priority-${index}`} className="text-[13px] font-medium text-[#4a5568]">
            Priority load (first slide)
          </label>
        </div>
      </div>
    </div>
  );
}

export default function BannerEditor() {
  return (
    <SectionEditorShell
      sectionKey="banner"
      title="Hero Banner"
      description="Manage the banner slides shown at the top of the home page."
    >
      {(data, setData) => (
        <>
          {/* SEO H1 */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
            <h2 className="text-[14px] font-bold text-[#222] mb-4">SEO Hidden H1</h2>
            <div>
              <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                H1 Text (hidden, for search engines)
              </label>
              <input
                type="text"
                value={data?.bannerSeoH1 || ''}
                onChange={(e) => setData({ ...data, bannerSeoH1: e.target.value })}
                placeholder="Industry-Focused Learning at the Top Business Schools in Jaipur"
                className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] text-[#222] placeholder-[#aab4bf] focus:outline-none focus:border-[#eb5905] transition"
              />
            </div>
          </div>

          {/* Slides */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
            <h2 className="text-[14px] font-bold text-[#222] mb-1">Banner Slides</h2>
            <p className="text-[12px] text-[#77838f] mb-4">Drag to reorder. First slide loads with priority.</p>
            <SortableList
              items={data?.bannerSlides || []}
              onChange={(slides) => setData({ ...data, bannerSlides: slides })}
              renderItem={BannerSlideItem}
              onAdd={() => ({ src: '', alt: '', priority: false, order: 0 })}
              addLabel="Add Slide"
            />
          </div>
        </>
      )}
    </SectionEditorShell>
  );
}
