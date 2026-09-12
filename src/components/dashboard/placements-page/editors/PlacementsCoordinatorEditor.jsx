'use client';

import PlacementsSectionEditorShell from '../PlacementsSectionEditorShell';

export default function PlacementsCoordinatorEditor() {
  return (
    <PlacementsSectionEditorShell
      sectionKey="coordinator"
      title="Placement Coordinator"
      description="Contact details shown in the marquee strip on the Placements page."
    >
      {(data, setData) => {
        const coord = data?.coordinator || {};
        const set = (patch) => setData({ ...data, coordinator: { ...coord, ...patch } });

        return (
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 space-y-4">
            <h2 className="text-[14px] font-bold text-[#222]">Contact Details</h2>
            <p className="text-[12px] text-[#77838f]">
              These details appear in the scrolling marquee on both the PLACEMENTS slider section and the Placement Updates section.
            </p>

            <div>
              <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                Coordinator Name
              </label>
              <input
                type="text"
                value={coord.name || ''}
                onChange={(e) => set({ name: e.target.value })}
                placeholder="Prof. Sudhir Agarwal"
                className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                  Phone 1
                </label>
                <input
                  type="text"
                  value={coord.phone1 || ''}
                  onChange={(e) => set({ phone1: e.target.value })}
                  placeholder="+91 9829016449"
                  className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                  Phone 2 <span className="text-[#aab4bf] normal-case font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={coord.phone2 || ''}
                  onChange={(e) => set({ phone2: e.target.value })}
                  placeholder="+91 82339700000"
                  className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                  Email 1
                </label>
                <input
                  type="email"
                  value={coord.email1 || ''}
                  onChange={(e) => set({ email1: e.target.value })}
                  placeholder="sudhir@ipsedu.in"
                  className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide mb-1">
                  Email 2 <span className="text-[#aab4bf] normal-case font-normal">(optional)</span>
                </label>
                <input
                  type="email"
                  value={coord.email2 || ''}
                  onChange={(e) => set({ email2: e.target.value })}
                  placeholder="info@ipsedu.in"
                  className="w-full border border-[#e2e8f0] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#eb5905] transition"
                />
              </div>
            </div>
          </div>
        );
      }}
    </PlacementsSectionEditorShell>
  );
}
