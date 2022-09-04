import { getVar } from '../../helpers';
import { PoolConfig } from 'pg';

export const POOL_CONFIG: PoolConfig = {
  database: getVar('POSTGRES_DB_NAME'),
  user: getVar('POSTGRES_USER'),
  password: getVar('POSTGRES_PASSWORD'),
  port: +getVar('PGPORT'),
  host: getVar('POSTGRES_DB_HOST'),
  max: +getVar('DB_POOL_SIZE'),
  idleTimeoutMillis: +getVar('DB_POOL_CLIENT_IDLE_TIMEOUT'),
  connectionTimeoutMillis: +getVar('DB_POOL_CLIENT_CONNECTION_TIMEOUT'),
};
