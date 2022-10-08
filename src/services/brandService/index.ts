import { IBRAND_RESPONSE } from './interface';
import { query } from '../../config/db';
interface IBRAND_SERVICES {
  getBrands: (
    baseUrl: string,
  ) => Promise<{ rows: IBRAND_RESPONSE[]; rowCount: number }>;
  getBrandsByCategory: (
    baseUrl: string,
    category: string,
  ) => Promise<{
    rows: IBRAND_RESPONSE[];
    rowCount: number;
  }>;
}

class BrandService implements IBRAND_SERVICES {
  getBrands = async (baseUrl: string) => {
    const SQL =
      'SELECT uuid, name, concat($1::text, photo) as photo, concat($1::text, placeholder) as placeholder FROM public.brands ORDER BY id ASC;';
    const { rows, rowCount } = await query<IBRAND_RESPONSE>(SQL, [baseUrl]);
    return { rows, rowCount };
  };

  getBrandsByCategory = async (baseUrl: string, category: string) => {
    const SQL =
      'SELECT b.uuid, b.name, concat($1::text, b.photo) as photo, concat($1::text, b.placeholder) as placeholder FROM public.brands b INNER JOIN public.products p ON b.id = p.brand_id INNER JOIN public.product_subcategory ps ON p.subcategory_id = ps.id INNER JOIN public.product_category pc ON ps.category_id = pc.id WHERE pc.slug = $2::text ORDER BY b.id;';
    const { rows, rowCount } = await query<IBRAND_RESPONSE>(SQL, [
      baseUrl,
      category,
    ]);
    return { rows, rowCount };
  };
}

export default new BrandService();
