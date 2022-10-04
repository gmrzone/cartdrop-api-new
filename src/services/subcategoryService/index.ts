import { query } from '../../config/db';
import {
  ISUBCATEGORY,
  ISUBCATEGORY_WITH_IMAGES,
  ISUBCATEGORY_WITH_COUPONS,
} from './interface';
import { SUBCATEGORY_SERVICE_SQL } from './constants';

interface ISUBCATEGORY_SERVICE {
  getSubcategories: () => Promise<{
    rows: ISUBCATEGORY[];
    rowCount: number;
  }>;

  getSubcategoriesWithImages: (baseUrl: string) => Promise<{
    rows: ISUBCATEGORY_WITH_IMAGES[];
    rowCount: number;
  }>;
}
class SubCategoryService implements ISUBCATEGORY_SERVICE {
  
  getSubcategories = async () => {
    const { rows, rowCount } = await query<ISUBCATEGORY>(
      SUBCATEGORY_SERVICE_SQL.GET_SUBCATEGORIES,
      [],
    );
    return { rows, rowCount };
  };

  getSubcategoriesWithImages = async (baseUrl: string) => {
    const { rows, rowCount } = await query<ISUBCATEGORY_WITH_IMAGES>(
      SUBCATEGORY_SERVICE_SQL.GET_SUBCATEGORIES_WITH_IMAGES,
      [baseUrl],
    );
    return { rows, rowCount };
  };

  getSubcategoriesForCategory = async (category: string, baseUrl: string) => {
    const { rows, rowCount } = await query<ISUBCATEGORY_WITH_IMAGES>(
      SUBCATEGORY_SERVICE_SQL.GET_SUBCATEGORIES_FOR_CATEGORY,
      [baseUrl, category],
    );
    return { rows, rowCount };
  };

  getSubcategoriesWithCoupons = async (baseUrl: string) => {
    const { rows, rowCount } = await query<ISUBCATEGORY_WITH_COUPONS>(
      SUBCATEGORY_SERVICE_SQL.GET_SUBCATEGORIES_WITH_COUPONS_NEW,
      [baseUrl],
    );
    return { rows, rowCount };
  };
}

export default new SubCategoryService();
