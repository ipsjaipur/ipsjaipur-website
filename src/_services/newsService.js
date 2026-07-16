/**
 * newsService.js — CLIENT SIDE ONLY
 * Import this only in 'use client' components.
 */

import { fetchWithClient } from '@/_utils/apiService';

/**
 * Paginated news list.
 * @param {{ page?: number, limit?: number, search?: string, category?: string }} options
 */
export async function getNews({ page = 1, limit = 9, search = '', category = '' } = {}) {
  const res = await fetchWithClient('news', {
    status: 'published',
    page: String(page),
    limit: String(limit),
    sort: '-publishedAt',
    ...(search && { search }),
    ...(category && { category }),
  });

  if (!res.success) throw new Error(res.message);

  return {
    docs: res.data?.docs || [],
    page: res.data?.page ?? page,
    totalPages: res.data?.totalPages ?? 1,
    totalDocs: res.data?.totalDocs ?? 0,
  };
}
