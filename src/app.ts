import express, { Application } from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import database from './config/db/index';
import { CORS_OPTIONS, RATE_LIMIT_OPTIONS } from './config/constants';
import userRoutes from './routes/user';
import categoryRoutes from './routes/categories';
import brandRoutes from './routes/brands';
import subcategoryRoutes from './routes/subcategories';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const swaggerDocument = YAML.load('./docs/cartdrop.yml');
const app: Application = express();

// TODO : Remove express-rate-limit dependency and implement request rate limit middleware using redis
const limiter = rateLimit(RATE_LIMIT_OPTIONS);
database.runMigrations();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(CORS_OPTIONS));
app.use(limiter);
app.use('/static', express.static('public'));
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subcategoryRoutes);
app.use('/api/brands', brandRoutes);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
