import { Router } from 'express';
import { getBrands, getBrandsByCategory } from '../../controllers/brands';

const router = Router();

router.get('/', getBrands);
router.get('/:category', getBrandsByCategory);

export default router;
