'use client';

import StudentLifeSectionEditorShell from '../StudentLifeSectionEditorShell';
import SortableList from '../../home-page/SortableList';
import ImageUpload from '../../home-page/ImageUpload';

function ParagraphItem(item, _index, update) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Paragraph</label>
      <textarea
        rows={3}
        value={item.value || ''}
        onChange={(e) => update({ value: e.target.value })}
        placeholder="Paragraph text…"
        className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition resize-none"
      />
    </div>
  );
}

export default function SportsClubEditor() {
  return (
    <StudentLifeSectionEditorShell
      sectionKey="sports-club"
      title="Sports Club"
      description="Sports club heading, image, and descriptive paragraphs."
    >
      {(data, setData) => {
        const set = (key) => (val) => setData({ ...data, [key]: val });
        const parasAsObjects = (data?.sportsClubParagraphs || []).map((v) => ({ value: v }));

        return (
          <>
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Sports Club</h2>
              <div>
                <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                  Section Heading
                </label>
                <input
                  type="text"
                  value={data?.sportsClubHeading || ''}
                  onChange={(e) => set('sportsClubHeading')(e.target.value)}
                  placeholder="Sports Club:"
                  className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
                />
              </div>
              <ImageUpload
                label="Sports Club Image"
                value={data?.sportsClubImageUrl || ''}
                onChange={set('sportsClubImageUrl')}
                aspectHint="Landscape image"
                maxWidth="100%"
                previewHeight="180px"
                objectFit="cover"
              />
              <div>
                <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                  Image Alt Text
                </label>
                <input
                  type="text"
                  value={data?.sportsClubImageAlt || ''}
                  onChange={(e) => set('sportsClubImageAlt')(e.target.value)}
                  placeholder="IPS Sports Club Activities"
                  className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
              <h2 className="text-[14px] font-bold text-[#222] mb-1">Paragraphs</h2>
              <p className="text-[12px] text-[#77838f] mb-4">Drag to reorder.</p>
              <SortableList
                items={parasAsObjects}
                onChange={(items) => setData({ ...data, sportsClubParagraphs: items.map((i) => i.value) })}
                renderItem={ParagraphItem}
                onAdd={() => ({ value: '' })}
                addLabel="Add Paragraph"
              />
            </div>
          </>
        );
      }}
    </StudentLifeSectionEditorShell>
  );
}
