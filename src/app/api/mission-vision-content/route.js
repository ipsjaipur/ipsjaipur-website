import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import MissionVisionPageContent from '@/models/MissionVisionPageContent';
import { getAuthFromCookies } from '@/lib/auth';

/**
 * GET /api/mission-vision-content
 * Public — returns all section documents as { [section]: data }
 * Optional query: ?section=banner  → returns only that section
 */
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');

    if (section) {
      const doc = await MissionVisionPageContent.findOne({ section }).lean();
      return NextResponse.json({ success: true, data: doc });
    }

    const docs = await MissionVisionPageContent.find({}).lean();
    const map = {};
    for (const doc of docs) {
      map[doc.section] = doc;
    }
    return NextResponse.json({ success: true, data: map });
  } catch (error) {
    console.error('[MISSION-VISION-CONTENT GET]', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch mission vision content' },
      { status: 500 },
    );
  }
}

/**
 * PUT /api/mission-vision-content
 * Admin protected — upsert one section document
 * Body: { section: 'banner' | 'institutional' | 'vision_mission' | 'core_values', ...fields }
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
        { status: 400 },
      );
    }

    await connectDB();

    const updated = await MissionVisionPageContent.findOneAndUpdate(
      { section },
      { $set: { section, ...fields } },
      { upsert: true, new: true, runValidators: false },
    ).lean();

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('[MISSION-VISION-CONTENT PUT]', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update mission vision content' },
      { status: 500 },
    );
  }
}
