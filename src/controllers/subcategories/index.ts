import { Request, Response } from 'express';
import SubcategoryService from '../../services/subcategoryService';
import { getBaseStaticUrl, generateErrorObject } from '../../helpers';
import { ROW_COUNT_HEADER_NAME } from '../../config/constants'

export const getSubCategories = async (req: Request, res: Response) => {
    try{
        const baseUrl = getBaseStaticUrl(req)
        const {rows, rowCount} = await SubcategoryService.getSubcategoriesWithImages(baseUrl)
        res.setHeader(ROW_COUNT_HEADER_NAME, rowCount)
        res.status(200)
        return res.json(rows)
    }
    catch(err){
        const errorObj = generateErrorObject(err, 500)
        res.status(500)
        return res.json(errorObj)
    }
}

export const getSubcategoriesWithOffers = async (req: Request, res: Response) => {
    try{
        const baseUrl = getBaseStaticUrl(req)
        const { rows, rowCount} = await SubcategoryService.getSubcategoriesWithCoupons(baseUrl)
        res.setHeader(ROW_COUNT_HEADER_NAME, rowCount)
        return res.json(rows)
    }
    catch(err){
        const errorObj = generateErrorObject(err, 500)
        res.status(500)
        return res.json(errorObj)
    }
}