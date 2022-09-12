import { Request, Response } from 'express';
import CategoryService from '../../services/categoryService';
import { getBaseStaticUrl } from '../../helpers/index'
import { generateErrorObject } from '../../helpers'

export const getCategories = async (req: Request, res: Response) => {
    try{
        const baseUrl = getBaseStaticUrl(req)
        const { rows, rowCount } = await CategoryService.getCategoriesWithImages(baseUrl)
        res.setHeader('x-row-count',rowCount)
        res.status(200)
        return res.json(rows)
    }
    catch(err){
        const errorObj = generateErrorObject(err, 500)
        res.status(500)
        return res.json(errorObj)
    }
};
