import Joi from 'joi';

// Validate request schemas
export const validateRegisterRequest = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string().email().required(),
  lastName: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({ 'any.only': 'Passwords do not match' }),
});

export const validateLogin = (data: any) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

export const validateVerify = (data: any) => {
  const schema = Joi.object({
    token: Joi.string().required(),
  });
  return schema.validate(data);
};

export const validateResetPasswordRequest = (data: any) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  return schema.validate(data);
};

export const validateResetPassword = (data: any) => {
  const schema = Joi.object({
    token: Joi.string().required(),
    newPassword: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

// Validate response schemas
export const validateUserResponse = (data: any) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    isVerified: Joi.boolean().required(),
    createdAt: Joi.date().required(),
    updatedAt: Joi.date().required(),
  });
  return schema.validate(data);
};

export const validateTokenResponse = (data: any) => {
  const schema = Joi.object({
    token: Joi.string().required(),
  });
  return schema.validate(data);
};
