'use client';

import PlacementsSectionEditorShell from '../PlacementsSectionEditorShell';
import SortableList from '../../home-page/SortableList';

function VideoItem(item, index, update) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Title</label>
        <input
          type="text"
          value={item.title || ''}
          onChange={(e) => update({ title: e.target.value })}
          placeholder="Nidhi Tiwari (MBA 2020-22)"
          className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
        />
      </div>
      <div>
        <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
          YouTube Embed URL
        </label>
        <input
          type="text"
          value={item.videoUrl || ''}
          onChange={(e) => update({ videoUrl: e.target.value })}
          placeholder="https://www.youtube.com/embed/VIDEO_ID"
          className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition font-mono"
        />
        <p className="text-[10px] text-[#77838f] mt-1">Use the /embed/ URL from YouTube (not the watch URL).</p>
      </div>
    </div>
  );
}

export default function PlacementsResumeBookEditor() {
  return (
    <PlacementsSectionEditorShell
      sectionKey="resumeBook"
      title="Resume Book"
      description="YouTube video-résumé grid with heading, description, CTA link and video cards."
    >
      {(data, setData) => (
        <>
          {/* Section Text */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
            <h2 className="text-[14px] font-bold text-[#222]">Section Text</h2>
            <div>
              <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Heading</label>
              <input
                type="text"
                value={data?.resumeBookHeading || ''}
                onChange={(e) => setData({ ...data, resumeBookHeading: e.target.value })}
                placeholder="Resume Book"
                className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Description</label>
              <textarea
                rows={3}
                value={data?.resumeBookDescription || ''}
                onChange={(e) => setData({ ...data, resumeBookDescription: e.target.value })}
                className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition resize-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">CTA Button Text</label>
                <input
                  type="text"
                  value={data?.resumeBookCTAText || ''}
                  onChange={(e) => setData({ ...data, resumeBookCTAText: e.target.value })}
                  placeholder="View More...."
                  className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">CTA Link (URL)</label>
                <input
                  type="text"
                  value={data?.resumeBookCTALink || ''}
                  onChange={(e) => setData({ ...data, resumeBookCTALink: e.target.value })}
                  placeholder="https://www.youtube.com/..."
                  className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition font-mono"
                />
              </div>
            </div>
          </div>

          {/* Videos */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
            <h2 className="text-[14px] font-bold text-[#222] mb-1">Video Résumés</h2>
            <p className="text-[12px] text-[#77838f] mb-4">Drag to reorder. Each card shows an embedded YouTube video.</p>
            <SortableList
              items={data?.videoResumes || []}
              onChange={(videoResumes) => setData({ ...data, videoResumes })}
              renderItem={VideoItem}
              onAdd={() => ({ title: '', videoUrl: '', thumbnailUrl: '', order: 0 })}
              addLabel="Add Video"
            />
          </div>
        </>
      )}
    </PlacementsSectionEditorShell>
  );
}
