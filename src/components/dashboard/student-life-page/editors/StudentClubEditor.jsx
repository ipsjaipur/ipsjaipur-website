'use client';

import StudentLifeSectionEditorShell from '../StudentLifeSectionEditorShell';
import SortableList from '../../home-page/SortableList';

// ── Single bullet item inside a club ─────────────────────────────────────────
function BulletItem(item, _index, update) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">Bullet</label>
      <input
        type="text"
        value={item.value || ''}
        onChange={(e) => update({ value: e.target.value })}
        placeholder="Bullet point text…"
        className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
      />
    </div>
  );
}

// ── Single club card ──────────────────────────────────────────────────────────
function ClubItem(item, _index, update) {
  const bulletsAsObjects = (item.bullets || []).map((v) => ({ value: v }));

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
          Club Name
        </label>
        <input
          type="text"
          value={item.name || ''}
          onChange={(e) => update({ name: e.target.value })}
          placeholder="e.g. MARCOS CLUB"
          className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
        />
      </div>
      <div>
        <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
          Activities / Bullets
        </label>
        <SortableList
          items={bulletsAsObjects}
          onChange={(items) => update({ bullets: items.map((i) => i.value) })}
          renderItem={BulletItem}
          onAdd={() => ({ value: '' })}
          addLabel="Add Bullet"
        />
      </div>
    </div>
  );
}

export default function StudentClubEditor() {
  return (
    <StudentLifeSectionEditorShell
      sectionKey="student-club"
      title="Students Club"
      description="Students council intro text and the list of clubs with their activity bullets."
    >
      {(data, setData) => {
        const set = (key) => (val) => setData({ ...data, [key]: val });

        return (
          <>
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
              <h2 className="text-[14px] font-bold text-[#222]">Section Heading &amp; Intro</h2>
              <div>
                <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                  Section Heading
                </label>
                <input
                  type="text"
                  value={data?.studentClubHeading || ''}
                  onChange={(e) => set('studentClubHeading')(e.target.value)}
                  placeholder="STUDENTS CLUB (MANAGEMENT):"
                  className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                  Intro Paragraph
                </label>
                <textarea
                  rows={3}
                  value={data?.studentClubIntro || ''}
                  onChange={(e) => set('studentClubIntro')(e.target.value)}
                  placeholder="IPS BUSINESS SCHOOL has the Student's Council…"
                  className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition resize-none"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5">
              <h2 className="text-[14px] font-bold text-[#222] mb-1">Clubs</h2>
              <p className="text-[12px] text-[#77838f] mb-4">
                Each club has a name and a list of activity bullet points. Drag to reorder clubs or bullets within each club.
              </p>
              <SortableList
                items={data?.clubs || []}
                onChange={(clubs) => setData({ ...data, clubs })}
                renderItem={ClubItem}
                onAdd={() => ({ name: '', bullets: [], order: 0 })}
                addLabel="Add Club"
              />
            </div>
          </>
        );
      }}
    </StudentLifeSectionEditorShell>
  );
}
