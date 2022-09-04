import { getVar } from '../../helpers';
import { PoolConfig } from 'pg';
import { CorsOptions } from 'cors';

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

export const CORS_WHITE_LIST = ['http://127.0.0.1:3000/', 'http://localhost:3000/'];

export const CORS_OPTIONS: CorsOptions = {
  origin: (origin, callback) => {
    if (origin && CORS_WHITE_LIST.indexOf(origin) === -1) {
      return callback(new Error(`${origin} not allowed by CORS`));
    }
    callback(null, true);
  },
};
