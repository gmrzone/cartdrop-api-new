import { query } from '../../config/db';
import { ISUBCATEGORY, ISUBCATEGORY_WITH_IMAGES } from './interface';

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
      'SELECT name, slug, uuid, created FROM public.product_subcategory ORDER BY id ASC;',
      [],
    );
    return { rows, rowCount };
  };

  getSubcategoriesWithImages = async (baseUrl: string) => {
    const SQL = `SELECT name, slug, uuid, created, 
    json_agg(json_build_object('image', concat($1::text, product_subcategory_images.image))) 
    as subcategory_images FROM public.product_subcategory JOIN public.product_subcategory_images ON 
    product_subcategory_images.product_subcategory_id = product_subcategory.id GROUP BY 
    product_subcategory.id ORDER BY product_subcategory.id;`
    const { rows, rowCount } = await query<ISUBCATEGORY_WITH_IMAGES>(
      SQL,
      [baseUrl],
    );
    return { rows, rowCount };
  };

//   getSUbcategoriesWithCoupons = async (baseUrl: string) => {
//     const SQL = `SELECT name, slug, uuid, created, 
//     json_agg(json_build_object('image', concat($1::text, product_subcategory_images.image))) 
//     as subcategory_images, json_agg(json_build_object('code', concat))`
//   }
}

export default new SubCategoryService();
