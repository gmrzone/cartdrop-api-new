import { Request, Response } from 'express';
import user from '../../services/userService';
import database from '../../config/db';

export const createUser = async (req: Request, res: Response) => {
  const userData = await user.createUser(
    'gmrzone',
    '27021992',
    '9220976696',
    'saiyedafzalgz@gmail.com',
    'customer',
    'Afzal',
    'Saiyed',
  );
  return res.json(userData);
};

export const getUsers = async (req: Request, res: Response) => {
  await user.createUser('gmrzone', '27021992', '9220976696', 'saiyedafzalgz@gmail.com', 'customer', 'Afzal', 'Saiyed');
  const pool = database.getQuery();
  const data = await pool.query('SELECT * FROM public.users ORDER BY id ASC');
  console.log(process.env['POSTGRES_USER'], 'postgres user');
  console.log(process.env['POSTGRES_PASSWORD'], 'postgres_password');
  console.log(process.env['POSTGRES_DB_NAME'], 'Database name');
  console.log(process.env['POSTGRES_DB_HOST'], 'database host');
  console.log(process.env.NODE_ENV, 'Node environment');
  return res.status(200).json({ status: 'ok', data: data.rows });
};
