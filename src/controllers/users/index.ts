import { Request, Response } from 'express';
import user from '../../services/userService';
import database from '../../config/db';
import userValidatorSchema from '../../validators/users';
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
  await user.createUser(
    'gmrzone',
    '27021992',
    '9220976696',
    'saiyedafzalgz@gmail.com',
    'customer',
    'Afzal',
    'Saiyed',
  );
  const pool = database.getQuery();
  const data = await pool.query('SELECT * FROM public.users ORDER BY id ASC');
  return res.status(200).json({ status: 'ok', data: data.rows });
};

export const signUp = (req: Request, res: Response) => {
  const { error, value } = userValidatorSchema.validate(req.body);
  if (error) {
    return res.status(400).json(error);
  }
  return res.json(value);
};
