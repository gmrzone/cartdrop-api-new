import { Request, Response } from 'express';
import database from '../../config/db';
import userValidatorSchema from '../../validators/users';
import { generateErrorObject } from '../../helpers';
import userService from '../../services/userService';
import { ROW_COUNT_HEADER_NAME } from '../../config/constants';
import { ValidationError } from '../../helpers/errors';

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
  console.log({ body: req.body });
  try {
    const { error, value } = userValidatorSchema.validate(req.body, {
      stripUnknown: true,
    });
    if (error) {
      console.log(JSON.stringify(error, null, 2));
      const errorObj = generateErrorObject(
        new ValidationError('Validation Error', error),
      );
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
    const errorObj = generateErrorObject(err);
    res.status(errorObj.statusCode);
    return res.json(errorObj);
  }
};
