import { Request, Response } from 'express';

export const getFeaturedProducts = (req: Request, res: Response) => {
  return res.status(200).json({ status: 'ok' });
};

export const getProductForCategory = (req: Request, res: Response) => {
  return res.status(200).json({ status: 'ok' });
};

export const getProductDetail = (req: Request, res: Response) => {
  return res.status(200).json({ status: 'ok' });
};
