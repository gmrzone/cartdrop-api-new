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
    const { rows, rowCount } = await query<IBRAND_RESPONSE>('', [
      baseUrl,
      category,
    ]);
    return { rows, rowCount };
  };
}

export default new BrandService();
