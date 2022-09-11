import express, { Application } from 'express';
import cors from 'cors'
import database from './config/db/index';
import { CORS_OPTIONS } from './config/constants'
import userRoutes from './routes/user'
import categoryRoute from './routes/category'
const app: Application = express();

database.runMigrations();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(CORS_OPTIONS));
app.use('/static', express.static('public'));
app.use('/api/users', userRoutes);
app.use('/api/category', categoryRoute);

export default app;
