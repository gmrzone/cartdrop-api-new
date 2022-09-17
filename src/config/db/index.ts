import path from 'path';
import { Pool, PoolClient } from 'pg';
import { migrate } from 'postgres-migrations';
import { POOL_CONFIG } from '../constants';
import { pgPoolFactory } from '../helpers/getPool';

const poolInstance = pgPoolFactory.getInstance(POOL_CONFIG);

export interface IDATABASE {
  _pool: Pool;
  runMigrations: () => Promise<void>;
  getPoolClient: () => Promise<PoolClient>;
  getQuery: () => Pool;
}
export class Database implements IDATABASE {
  _pool: Pool;
  constructor() {
    this._pool = poolInstance;
  }

  runMigrations = async (): Promise<void> => {
    const client = await this._pool.connect();
    try {
      await migrate({ client }, path.resolve(__dirname, 'migrations/files'));
    } catch (e) {
      console.log('Migration Failed with err', e);
    } finally {
      client.release();
    }
  };

  getPoolClient = async (): Promise<PoolClient> => {
    const client = await this._pool.connect();
    return client;
  };

  getQuery = () => {
    return this._pool;
  };
}

export async function query(sql: string, params: (string | number)[]) {
  return await poolInstance.query(sql, params);
}

export async function executeQueryWithClient(
  callback: (client: PoolClient) => object,
) {
  const client = await poolInstance.connect();
  return callback(client);
}

export default new Database();
