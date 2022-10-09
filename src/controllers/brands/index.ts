import { Request, Response } from 'express';
import BrandService from '../../services/brandService';
import { getBaseImageUrl, generateErrorObject } from '../../helpers';
import { ROW_COUNT_HEADER_NAME } from '../../config/constants';

export const getBrands = async (req: Request, res: Response) => {
  try {
    const { pageSize = '5', cursor = '1' } = req.query;
    const baseUrl = getBaseImageUrl(req);
    const { rows, rowCount, nextCursor } = await BrandService.getBrands(
      baseUrl,
      +pageSize,
      +cursor,
    );
    res.setHeader(ROW_COUNT_HEADER_NAME, rowCount);
    res.status(200);
    return res.json({ nextCursor: nextCursor, rows });
  } catch (err) {
    const errorObj = generateErrorObject(err, 500);
    res.status(500);
    return res.json(errorObj);
  }
};

export const getBrandsByCategory = async (req: Request, res: Response) => {
  try {
    const baseUrl = getBaseImageUrl(req);
    const { category } = req.params;
    const { rows, rowCount } = await BrandService.getBrandsByCategory(
      baseUrl,
      category,
    );
    res.setHeader(ROW_COUNT_HEADER_NAME, rowCount);
    res.status(200);
    return res.json(rows);
  } catch (err) {
    const errorObj = generateErrorObject(err, 500);
    res.status(500);
    return res.json(errorObj);
  }
};
