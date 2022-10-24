import Joi, { ObjectSchema } from 'joi';
import { IUSER_INPUT } from './interfaces';
import {
  USERNAME_FIELD,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  NUMBER_FIELD,
  NUMBER_MAX_LENGTH,
  NUMBER_MIN_LENGTH,
  PASSWORD_FIELD,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  FIRST_NAME_FIELD,
  FIRST_NAME_MAX_LENGTH,
  FIRST_NAME_MIN_LENGTH,
  LAST_NAME_FIELD,
  LAST_NAME_MAX_LENGTH,
  LAST_NAME_MIN_LENGTH,
  EMAIL_FIELD,
} from './constants';

const userSchema: ObjectSchema<IUSER_INPUT> = Joi.object({
  [USERNAME_FIELD]: Joi.string()
    .alphanum()
    .min(USERNAME_MIN_LENGTH)
    .max(USERNAME_MAX_LENGTH)
    .required()
    .messages({
      'string.base': `#${USERNAME_FIELD} should be of type string`,
      'string.alphanum': `#${USERNAME_FIELD} must only contain alpha-numeric characters`,
      'string.min': `#${USERNAME_FIELD} should have a minimum length of ${USERNAME_MIN_LENGTH}`,
      'string.max': `#${USERNAME_FIELD} should have a maximum length of ${USERNAME_MAX_LENGTH}`,
      'string.required': `#${USERNAME_FIELD} is a required field`,
    }),
  [EMAIL_FIELD]: Joi.string().email().required(),
  [NUMBER_FIELD]: Joi.string()
    .min(NUMBER_MIN_LENGTH)
    .max(NUMBER_MAX_LENGTH)
    .pattern(/^[7-9]{1}[0-9]{9}/)
    .messages({
      'string.base': `#${NUMBER_FIELD} should be of type string`,
      'string.min': `#${NUMBER_FIELD} should have a minimum length of ${NUMBER_MIN_LENGTH}`,
      'string.max': `#${NUMBER_FIELD} should have a maximum length of ${NUMBER_MAX_LENGTH}`,
      'string.pattern.base': `#${NUMBER_FIELD} should be a valid indian phone number`,
    }),
  [PASSWORD_FIELD]: Joi.string()
    .min(PASSWORD_MIN_LENGTH)
    .max(PASSWORD_MAX_LENGTH)
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required()
    .messages({
      'string.base': `#${PASSWORD_FIELD} should be of type string`,
      'string.min': `#${PASSWORD_FIELD} should have a minimum length of ${PASSWORD_MIN_LENGTH}`,
      'string.max': `#${PASSWORD_FIELD} should have a maximum length of ${PASSWORD_MAX_LENGTH}`,
      'string.pattern.base': `#${PASSWORD_FIELD} should have atleast 1 Upper letter, 1 lower Letter and a number`,
      'string.required': `#${PASSWORD_FIELD} is a required field`,
    }),
  confirmPassword: Joi.any()
    .equal(Joi.ref(PASSWORD_FIELD))
    .required()
    .messages({
      'any.only': `{{#label}} {{#value}} does not match with the password`,
      'any.required': `{{#label}} is a required field`,
    }),
  firstName: Joi.string()
    .alphanum()
    .min(FIRST_NAME_MIN_LENGTH)
    .max(FIRST_NAME_MAX_LENGTH)
    .required()
    .messages({
      'string.base': `#${FIRST_NAME_FIELD} should be of type string`,
      'string.min': `#${FIRST_NAME_FIELD} should have a minimum length of ${FIRST_NAME_MIN_LENGTH}`,
      'string.max': `#${FIRST_NAME_FIELD} should have a maximum length of ${FIRST_NAME_MAX_LENGTH}`,
      'any.required': `#${FIRST_NAME_FIELD} is a required field`,
      'string.empty': `#${FIRST_NAME_FIELD} is not allowed to be empty`,
    }),
  lastName: Joi.string()
    .alphanum()
    .min(LAST_NAME_MIN_LENGTH)
    .max(LAST_NAME_MAX_LENGTH)
    .required()
    .messages({
      'string.base': `#${LAST_NAME_FIELD} should be of type string`,
      'string.min': `#${LAST_NAME_FIELD} should have a minimum length of ${LAST_NAME_MIN_LENGTH}`,
      'string.max': `#${LAST_NAME_FIELD} should have a maximum length of ${LAST_NAME_MAX_LENGTH}`,
      'any.required': `#${LAST_NAME_FIELD} is a required field`,
      'string.empty': `#${LAST_NAME_FIELD} is not allowed to be empty`,
    }),
});

export default userSchema;
