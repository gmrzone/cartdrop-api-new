import express, { Application } from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import database from './config/db/index';
import { CORS_OPTIONS } from './config/constants';
import userRoutes from './routes/user';
import categoryRoute from './routes/categories';
import subcategoryRoutes from './routes/subcategories';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const swaggerDocument = YAML.load('./docs/cartdrop.yml');
const app: Application = express();

// TODO : Remove express-rate-limit dependency and implement request rate limit middleware using redis
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    status: 'error',
    message: 'Too many requests, please try again later.',
  },
  skipFailedRequests: true,
});
database.runMigrations();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(CORS_OPTIONS));
app.use(limiter);
app.use('/static', express.static('public'));
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoute);
app.use('/api/subcategories', subcategoryRoutes);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
