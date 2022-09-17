import { query, executeQueryWithClient } from '../../config/db';
import { ICATEGORY, ICATEGORY_RESPONSE } from './interface';
import { CATEGORY_SERVICE_SQL } from './constant';
import { PoolClient, QueryResult } from 'pg';


class CategoryService  {

  getCategory = async () => {
    const { rows, rowCount } = await query<ICATEGORY>(CATEGORY_SERVICE_SQL.GET_CATEGORY(), [])
    return { rows, rowCount };
  };

  getCategoriesWithImages = async (baseUrl: string) => {
    const cb = async (client: PoolClient) => {
      const data :QueryResult<ICATEGORY_RESPONSE> = await client.query(CATEGORY_SERVICE_SQL.GET_CATEGORY_WITH_IMAGES(baseUrl))
      return data
    }
    const {rows, rowCount} = await executeQueryWithClient<ICATEGORY_RESPONSE>(cb)
    return {rows, rowCount}
  };
}

export default new CategoryService();
