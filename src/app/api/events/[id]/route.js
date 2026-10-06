import connectDB from '@/lib/mongodb';
import Event from '@/models/Event';
import { getAuthFromCookies } from '@/lib/auth';
import { eventUpdateSchema } from '@/lib/validations';
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
    const event = isObjectId
      ? await Event.findById(id)
      : await Event.findOne({ slug: id });

    if (!event) return notFoundResponse('Event not found');

    // Increment views only for public slug-based access
    if (!isObjectId && event.status === 'published') {
      Event.findByIdAndUpdate(event._id, { $inc: { views: 1 } }).catch(() => {});
    }

    return successResponse(event);
  } catch (error) {
    console.error('[EVENT GET ERROR]', error);
    return errorResponse('Failed to fetch event', 500);
  }
}

export async function PUT(request, { params }) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) return unauthorizedResponse();

    const { id } = await params;
    const body = await request.json();

    const parsed = eventUpdateSchema.safeParse(body);
    if (!parsed.success) return validationError(parsed.error.flatten().fieldErrors);

    await connectDB();

    const event = await Event.findById(id);
    if (!event) return notFoundResponse('Event not found');

    // Check slug uniqueness if slug is being changed
    if (parsed.data.slug && parsed.data.slug !== event.slug) {
      const existing = await Event.findOne({ slug: parsed.data.slug, _id: { $ne: id } });
      if (existing) return validationError({ slug: ['This slug is already taken.'] });
    }

    const updateData = { ...parsed.data };

    // Handle publishedAt transitions
    if (parsed.data.status === 'published' && event.status !== 'published') {
      updateData.publishedAt = new Date();
    } else if (parsed.data.status === 'draft') {
      updateData.publishedAt = null;
    }

    const updated = await Event.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    return successResponse(updated, 'Event updated successfully');
  } catch (error) {
    console.error('[EVENT UPDATE ERROR]', error);
    if (error.code === 11000) return validationError({ slug: ['This slug is already taken.'] });
    return errorResponse('Failed to update event', 500);
  }
}

export async function PATCH(request, { params }) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) return unauthorizedResponse();

    const { id } = await params;
    const body = await request.json();

    await connectDB();

    const event = await Event.findById(id);
    if (!event) return notFoundResponse('Event not found');

    const updateData = { ...body };

    // Handle publishedAt on status PATCH
    if (body.status === 'published' && event.status !== 'published') {
      updateData.publishedAt = new Date();
    } else if (body.status === 'draft') {
      updateData.publishedAt = null;
    }

    const updated = await Event.findByIdAndUpdate(id, updateData, { new: true });
    return successResponse(updated, 'Event updated successfully');
  } catch (error) {
    console.error('[EVENT PATCH ERROR]', error);
    return errorResponse('Failed to update event', 500);
  }
}

export async function DELETE(request, { params }) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) return unauthorizedResponse();

    const { id } = await params;
    await connectDB();

    const event = await Event.findByIdAndDelete(id);
    if (!event) return notFoundResponse('Event not found');

    return successResponse({ id }, 'Event deleted successfully');
  } catch (error) {
    console.error('[EVENT DELETE ERROR]', error);
    return errorResponse('Failed to delete event', 500);
  }
}
