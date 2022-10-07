import { getVar } from '../../helpers';
import { PoolConfig } from 'pg';
import { CorsOptions } from 'cors';
import { rateLimiterHandler } from '../../helpers';

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

export const CORS_WHITE_LIST = [
  'http://127.0.0.1:3000/',
  'http://localhost:4000/',
];

export const CORS_OPTIONS: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || CORS_WHITE_LIST.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    callback(new Error(`Origin ${origin} not allowed by cors`));
  },
};

export const ROW_COUNT_HEADER_NAME = 'x-row-count';

export const rateLimitOptions = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    status: 'error',
  },
  handler: rateLimiterHandler,
  skipFailedRequests: true,
};
