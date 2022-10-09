import { IBRAND_RESPONSE } from './interface';
import { query } from '../../config/db';
interface IBRAND_SERVICES {
  getBrands: (
    baseUrl: string,
    pageSize: number,
    cursor: number,
  ) => Promise<{
    rows: IBRAND_RESPONSE[];
    rowCount: number;
    nextCursor: string | null;
  }>;
  getBrandsByCategory: (
    baseUrl: string,
    category: string,
  ) => Promise<{
    rows: IBRAND_RESPONSE[];
    rowCount: number;
  }>;
}

class BrandService implements IBRAND_SERVICES {
  getBrands = async (baseUrl: string, pageSize: number, cursor: number) => {
    const cursorField = 'id';
    const SQL = `SELECT id, uuid, name, concat($1::text, photo) as photo, 
      concat($1::text, placeholder) as placeholder FROM 
      public.brands WHERE ${cursorField} >= ${cursor} ORDER BY ${cursorField} ASC LIMIT ${
      pageSize + 1
    }`;

    const { rows, rowCount } = await query<IBRAND_RESPONSE>(SQL, [baseUrl]);

    const data = rowCount === pageSize + 1 ? rows.slice(0, -1) : rows;
    const nextCursor =
      rowCount === pageSize + 1 ? rows[rows.length - 1].id : null;
    return { rows: data, rowCount, nextCursor };
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
