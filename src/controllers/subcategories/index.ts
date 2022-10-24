import { Request, Response } from 'express';
import SubcategoryService from '../../services/subcategoryService';
import { getBaseImageUrl, generateErrorObject } from '../../helpers';
import { ROW_COUNT_HEADER_NAME } from '../../config/constants';
import { NotFoundError } from '../../helpers/errors';
export const getSubCategories = async (req: Request, res: Response) => {
  try {
    const baseUrl = getBaseImageUrl(req);
    const { rows, rowCount } =
      await SubcategoryService.getSubcategoriesWithImages(baseUrl);
    res.setHeader(ROW_COUNT_HEADER_NAME, rowCount);
    res.status(200);
    return res.json(rows);
  } catch (err) {
    const errorObj = generateErrorObject(err);
    res.status(errorObj.statusCode);
    return res.json(errorObj);
  }
};

export const getSubcategoriesForCategory = async (
  req: Request,
  res: Response,
) => {
  try {
    const { category } = req.params;
    const baseUrl = getBaseImageUrl(req);
    const { rows, rowCount } =
      await SubcategoryService.getSubcategoriesForCategory(baseUrl, category);
    res.setHeader(ROW_COUNT_HEADER_NAME, rowCount);
    if (!rowCount) {
      const errorResponse = generateErrorObject(
        new NotFoundError(`There is no subcategories for category ${category}`),
      );
      res.status(errorResponse.statusCode);
      res.json(errorResponse);
    }
    res.status(200);
    return res.json(rows);
  } catch (err) {
    const errorObj = generateErrorObject(err);
    res.status(errorObj.statusCode);
    return res.json(errorObj);
  }
};

export const getSubcategoriesWithOffers = async (
  req: Request,
  res: Response,
) => {
  try {
    const baseUrl = getBaseImageUrl(req);
    const { rows, rowCount } =
      await SubcategoryService.getSubcategoriesWithCoupons(baseUrl);
    res.setHeader(ROW_COUNT_HEADER_NAME, rowCount);
    res.status(200);
    return res.json(rows);
  } catch (err) {
    const errorObj = generateErrorObject(err);
    res.status(errorObj.statusCode);
    return res.json(errorObj);
  }
};
