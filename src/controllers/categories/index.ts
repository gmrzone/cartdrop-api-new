import { Request, Response } from 'express';
import CategoryService from '../../services/categoryService';
import { generateErrorObject, getBaseImageUrl } from '../../helpers';
import { ROW_COUNT_HEADER_NAME } from '../../config/constants';
export const getCategories = async (req: Request, res: Response) => {
  try {
    const baseUrl = getBaseImageUrl(req);
    const { rows, rowCount } = await CategoryService.getCategoriesWithImages(
      baseUrl,
    );
    res.setHeader(ROW_COUNT_HEADER_NAME, rowCount);
    res.status(200);
    return res.json(rows);
  } catch (err) {
    const errorObj = generateErrorObject(err);
    res.status(errorObj.statusCode);
    return res.json(errorObj);
  }
};
