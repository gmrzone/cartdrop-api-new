import { IBRAND_RESPONSE } from './interface';
import { query } from '../../config/db';
interface IBRAND_SERVICES {
  getBrands: (
    baseUrl: string,
    pageSize: number,
    cursor: string | undefined,
  ) => Promise<{
    rows: IBRAND_RESPONSE[];
    rowCount: number;
    nextCursor: string | null;
    prevCursor: string | null;
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
  // TODO : Need to refactor pagination logic out of getBrands and create a
  // seperate PaginationService with cursor so we can reuse it everywhere
  getBrands = async (
    baseUrl: string,
    pageSize: number,
    cursor: string | undefined,
  ) => {
    const cursorField = 'id';
    const [position, reverse] = cursor ? cursor.split('r') : '0';
    const condition = `WHERE ${cursorField} ${
      reverse ? '<' : '>'
    } ${position} `;
    const ordering = `ORDER BY ${cursorField} ${reverse ? 'DESC' : 'ASC'}`;
    let SQL = `SELECT id, uuid, name, concat($1::text, photo) as photo, 
      concat($1::text, placeholder) as placeholder FROM 
      public.brands ${condition} ${ordering} LIMIT ${pageSize + 1}`;
    if (reverse) {
      SQL = `WITH reverse as (${SQL}) SELECT * FROM reverse ORDER BY ${cursorField} ASC;`;
    }
    const { rows, rowCount } = await query<IBRAND_RESPONSE>(SQL, [baseUrl]);

    const data =
      rowCount === pageSize + 1
        ? reverse
          ? rows.slice(1)
          : rows.slice(0, -1)
        : rows;
    //
    const nextCursor =
      rowCount === pageSize + 1 || reverse ? data[data.length - 1].id : null;
    // if cursor is there and not in reverse or if it is in reverse mode then row should be pageSize + 1
    const prevCursor =
      cursor && (!reverse || (reverse && rowCount === pageSize + 1))
        ? `${data[0].id}r1`
        : null;
    return { rows: data, rowCount, nextCursor, prevCursor };
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
