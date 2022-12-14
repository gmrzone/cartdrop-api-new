import bcrypt from 'bcryptjs';
import { IDATABASE, query } from '../../config/db/index';
import database from '../../config/db/index';

interface IUser {
  _db: IDATABASE;
  hashPassword: (
    password: string,
    saltRound: number,
  ) => Promise<string | undefined>;
}
class User implements IUser {
  _db: IDATABASE;

  constructor(db: IDATABASE) {
    this._db = db;
  }
  hashPassword = async (password: string, saltRound = 10) => {
    const hash = await bcrypt.hash(password, saltRound);
    return hash;
  };
  createUser = async (
    username: string,
    password: string,
    number: string,
    email: string,
    type: string,
    firstName: string,
    lastName: string,
    photoUrl = 'static/default_profilepic.png',
    isActive = true,
    isSuperuser = false,
    isStaff = false,
    isEmailVerified = false,
    isNumberVerified = false,
    isDisabled = false,
  ) => {
    try {
      const passwordHash = await this.hashPassword(password);
      const pool = this._db.getQuery();
      const currentDateTime = new Date().toISOString();
      const SQL = `INSERT INTO public.users 
                    (username, number, email, type, password, first_name, last_name, photo, 
                    last_login, date_joined, is_active, is_superuser, is_staff, is_email_verified, 
                    is_number_verified, is_disabled) VALUES 
                    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16);`;
      const SQL_PARAMS = [
        username,
        number,
        email,
        type,
        passwordHash,
        firstName,
        lastName,
        photoUrl,
        currentDateTime,
        currentDateTime,
        isActive,
        isSuperuser,
        isStaff,
        isEmailVerified,
        isNumberVerified,
        isDisabled,
      ];
      await pool.query(SQL, SQL_PARAMS);
    } catch (err) {
      console.log(err);
    }
  };

  signUp = async (
    username: string,
    email: string,
    number: string,
    password: string,
    firstName: string,
    lastName: string,
    type = 'buyer',
    photoUrl = 'static/default_profilepic.png',
    isSuperUser = false,
    isStaff = false,
  ) => {
    const hashedPassword = await this.hashPassword(password);
    const SQL = `INSERT INTO public.users 
    (username, number, email, type, password, first_name, last_name, photo, 
    last_login, date_joined, is_active, is_superuser, is_staff, is_email_verified, 
    is_number_verified, is_disabled) VALUES 
    ($1, $2, $3, $4, $5, $6, $7, $8, current_timestamp, current_timestamp, $9, $10, $11, $12, $13, $14);`;
    const { rows, rowCount } = await query(SQL, [
      username,
      number,
      email,
      type,
      hashedPassword,
      firstName,
      lastName,
      photoUrl,
      false,
      isSuperUser,
      isStaff,
      false,
      false,
      true,
    ]);
    return { rows, rowCount };
  };
}

export default new User(database);
