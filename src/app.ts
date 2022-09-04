import express, { Application, Request, Response } from 'express';
import cors from 'cors'
import database from './config/db/index';
import user from './services/userService';
import { CORS_OPTIONS } from './config/constants'
import userRoutes from './routes/user'
const app: Application = express();
const PORT = process.env['SERVER_PORT'];


database.runMigrations();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(CORS_OPTIONS))
app.use('/static', express.static('public'));
app.use('/api/users', userRoutes)

app.listen(PORT, () => console.log(`Application is running on port ${PORT}`));
