import { Request } from 'express';
import { DEFAULT_ERROR_MESSAGE } from '../controllers/constant';
import { intervalToDuration } from 'date-fns';
import {
  RateLimitExceededEventHandler,
  AugmentedRequest,
} from 'express-rate-limit';

export const getVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw Error(`Please Add Environment variable ${key}`);
  }
  return value;
};

export const getBaseStaticUrl = (req: Request) => {
  const absoluteUrl = req.protocol + '://' + req.get('host') + '/static/';
  return absoluteUrl;
};

export const generateErrorObject = (err: unknown, code: number) => {
  const currentDate = new Date().toISOString();
  const defaultErrorMssg = DEFAULT_ERROR_MESSAGE[code.toString()];
  return {
    currentDate: currentDate,
    message:
      err instanceof Error ? err.message || defaultErrorMssg : defaultErrorMssg,
    statusCode: code,
  };
};

// TODO: Need to refactor this to many if conditions
export const rateLimiterHandler: RateLimitExceededEventHandler = (
  request,
  response,
  next,
  options,
) => {
  const {
    rateLimit: { resetTime },
  } = request as AugmentedRequest;
  let formatedDate = '';
  if (resetTime) {
    const intervalObj = intervalToDuration({
      start: resetTime,
      end: new Date(),
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
    ...options.message,
    message: `You have made too many requests, please try again after ${formatedDate}.`,
  };
  response.status(options.statusCode).send(updatedMessage);
};
