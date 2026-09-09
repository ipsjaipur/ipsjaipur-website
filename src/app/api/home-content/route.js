import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import HomePageContent from '@/models/HomePageContent';
import { getAuthFromCookies } from '@/lib/auth';

/**
 * GET /api/home-content
 * Public — returns all 10 section documents as { [section]: data }
 * Optional query: ?section=banner  → returns only that section
 */
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');

    if (section) {
      const doc = await HomePageContent.findOne({ section }).lean();
      return NextResponse.json({ success: true, data: doc });
    }

    const docs = await HomePageContent.find({}).lean();
    // Convert array → keyed object  { banner: {...}, approvals: {...}, ... }
    const map = {};
    for (const doc of docs) {
      map[doc.section] = doc;
    }
    return NextResponse.json({ success: true, data: map });
  } catch (error) {
    console.error('[HOME-CONTENT GET]', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch home content' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/home-content
 * Admin protected — upsert one section document
 * Body: { section: 'banner', ...fields }
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

    const updated = await HomePageContent.findOneAndUpdate(
      { section },
      { $set: { section, ...fields } },
      { upsert: true, new: true, runValidators: true }
    ).lean();

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('[HOME-CONTENT PUT]', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update home content' },
      { status: 500 }
    );
  }
}
