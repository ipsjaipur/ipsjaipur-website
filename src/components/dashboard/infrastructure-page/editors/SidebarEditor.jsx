'use client';

import { useState } from 'react';
import InfrastructureSectionEditorShell from '../InfrastructureSectionEditorShell';
import { GripVertical, Trash2, Plus } from 'lucide-react';

function VideoRow({ item, isDragOver, onUpdate, onRemove, onDragStart, onDragOver, onDrop, onDragEnd }) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      className={`flex items-start gap-3 bg-[#f9fafb] border rounded-xl px-3 py-3 transition-all ${
        isDragOver ? 'border-[#eb5905] shadow-md' : 'border-[#e2e8f0]'
      }`}
    >
      <GripVertical className="w-4 h-4 text-[#aab4bf] mt-2 shrink-0 cursor-grab" />
      <div className="flex-1 space-y-2">
        <div>
          <label className="block text-[10px] font-semibold text-[#4a5568] uppercase tracking-wide mb-0.5">
            YouTube Embed URL
          </label>
          <input
            type="text"
            value={item.url || ''}
            onChange={(e) => onUpdate({ url: e.target.value })}
            placeholder="https://www.youtube.com/embed/…"
            className="w-full border border-[#e2e8f0] rounded-lg px-2.5 py-1.5 text-[12px] focus:outline-none focus:border-[#eb5905] transition"
          />
        </div>
        <div>
          <label className="block text-[10px] font-semibold text-[#4a5568] uppercase tracking-wide mb-0.5">
            Title (optional)
          </label>
          <input
            type="text"
            value={item.title || ''}
            onChange={(e) => onUpdate({ title: e.target.value })}
            placeholder="e.g. Campus Tour"
            className="w-full border border-[#e2e8f0] rounded-lg px-2.5 py-1.5 text-[12px] focus:outline-none focus:border-[#eb5905] transition"
          />
        </div>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="p-1.5 mt-1 rounded-lg text-[#aab4bf] hover:text-red-500 hover:bg-red-50 transition cursor-pointer shrink-0"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function SidebarEditor() {
  const [dragIdx, setDragIdx] = useState(null);
  const [overIdx, setOverIdx] = useState(null);

  return (
    <InfrastructureSectionEditorShell
      sectionKey="sidebar"
      title="Sidebar Videos"
      description="YouTube embed videos shown in the right sidebar of the Infrastructure page."
    >
      {(data, setData) => {
        const videos = data?.sidebarVideos || [];

        function updateVideo(i, patch) {
          const next = videos.map((v, idx) => (idx === i ? { ...v, ...patch } : v));
          setData({ ...data, sidebarVideos: next });
        }
        function removeVideo(i) {
          setData({ ...data, sidebarVideos: videos.filter((_, idx) => idx !== i) });
        }
        function addVideo() {
          setData({ ...data, sidebarVideos: [...videos, { url: '', title: '', order: videos.length }] });
        }
        function handleDragStart(e, i) { setDragIdx(i); e.dataTransfer.effectAllowed = 'move'; }
        function handleDragOver(e, i)  { e.preventDefault(); if (i !== overIdx) setOverIdx(i); }
        function handleDrop(e, dropI) {
          e.preventDefault();
          if (dragIdx === null || dragIdx === dropI) { setDragIdx(null); setOverIdx(null); return; }
          const next = [...videos];
          const [moved] = next.splice(dragIdx, 1);
          next.splice(dropI, 0, moved);
          setData({ ...data, sidebarVideos: next.map((v, i) => ({ ...v, order: i })) });
          setDragIdx(null);
          setOverIdx(null);
        }
        function handleDragEnd() { setDragIdx(null); setOverIdx(null); }

        return (
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
            <h2 className="text-[14px] font-bold text-[#222] mb-1">Sidebar Videos</h2>
            <p className="text-[12px] text-[#77838f] mb-4">
              Use the full <strong>embed URL</strong> format:{' '}
              <code className="bg-[#f4f6f9] px-1 rounded text-[11px]">
                https://www.youtube.com/embed/VIDEO_ID
              </code>. Drag to reorder.
            </p>
            <div className="space-y-2">
              {videos.map((video, i) => (
                <VideoRow
                  key={i}
                  item={video}
                  isDragOver={overIdx === i && dragIdx !== i}
                  onUpdate={(patch) => updateVideo(i, patch)}
                  onRemove={() => removeVideo(i)}
                  onDragStart={(e) => handleDragStart(e, i)}
                  onDragOver={(e) => handleDragOver(e, i)}
                  onDrop={(e) => handleDrop(e, i)}
                  onDragEnd={handleDragEnd}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={addVideo}
              className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#eb5905] border border-[#eb5905]/30 rounded-lg px-3 py-2 hover:bg-[#eb5905]/5 transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Video
            </button>
          </div>
        );
      }}
    </InfrastructureSectionEditorShell>
  );
}
