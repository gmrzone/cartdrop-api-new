import path from 'path';
import { Pool, PoolClient, PoolConfig } from 'pg';
import { migrate } from 'postgres-migrations';
import { POOL_CONFIG } from './constants';
export interface IDATABASE {
  _pool: Pool;
  runMigrations: () => Promise<void>;
  getPoolClient: () => Promise<PoolClient>;
  getQuery: () => Pool;
}
export class Database implements IDATABASE {
  _pool: Pool;
  constructor(config: PoolConfig) {
    this._pool = new Pool(config);
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

export default new Database(POOL_CONFIG);
