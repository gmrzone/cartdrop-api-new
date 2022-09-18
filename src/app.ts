import express, { Application } from 'express';
import cors from 'cors'
import database from './config/db/index';
import { CORS_OPTIONS } from './config/constants'
import userRoutes from './routes/user'
import categoryRoute from './routes/category'
import rateLimit from 'express-rate-limit';

const app: Application = express();

// TODO : Remove express-rate-limit dependency and implement request rate limit middleware using redis
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
database.runMigrations();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(CORS_OPTIONS));
app.use(limiter);
app.use('/static', express.static('public'));
app.use('/api/users', userRoutes);
app.use('/api/category', categoryRoute);

export default app;
