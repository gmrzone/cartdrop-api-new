import express from 'express';
import {
  getSubCategories,
  getSubcategoriesWithOffers,
  getSubcategoriesForCategory,
} from '../../controllers/subcategories';

const router = express.Router();

router.get('/', getSubCategories);
router.get('/offers', getSubcategoriesWithOffers);
router.get('/:category', getSubcategoriesForCategory);

export default router;
