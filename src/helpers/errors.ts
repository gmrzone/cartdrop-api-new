import { ValidationError as JoiValidationError } from 'joi';
export class NotFoundError extends Error {
  public code: string;
  public statusCode: number;
  constructor(message: string) {
    super(message);
    this.code = 'NOT_FOUND';
    this.statusCode = 404;
  }
}

export class ValidationError extends Error {
  public code: string;
  public statusCode: number;
  public errors: string[];
  constructor(message: string, errors: JoiValidationError) {
    super(message);
    this.code = 'VALIDATION_ERROR';
    this.statusCode = 400;
    this.errors = errors.details.map((err) => err.message);
  }
}
