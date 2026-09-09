'use client';

import SectionEditorShell from '../SectionEditorShell';
import SortableList from '../SortableList';
import ImageUpload from '../ImageUpload';

function VideoItem(item, index, update) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <ImageUpload
        label="Thumbnail"
        value={item.thumbnail || ''}
        onChange={(url) => update({ thumbnail: url })}
        aspectHint="9:16 portrait (vertical reel)"
        maxWidth="220px"
        previewHeight="200px"
        objectFit="cover"
      />
      <div>
        <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
          Instagram Reel URL
        </label>
        <input
          type="url"
          value={item.url || ''}
          onChange={(e) => update({ url: e.target.value })}
          placeholder="https://www.instagram.com/reel/..."
          className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
        />
        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block text-[11px] text-[#eb5905] hover:underline"
          >
            Open link ↗
          </a>
        )}
      </div>
    </div>
  );
}

export default function VideoGalleryEditor() {
  return (
    <SectionEditorShell
      sectionKey="videoGallery"
      title="Video Gallery"
      description="Manage Instagram reel thumbnails and links for the coverflow slider."
    >
      {(data, setData) => (
        <>
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
            <div>
              <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                Section Heading
              </label>
              <input
                type="text"
                value={data?.videoGalleryHeading || ''}
                onChange={(e) => setData({ ...data, videoGalleryHeading: e.target.value })}
                className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
            <h2 className="text-[14px] font-bold text-[#222] mb-1">Video Reels</h2>
            <p className="text-[12px] text-[#77838f] mb-4">
              Drag to reorder. Each item has a vertical thumbnail + Instagram URL.
            </p>
            <SortableList
              items={data?.videos || []}
              onChange={(videos) => setData({ ...data, videos })}
              renderItem={VideoItem}
              onAdd={() => ({ thumbnail: '', url: '', order: 0 })}
              addLabel="Add Video Reel"
            />
          </div>
        </>
      )}
    </SectionEditorShell>
  );
}
