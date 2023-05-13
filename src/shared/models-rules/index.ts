import { AppRequest } from '../models';

/**
 * @param {AppRequest} request
 * @returns {string}
 */
export function getUserIdFromRequest(request: AppRequest): string {
  return (
    (request.user && request.user.id) || '5b7cf6d4-9a6e-4820-92a5-6d8cc6a2d50c'
  );
}
