import connectDB from '@/lib/mongodb';
import Event from '@/models/Event';
import { getAuthFromCookies } from '@/lib/auth';
import { eventSchema } from '@/lib/validations';
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
  validationError,
} from '@/lib/apiResponse';

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '9')));
    const status = searchParams.get('status') || '';
    const category = searchParams.get('category') || '';
    const eventStatus = searchParams.get('eventStatus') || '';
    const search = searchParams.get('search') || '';
    const sort = searchParams.get('sort') || '-eventDate';

    const filter = {};
    if (status && ['draft', 'published'].includes(status)) filter.status = status;
    if (category) filter.category = { $regex: category, $options: 'i' };
    if (eventStatus && ['upcoming', 'completed'].includes(eventStatus)) filter.eventStatus = eventStatus;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { organizer: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;

    const [docs, totalDocs, publishedCount, draftCount, upcomingCount, completedCount] = await Promise.all([
      Event.find(filter).sort(sort).skip(skip).limit(limit).select('-content').lean(),
      Event.countDocuments(filter),
      Event.countDocuments({ ...filter, status: 'published' }),
      Event.countDocuments({ ...filter, status: 'draft' }),
      Event.countDocuments({ ...filter, eventStatus: 'upcoming' }),
      Event.countDocuments({ ...filter, eventStatus: 'completed' }),
    ]);

    const totalPages = Math.ceil(totalDocs / limit);

    return successResponse({
      docs,
      totalDocs,
      publishedCount,
      draftCount,
      upcomingCount,
      completedCount,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    });
  } catch (error) {
    console.error('[EVENTS LIST ERROR]', error);
    return errorResponse('Failed to fetch events', 500);
  }
}

export async function POST(request) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) return unauthorizedResponse();

    const body = await request.json();
    const parsed = eventSchema.safeParse(body);
    if (!parsed.success) return validationError(parsed.error.flatten().fieldErrors);

    await connectDB();

    const existing = await Event.findOne({ slug: parsed.data.slug });
    if (existing) {
      return validationError({ slug: ['This slug is already taken.'] });
    }

    const event = await Event.create({
      ...parsed.data,
      publishedAt: parsed.data.status === 'published' ? new Date() : null,
    });

    return successResponse(event, 'Event created successfully', 201);
  } catch (error) {
    console.error('[EVENT CREATE ERROR]', error);
    if (error.code === 11000) return validationError({ slug: ['This slug is already taken.'] });
    return errorResponse('Failed to create event', 500);
  }
}
