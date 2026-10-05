import connectDB from '@/lib/mongodb';
import Schedule from '@/models/Schedule';
import { getAuthFromCookies } from '@/lib/auth';
import { scheduleUpdateSchema } from '@/lib/validations';
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
  notFoundResponse,
  validationError,
} from '@/lib/apiResponse';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const isObjectId = /^[a-f0-9]{24}$/i.test(id);
    const schedule = isObjectId
      ? await Schedule.findById(id)
      : await Schedule.findOne({ slug: id });

    if (!schedule) return notFoundResponse('Schedule not found');
    return successResponse(schedule);
  } catch (error) {
    console.error('[SCHEDULE GET ERROR]', error);
    return errorResponse('Failed to fetch schedule', 500);
  }
}

export async function PUT(request, { params }) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) return unauthorizedResponse();

    const { id } = await params;
    const body = await request.json();

    const parsed = scheduleUpdateSchema.safeParse(body);
    if (!parsed.success) return validationError(parsed.error.flatten().fieldErrors);

    await connectDB();

    const schedule = await Schedule.findById(id);
    if (!schedule) return notFoundResponse('Schedule not found');

    if (parsed.data.slug && parsed.data.slug !== schedule.slug) {
      const existing = await Schedule.findOne({ slug: parsed.data.slug, _id: { $ne: id } });
      if (existing) return validationError({ slug: ['This slug is already taken.'] });
    }

    const updateData = { ...parsed.data };
    if (parsed.data.status === 'published' && schedule.status !== 'published') {
      updateData.publishedAt = new Date();
    } else if (parsed.data.status === 'draft') {
      updateData.publishedAt = null;
    }

    const updated = await Schedule.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    return successResponse(updated, 'Schedule updated successfully');
  } catch (error) {
    console.error('[SCHEDULE UPDATE ERROR]', error);
    if (error.code === 11000) return validationError({ slug: ['This slug is already taken.'] });
    return errorResponse('Failed to update schedule', 500);
  }
}

export async function PATCH(request, { params }) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) return unauthorizedResponse();

    const { id } = await params;
    const body = await request.json();

    await connectDB();

    const schedule = await Schedule.findById(id);
    if (!schedule) return notFoundResponse('Schedule not found');

    const updateData = { ...body };
    if (body.status === 'published' && schedule.status !== 'published') {
      updateData.publishedAt = new Date();
    } else if (body.status === 'draft') {
      updateData.publishedAt = null;
    }

    const updated = await Schedule.findByIdAndUpdate(id, updateData, { new: true });
    return successResponse(updated, 'Schedule updated successfully');
  } catch (error) {
    console.error('[SCHEDULE PATCH ERROR]', error);
    return errorResponse('Failed to update schedule', 500);
  }
}

export async function DELETE(request, { params }) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) return unauthorizedResponse();

    const { id } = await params;
    await connectDB();

    const schedule = await Schedule.findByIdAndDelete(id);
    if (!schedule) return notFoundResponse('Schedule not found');

    return successResponse({ id }, 'Schedule deleted successfully');
  } catch (error) {
    console.error('[SCHEDULE DELETE ERROR]', error);
    return errorResponse('Failed to delete schedule', 500);
  }
}
