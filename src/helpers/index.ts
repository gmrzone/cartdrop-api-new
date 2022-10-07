import { Request } from 'express';
import { DEFAULT_ERROR_MESSAGE } from '../controllers/constant';

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
