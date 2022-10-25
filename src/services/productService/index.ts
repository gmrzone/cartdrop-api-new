import { query } from '../../config/db';
import { IPRODUCT_RESPONSE } from './interfaces';

interface IPRODUCT_SERVICE {
  getFeaturedProducts: (
    baseImageUrl: string,
  ) => Promise<{ rows: IPRODUCT_RESPONSE[]; rowCount: number }>;
}

class ProductService implements IPRODUCT_SERVICE {
  getFeaturedProducts = async (baseImageUrl: string) => {
    const SQL = '';
    const { rows, rowCount } = await query<IPRODUCT_RESPONSE>(SQL, []);
    return { rows, rowCount };
  };
}
