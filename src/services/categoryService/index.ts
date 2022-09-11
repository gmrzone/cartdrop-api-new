import database, { IDATABASE } from '../../config/db';
import { QueryResult } from 'pg';
import { ICATEGORY, ICATEGORY_RESPONSE } from './interface';
import { CATEGORY_SERVICE_SQL } from './constant';

interface ICategory {
  _db: IDATABASE;
}

class CategoryService implements ICategory {
  _db: IDATABASE;

  constructor(db: IDATABASE) {
    this._db = db;
  }

  getCategory = async () => {
    const pool = this._db.getQuery();
    const categorydata: QueryResult<ICATEGORY> = await pool.query(CATEGORY_SERVICE_SQL.GET_CATEGORY());
    return categorydata;
  };

  getCategoryWithImages = async (baseUrl: string) => {
    const client = await this._db.getPoolClient();
    try {
      const { rows, rowCount }: QueryResult<ICATEGORY_RESPONSE> = await client.query(
        CATEGORY_SERVICE_SQL.GET_CATEGORY_WITH_IMAGES(baseUrl),
      );
      return {rows, rowCount};
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      client.release();
    }
  };
}

export default new CategoryService(database);
