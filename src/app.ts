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
import { rateLimitOptions } from './config/constants';

const swaggerDocument = YAML.load('./docs/cartdrop.yml');
const app: Application = express();

// TODO : Remove express-rate-limit dependency and implement request rate limit middleware using redis
const limiter = rateLimit(rateLimitOptions);
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
