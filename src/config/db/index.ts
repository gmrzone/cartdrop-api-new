import path from 'path';
import { Pool, PoolClient, QueryResult, QueryResultRow } from 'pg';
import { migrate } from 'postgres-migrations';
import { POOL_CONFIG } from '../constants';
import { pgPoolFactory } from '../helpers/getPool';

const poolInstance = pgPoolFactory.getInstance(POOL_CONFIG);
// TODO: Database Class Will be deprecated soon
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
      console.log('\x1b[32m%s\x1b[0m', 'Data Migration Completed');
    } catch (e) {
      console.log('\x1b[31m%s\x1b[0m', 'Migration Failed with err', e);
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

export async function query<T extends QueryResultRow>(
  sql: string,
  params: (string | number | boolean)[],
): Promise<QueryResult<T>> {
  return await poolInstance.query(sql, params);
}

export async function executeQueryWithClient<T extends QueryResultRow>(
  callback: (client: PoolClient) => Promise<QueryResult<T>>,
): Promise<QueryResult<T>> {
  const client = await poolInstance.connect();
  try {
    const data = await callback(client);
    client.release();
    return data;
  } catch (err) {
    client.release();
    throw err;
  }
}

export async function runMigrations(): Promise<void> {
  const client = await poolInstance.connect();
  try {
    await migrate({ client }, path.resolve(__dirname, 'migrations/files'));
    console.log('\x1b[32m%s\x1b[0m', 'Data Migration Completed');
  } catch (err) {
    console.log(
      '\x1b[31m%s\x1b[0m',
      'Migration Failed with err',
      JSON.stringify(err, null, 2),
    );
  } finally {
    client.release();
  }
}

export default new Database();
