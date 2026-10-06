/**
 * eventService.js — CLIENT SIDE ONLY
 * Import this only in 'use client' components.
 */

import { fetchWithClient } from '@/_utils/apiService';

/**
 * Paginated events list.
 * @param {{ page?: number, limit?: number, search?: string, category?: string, eventStatus?: string }} options
 */
export async function getEvents({
  page = 1,
  limit = 9,
  search = '',
  category = '',
  eventStatus = '',
} = {}) {
  const res = await fetchWithClient('events', {
    status: 'published',
    page: String(page),
    limit: String(limit),
    sort: '-eventDate',
    ...(search && { search }),
    ...(category && { category }),
    ...(eventStatus && { eventStatus }),
  });

  if (!res.success) throw new Error(res.message);

  return {
    docs: res.data?.docs || [],
    page: res.data?.page ?? page,
    totalPages: res.data?.totalPages ?? 1,
    totalDocs: res.data?.totalDocs ?? 0,
    upcomingCount: res.data?.upcomingCount ?? 0,
    completedCount: res.data?.completedCount ?? 0,
  };
}
