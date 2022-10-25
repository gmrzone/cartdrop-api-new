import { Router } from 'express';
import {
  getFeaturedProducts,
  getProductDetail,
  getProductForCategory,
} from '../../controllers/products';

const router = Router();

router.get('/featured', getFeaturedProducts);
router.get('/:category', getProductForCategory);
router.get('/:slug/:uuid/:pid', getProductDetail);
