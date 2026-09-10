'use client';

import MBASectionEditorShell from '../MBASectionEditorShell';
import SortableList from '../../home-page/SortableList';

function VideoItem(item, index, update) {
  const embedId = item.url?.match(/embed\/([^?]+)/)?.[1] || null;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
            YouTube Embed URL
          </label>
          <input
            type="text"
            value={item.url || ''}
            onChange={(e) => update({ url: e.target.value })}
            placeholder="https://www.youtube.com/embed/VIDEO_ID"
            className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
            Title (optional)
          </label>
          <input
            type="text"
            value={item.title || ''}
            onChange={(e) => update({ title: e.target.value })}
            placeholder="e.g. Student Video Resume"
            className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
          />
        </div>
      </div>
      {/* Thumbnail preview */}
      {embedId && (
        <div className="flex items-center gap-3">
          <img
            src={`https://img.youtube.com/vi/${embedId}/mqdefault.jpg`}
            alt="YouTube thumbnail"
            className="w-28 h-16 object-cover rounded-lg border border-[#e2e8f0]"
          />
          <a
            href={`https://www.youtube.com/watch?v=${embedId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-[#eb5905] hover:underline"
          >
            Preview on YouTube ↗
          </a>
        </div>
      )}
    </div>
  );
}

export default function MBASidebarEditor() {
  return (
    <MBASectionEditorShell
      sectionKey="sidebar"
      title="Sidebar Videos"
      description="YouTube embed videos shown in the right sidebar of the MBA page."
    >
      {(data, setData) => (
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
          <h2 className="text-[14px] font-bold text-[#222] mb-1">Sidebar Videos</h2>
          <p className="text-[12px] text-[#77838f] mb-4">
            Enter full YouTube embed URLs (format:{' '}
            <code className="bg-[#f4f6f9] px-1 py-0.5 rounded text-[11px]">
              https://www.youtube.com/embed/VIDEO_ID
            </code>
            ). A thumbnail preview is shown once a valid embed URL is entered.
          </p>
          <SortableList
            items={data?.sidebarVideos || []}
            onChange={(sidebarVideos) => setData({ ...data, sidebarVideos })}
            renderItem={VideoItem}
            onAdd={() => ({ url: '', title: '', order: 0 })}
            addLabel="Add Video"
          />
        </div>
      )}
    </MBASectionEditorShell>
  );
}
