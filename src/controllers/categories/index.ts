import { Request, Response } from 'express';
import CategoryService from '../../services/categoryService';
import { getBaseStaticUrl } from '../../helpers/index'

export const getCategories = async (req: Request, res: Response) => {
    const baseUrl = getBaseStaticUrl(req)
    const { rows, rowCount } = await CategoryService.getCategoryWithImages(baseUrl)
    res.setHeader('x-row-count',rowCount)
    return res.status(200).json(rows)
};
