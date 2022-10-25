import { Request, Response } from 'express';
import ProductService from '../../services/productService';
export const getFeaturedProducts = async (req: Request, res: Response) => {
  const { rows, rowCount } = await ProductService.getFeaturedProducts('');
  res.setHeader('x-row-count', rowCount);
  return res.status(200).json(rows);
};

export const getProductForCategory = async (req: Request, res: Response) => {
  return res.status(200).json({ status: 'ok' });
};

export const getProductDetail = (req: Request, res: Response) => {
  return res.status(200).json({ status: 'ok' });
};
