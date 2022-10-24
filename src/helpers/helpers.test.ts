import { DatabaseError } from 'pg';
import { ValidationError as JoiValidationError } from 'joi';
import { generateErrorObject } from '.';
import { NotFoundError, ValidationError } from './errors';

describe('helpers functions tests', () => {
  describe('generateErrorObject test cases', () => {
    it('if error type is database error and error code is not 23505 (unique constraints error) then it should return proper internal server error response with status code 500', () => {
      const databaseError = new DatabaseError('SQL ERROR', 3, 'error');
      databaseError.code = '12345';
      const response = generateErrorObject(databaseError);
      expect(response).toEqual(
        expect.objectContaining({
          code: '12345',
          currentDate: expect.any(String),
          errors: 'Internal Server Error. Please try again later',
          status: 'error',
          statusCode: 500,
        }),
      );
    });

    it('if error type is database error and error code is 23505 (unique constraints error) then it should return proper response and statusCode 409', () => {
      const databaseError = new DatabaseError('SQL ERROR', 3, 'error');
      databaseError.code = '23505';
      const response = generateErrorObject(databaseError);
      expect(response).toEqual(
        expect.objectContaining({
          code: '23505',
          currentDate: expect.any(String),
          errors: 'Resource already exist. cannot create a duplicate resource.',
          status: 'error',
          statusCode: 409,
        }),
      );
    });

    it('if error type is database error and error code is 23505 (unique constraints error) and error detail key is present then it should return proper response and statusCode 409', () => {
      const databaseError = new DatabaseError('SQL ERROR', 3, 'error');
      databaseError.code = '23505';
      databaseError.detail =
        'Key (email)=(saiyedafzalgz@gmail.com) already exists.';
      const response = generateErrorObject(databaseError);
      expect(response).toEqual(
        expect.objectContaining({
          code: '23505',
          currentDate: expect.any(String),
          errors:
            'email with saiyedafzalgz@gmail.com already exists. please try different value or if you already have a account then please login',
          status: 'error',
          statusCode: 409,
        }),
      );
    });

    it('if error type is NotFoundError then it should return proper response with status code', () => {
      const notFoundError = new NotFoundError('user Not Found');
      const response = generateErrorObject(notFoundError);
      expect(response).toEqual(
        expect.objectContaining({
          code: 'NOT_FOUND',
          currentDate: expect.any(String),
          errors: 'user Not Found',
          status: 'error',
          statusCode: 404,
        }),
      );
    });

    it('if error type is validationError then it should return proper response with list of errors and status code of 400', () => {
      const joiErrorMock = {
        _original: {},
        details: [
          {
            message: '"username" is required',
            path: ['username'],
            type: 'any.required',
            context: {
              label: 'username',
              key: 'username',
            },
          },
          {
            message: '"email" is required',
            path: ['username'],
            type: 'any.required',
            context: {
              label: 'username',
              key: 'username',
            },
          },
        ],
      } as JoiValidationError;

      const validationError = new ValidationError(
        'Validation Error',
        joiErrorMock,
      );
      const response = generateErrorObject(validationError);
      expect(response).toEqual(
        expect.objectContaining({
          code: 'VALIDATION_ERROR',
          currentDate: expect.any(String),
          errors: ['"username" is required', '"email" is required'],
          status: 'error',
          statusCode: 400,
        }),
      );
    });
  });
});
