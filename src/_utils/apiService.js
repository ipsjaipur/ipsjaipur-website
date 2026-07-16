/**
 * apiService.js
 *
 * fetchWithClient — axios-based, browser only.
 * Use inside 'use client' components to hit /api/* route handlers.
 */

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

/**
 * @param {string} endpoint  e.g. 'blog', 'news'
 * @param {Object} params    query params
 * @returns {Promise<{ success: boolean, data: any, message?: string }>}
 */
export async function fetchWithClient(endpoint, params = {}) {
  try {
    const response = await axiosInstance.get(endpoint, { params });
    const body = response.data;
    if (body?.success) return { success: true, data: body.data };
    return { success: false, data: null, message: body?.message || 'Request failed' };
  } catch (error) {
    const message = error?.response?.data?.message || error?.message || 'Network error';
    return { success: false, data: null, message };
  }
}
