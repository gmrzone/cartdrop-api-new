import { Request } from 'express'
import url from 'url'
export const getVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw Error(`Please Add Environment variable ${key}`);
  }
  return value;
};


export const getBaseStaticUrl = (req: Request) => {
  const absoluteUrl = req.protocol + '://' + req.get('host') + '/static/';
  return absoluteUrl
}