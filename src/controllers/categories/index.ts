import { Request, Response } from 'express';
import CategoryService from '../../services/categoryService';
import { getBaseStaticUrl } from '../../helpers/index'
import { generateErrorObject } from '../../helpers'

export const getCategories = async (req: Request, res: Response) => {
    try{
        const baseUrl = getBaseStaticUrl(req)
        const { rows, rowCount } = await CategoryService.getCategoryWithImages(baseUrl)
        res.setHeader('x-row-count',rowCount)
        return res.status(200).json(rows)
    }
    catch(err){
        const errorObj = generateErrorObject(err, 500)
        return res.status(500).json(errorObj)
    }
};
