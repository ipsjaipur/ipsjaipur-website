import { NextResponse } from 'next/server';

/**
 * Send a successful JSON response
 * @param {any} data
 * @param {string} [message]
 * @param {number} [status]
 */
export function successResponse(data, message = 'Success', status = 200) {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status }
  );
}

/**
 * Send an error JSON response
 * @param {string} message
 * @param {number} [status]
 * @param {any} [errors]
 */
export function errorResponse(message = 'An error occurred', status = 500, errors = null) {
  return NextResponse.json(
    {
      success: false,
      message,
      ...(errors && { errors }),
    },
    { status }
  );
}

/**
 * Send a validation error response (400)
 * @param {any} errors - Zod formatted errors
 */
export function validationError(errors) {
  return NextResponse.json(
    {
      success: false,
      message: 'Validation failed',
      errors,
    },
    { status: 400 }
  );
}

/**
 * Send an unauthorized response (401)
 */
export function unauthorizedResponse(message = 'Unauthorized') {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status: 401 }
  );
}

/**
 * Send a forbidden response (403)
 */
export function forbiddenResponse(message = 'Forbidden') {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status: 403 }
  );
}

/**
 * Send a not found response (404)
 */
export function notFoundResponse(message = 'Not found') {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status: 404 }
  );
}
