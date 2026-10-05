import connectDB from '@/lib/mongodb';
import Schedule from '@/models/Schedule';
import { getAuthFromCookies } from '@/lib/auth';
import { scheduleSchema } from '@/lib/validations';
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
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '15')));
    const status = searchParams.get('status') || '';
    const search = searchParams.get('search') || '';
    const sort = searchParams.get('sort') || '-createdAt';

    const filter = {};
    if (status && ['draft', 'published'].includes(status)) filter.status = status;
    if (search) {
      filter.$or = [{ title: { $regex: search, $options: 'i' } }];
    }

    const skip = (page - 1) * limit;

    const [docs, totalDocs, publishedCount, draftCount] = await Promise.all([
      Schedule.find(filter).sort(sort).skip(skip).limit(limit).select('-content').lean(),
      Schedule.countDocuments(filter),
      Schedule.countDocuments({ ...filter, status: 'published' }),
      Schedule.countDocuments({ ...filter, status: 'draft' }),
    ]);

    const totalPages = Math.ceil(totalDocs / limit);

    return successResponse({
      docs,
      totalDocs,
      publishedCount,
      draftCount,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    });
  } catch (error) {
    console.error('[SCHEDULES LIST ERROR]', error);
    return errorResponse('Failed to fetch schedules', 500);
  }
}

export async function POST(request) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) return unauthorizedResponse();

    const body = await request.json();
    const parsed = scheduleSchema.safeParse(body);
    if (!parsed.success) return validationError(parsed.error.flatten().fieldErrors);

    await connectDB();

    const existing = await Schedule.findOne({ slug: parsed.data.slug });
    if (existing) {
      return validationError({ slug: ['This slug is already taken.'] });
    }

    const schedule = await Schedule.create({
      ...parsed.data,
      publishedAt: parsed.data.status === 'published' ? new Date() : null,
    });

    return successResponse(schedule, 'Schedule created successfully', 201);
  } catch (error) {
    console.error('[SCHEDULE CREATE ERROR]', error);
    if (error.code === 11000) return validationError({ slug: ['This slug is already taken.'] });
    return errorResponse('Failed to create schedule', 500);
  }
}
