import { query } from '../../config/db';
import {
  ISUBCATEGORY,
  ISUBCATEGORY_WITH_IMAGES,
  ISUBCATEGORY_WITH_COUPONS,
} from './interface';

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
    product_subcategory_images.subcategory_id = product_subcategory.id GROUP BY 
    product_subcategory.id ORDER BY product_subcategory.id;`;
    const { rows, rowCount } = await query<ISUBCATEGORY_WITH_IMAGES>(SQL, [
      baseUrl,
    ]);
    return { rows, rowCount };
  };

  getSubcategoriesWithCoupons = async (baseUrl: string) => {
    const SQL = `SELECT name, slug, product_subcategory.uuid, product_subcategory.created,json_agg(json_build_object('image', concat($1::text, product_subcategory_images.image))),
	json_agg(json_build_object('code', coupon_codes.code, 'discount', coupon_codes.discount)) as coupons FROM public.product_subcategory 
	JOIN public.product_subcategory_images ON product_subcategory.id = product_subcategory_images.subcategory_id 
    JOIN public.coupon_codes_subcategory_intermediate ON product_subcategory.id = coupon_codes_subcategory_intermediate.subcategory_id 
    JOIN public.coupon_codes ON coupon_codes_subcategory_intermediate.coupon_code_id = coupon_codes.id GROUP BY product_subcategory.id ORDER BY product_subcategory.id;`;

    const { rows, rowCount } = await query<ISUBCATEGORY_WITH_COUPONS>(SQL, [
      baseUrl,
    ]);
    return { rows, rowCount };
  };
}

export default new SubCategoryService();
