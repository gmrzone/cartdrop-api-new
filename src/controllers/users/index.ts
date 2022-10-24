import { Request, Response } from 'express';
import database from '../../config/db';
import userValidatorSchema from '../../validators/users';
import { generateErrorObject, generateValidationError } from '../../helpers';
import userService from '../../services/userService';
import { ROW_COUNT_HEADER_NAME } from '../../config/constants';
export const createUser = async (req: Request, res: Response) => {
  const userData = await userService.createUser(
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
  await userService.createUser(
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

export const signUp = async (req: Request, res: Response) => {
  try {
    const { error, value } = userValidatorSchema.validate(req.body, {
      stripUnknown: true,
    });
    if (error) {
      const errorObj = generateValidationError(error);
      return res.status(400).json(errorObj);
    }
    const { username, email, number, password, firstName, lastName } = value;
    const { rows, rowCount } = await userService.signUp(
      username,
      email,
      number,
      password,
      firstName,
      lastName,
    );
    res.setHeader(ROW_COUNT_HEADER_NAME, rowCount);
    return res.json({ rows });
  } catch (err) {
    const errorObj = generateErrorObject(err, 500);
    return res.json(errorObj);
  }
};
