import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import IpsSutraPageContent from '@/models/IpsSutraPageContent';
import { getAuthFromCookies } from '@/lib/auth';

/**
 * GET /api/ips-sutra-content
 * Public — returns all section documents as { [section]: data }
 * Optional query: ?section=content  → returns only that section
 */
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');

    if (section) {
      const doc = await IpsSutraPageContent.findOne({ section }).lean();
      return NextResponse.json({ success: true, data: doc });
    }

    const docs = await IpsSutraPageContent.find({}).lean();
    const map = {};
    for (const doc of docs) {
      map[doc.section] = doc;
    }
    return NextResponse.json({ success: true, data: map });
  } catch (error) {
    console.error('[IPS-SUTRA-CONTENT GET]', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch IPS Sutra content' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/ips-sutra-content
 * Admin protected — upsert one section document
 * Body: { section: 'content' | 'advantages', ...fields }
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

    const updated = await IpsSutraPageContent.findOneAndUpdate(
      { section },
      { $set: { section, ...fields } },
      { upsert: true, new: true, runValidators: true }
    ).lean();

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('[IPS-SUTRA-CONTENT PUT]', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update IPS Sutra content' },
      { status: 500 }
    );
  }
}
