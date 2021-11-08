export default class NotFoundError extends Error {
  constructor() {
    super();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

NotFoundError.prototype.name = 'NotFoundError';
NotFoundError.prototype.message = '';
