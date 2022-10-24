import { Request } from 'express';
import { DEFAULT_ERROR_MESSAGE } from '../controllers/constant';
import { intervalToDuration } from 'date-fns';
import {
  RateLimitExceededEventHandler,
  AugmentedRequest,
} from 'express-rate-limit';
import { DatabaseError } from 'pg';
import { NotFoundError, ValidationError } from './errors';
export const getVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw Error(`Please Add Environment variable ${key}`);
  }
  return value;
};

export const getBaseImageUrl = (req: Request) => {
  const absoluteUrl = req.protocol + '://' + req.get('host') + '/static/';
  return absoluteUrl;
};

export const getAbsoulueUrl = (req: Request) => {
  const absoluteUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  return absoluteUrl;
};

export const generateErrorObject = (err: unknown) => {
  const currentDate = new Date().toISOString();
  let code;
  let errorMssg;
  let statusCode;

  if (err instanceof DatabaseError) {
    code = err.code || 'INTERNAL_ERROR';
    switch (code) {
      case '23505':
        statusCode = 409;
        if (err.detail) {
          const fieldAndValue = err.detail.slice(4, -16);
          let [field, value] = fieldAndValue.split('=');
          field = field.slice(1, -1);
          value = value.slice(1, -1);
          errorMssg =
            field && value
              ? `${field} with ${value} already exists. please try different value or if you already have a account then please login`
              : DEFAULT_ERROR_MESSAGE[statusCode];
        } else {
          errorMssg = DEFAULT_ERROR_MESSAGE[statusCode];
        }
        break;
      default:
        statusCode = 500;
        errorMssg = DEFAULT_ERROR_MESSAGE[statusCode];
    }
  } else if (err instanceof NotFoundError) {
    code = err.code;
    statusCode = err.statusCode;
    errorMssg = err.message || DEFAULT_ERROR_MESSAGE[statusCode];
  } else if (err instanceof ValidationError) {
    code = err.code;
    statusCode = err.statusCode;
    errorMssg = err.errors;
  } else {
    code = 'INTERNAL_ERROR';
    statusCode = 500;
    errorMssg = DEFAULT_ERROR_MESSAGE[statusCode];
  }
  return {
    code,
    status: 'error',
    statusCode,
    currentDate: currentDate,
    errors: errorMssg,
  };
};

// export const generateValidationError = (err: ValidationError) => {
//   const currentDate = new Date().toISOString();
//   const errors = err.details.map((error) => error.message);
//   return {
//     code: 'VALIDATION_ERROR',
//     status: 'error',
//     currentDate: currentDate,
//     errors,
//     statusCode: 400,
//   };
// };

// TODO: Need to refactor this, has too many if conditions
export const rateLimiterHandler: RateLimitExceededEventHandler = (
  request,
  response,
  _next,
  options,
) => {
  const {
    rateLimit: { resetTime },
  } = request as AugmentedRequest;
  let formatedDate = '';
  const currentDate = new Date();
  if (resetTime) {
    const intervalObj = intervalToDuration({
      start: resetTime,
      end: currentDate,
    });
    if (intervalObj.years) {
      formatedDate += `${intervalObj.years} Year${
        intervalObj.years > 1 && 's'
      }, `;
    }
    if (intervalObj.months) {
      formatedDate += `${intervalObj.months} Month${
        intervalObj.months > 1 && 's'
      }, `;
    }
    if (intervalObj.days) {
      formatedDate += `${intervalObj.days} Days${
        intervalObj.days > 1 && 's'
      }, `;
    }
    if (intervalObj.hours) {
      formatedDate += `${intervalObj.hours} Hour${
        intervalObj.hours > 1 && 's'
      }, `;
    }
    if (intervalObj.minutes) {
      formatedDate += `${intervalObj.minutes} Min${
        intervalObj.minutes > 1 && 's'
      }, `;
    }
    if (intervalObj.seconds) {
      formatedDate += `${intervalObj.seconds} Sec${
        intervalObj.seconds > 1 && 's'
      }, `;
    }
  }
  const updatedMessage = {
    code: 'LIMIT_ERROR',
    status: 'error',
    ...options.message,
    currentDate: currentDate.toISOString(),
    errors: `You have made too many requests, please try again after ${formatedDate}.`,
    statusCode: options.statusCode,
  };
  response.status(options.statusCode).send(updatedMessage);
};
