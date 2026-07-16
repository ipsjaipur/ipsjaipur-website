import { z } from 'zod';

// ─── Auth Validations ──────────────────────────────────────────────────────────

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional().default(false),
});

// ─── Blog / News Validations ───────────────────────────────────────────────────

export const postSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title cannot exceed 200 characters'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .max(200, 'Slug too long')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  shortDescription: z
    .string()
    .max(500, 'Short description cannot exceed 500 characters')
    .optional()
    .default(''),
  content: z.string().optional().default(''),
  featuredImage: z
    .object({
      url: z.string().optional().default(''),
      alt: z.string().optional().default(''),
    })
    .optional()
    .default({}),
  author: z.string().max(100).optional().default('IPS Business School'),
  category: z.string().max(100).optional().default('General'),
  tags: z.array(z.string()).optional().default([]),
  focusKeyword: z.string().max(100, 'Focus keyword cannot exceed 100 characters').optional().default(''),
  metaTitle: z.string().max(70, 'Meta title cannot exceed 70 characters').optional().default(''),
  metaDescription: z
    .string()
    .max(160, 'Meta description cannot exceed 160 characters')
    .optional()
    .default(''),
  metaKeywords: z.string().optional().default(''),
  canonicalUrl: z.string().optional().default(''),
  ogImage: z.string().optional().default(''),
  status: z.enum(['draft', 'published']).optional().default('draft'),
});

export const postUpdateSchema = postSchema.partial().extend({
  slug: z
    .string()
    .min(1, 'Slug is required')
    .max(200, 'Slug too long')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens')
    .optional(),
});

// ─── Image Upload Validation ───────────────────────────────────────────────────

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export function validateImageFile(file) {
  const errors = [];

  if (!file) {
    errors.push('No file provided');
    return { valid: false, errors };
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    errors.push('Only JPG, JPEG, PNG, and WebP images are allowed');
  }

  if (file.size > MAX_IMAGE_SIZE) {
    errors.push('Image size cannot exceed 5MB');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
