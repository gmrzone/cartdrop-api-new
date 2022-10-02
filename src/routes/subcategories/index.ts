import express from 'express';
import { getSubCategories, getSubcategoriesWithOffers } from '../../controllers/subcategories';

const router = express.Router();

router.get('/', getSubCategories)
router.get('/offers', getSubcategoriesWithOffers)

export default router