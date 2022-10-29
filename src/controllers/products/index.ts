import { Request, Response } from 'express';
import ProductService from '../../services/productService';
import { getBaseImageUrl } from '../../helpers/index';

export const getFeaturedProducts = async (req: Request, res: Response) => {
  const imageBaseUrl = getBaseImageUrl(req);
  const { rows, rowCount } = await ProductService.getFeaturedProducts(
    imageBaseUrl,
  );
  res.setHeader('x-row-count', rowCount);
  return res.status(200).json(rows);
};

export const getProductForCategory = async (req: Request, res: Response) => {
  const imageBaseUrl = getBaseImageUrl(req);
  const { category } = req.params;
  const { rows, rowCount } = await ProductService.getProductsForCategory(
    imageBaseUrl,
    category,
  );
  res.setHeader('x-row-count', rowCount);
  return res.status(200).json(rows);
};

export const getProductDetail = (req: Request, res: Response) => {
  return res.status(200).json({ status: 'ok' });
};
