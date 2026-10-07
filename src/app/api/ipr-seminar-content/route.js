import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import IprSeminarPageContent from '@/models/IprSeminarPageContent';
import { getAuthFromCookies } from '@/lib/auth';

/**
 * GET /api/ipr-seminar-content
 *
 * Query params (mutually exclusive, checked in order):
 *  ?slug=ipr-seminar-2026   → returns all sections merged flat for that slug
 *  ?section=config          → returns a single section document
 *  (none)                   → returns all section documents as { [section]: data }
 */
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const slugParam = searchParams.get('slug');
    const sectionParam = searchParams.get('section');

    // ── Fetch by slug: verify the slug matches the config doc, return all sections ──
    if (slugParam) {
      const configDoc = await IprSeminarPageContent.findOne({
        section: 'config',
        slug: slugParam,
      }).lean();

      if (!configDoc) {
        return NextResponse.json({ success: false, data: null }, { status: 404 });
      }

      // Return all sections merged into one flat map
      const docs = await IprSeminarPageContent.find({}).lean();
      const merged = {};
      for (const doc of docs) {
        // eslint-disable-next-line no-unused-vars
        const { section, _id, __v, createdAt, updatedAt, ...fields } = doc;
        Object.assign(merged, fields);
      }
      return NextResponse.json({ success: true, data: merged });
    }

    // ── Fetch a single named section ──────────────────────────────────────────
    if (sectionParam) {
      const doc = await IprSeminarPageContent.findOne({ section: sectionParam }).lean();
      return NextResponse.json({ success: true, data: doc });
    }

    // ── Fetch all sections as { [section]: data } ─────────────────────────────
    const docs = await IprSeminarPageContent.find({}).lean();
    const map = {};
    for (const doc of docs) {
      map[doc.section] = doc;
    }
    return NextResponse.json({ success: true, data: map });
  } catch (error) {
    console.error('[IPR-SEMINAR-CONTENT GET]', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch IPR Seminar content' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/ipr-seminar-content
 * Admin protected — upsert one section document.
 * Body: { section: 'config', ...fields }
 */
export async function PUT(request) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { section, ...fields } = body;

    if (!section) {
      return NextResponse.json(
        { success: false, message: 'section field is required' },
        { status: 400 }
      );
    }

    await connectDB();

    const updated = await IprSeminarPageContent.findOneAndUpdate(
      { section },
      { $set: { section, ...fields } },
      { upsert: true, new: true, runValidators: true }
    ).lean();

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('[IPR-SEMINAR-CONTENT PUT]', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update IPR Seminar content' },
      { status: 500 }
    );
  }
}
