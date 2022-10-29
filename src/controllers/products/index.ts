import { Request, Response } from 'express';
import ProductService from '../../services/productService';
import { generateErrorObject, getBaseImageUrl } from '../../helpers/index';
import { NotFoundError } from '../../helpers/errors';

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

export const getProductDetail = async (req: Request, res: Response) => {
  const imageBaseUrl = getBaseImageUrl(req);
  const { uuid, pid, slug } = req.params;
  const { data, rowCount } = await ProductService.getProductDetail(
    imageBaseUrl,
    slug,
    uuid,
    pid,
  );
  if (rowCount === 0) {
    const errorObj = generateErrorObject(
      new NotFoundError(`Product not found. please try again later`),
    );
    res.status(errorObj.statusCode);
    res.json(errorObj);
  }
  res.setHeader('x-row-count', rowCount);
  return res.status(200).json(data);
};
