import { query, executeQueryWithClient } from '../../config/db';
import { ICATEGORY, ICATEGORY_RESPONSE } from './interface';
import { CATEGORY_SERVICE_SQL } from './constant';
import { PoolClient, QueryResult } from 'pg';

interface ICATEGORY_SERVICE {
  getCategories: () => Promise<{
    rows: ICATEGORY[];
    rowCount: number;
  }>;

  getCategoriesWithImages: (baseUrl: string) => Promise<{
    rows: ICATEGORY_RESPONSE[];
    rowCount: number;
  }>;
}

class CategoryService implements ICATEGORY_SERVICE {
  getCategories = async () => {
    const { rows, rowCount } = await query<ICATEGORY>(
      CATEGORY_SERVICE_SQL.GET_CATEGORIES,
      [],
    );
    return { rows, rowCount };
  };

  getCategoriesWithImages = async (baseUrl: string) => {
    const cb = async (client: PoolClient) => {
      const data: QueryResult<ICATEGORY_RESPONSE> = await client.query(
        CATEGORY_SERVICE_SQL.GET_CATEGORIES_WITH_IMAGES,
        [baseUrl],
      );
      return data;
    };
    const { rows, rowCount } = await executeQueryWithClient<ICATEGORY_RESPONSE>(
      cb,
    );
    return { rows, rowCount };
  };
}

export default new CategoryService();
