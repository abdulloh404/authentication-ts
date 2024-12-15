import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { Response } from 'express';
import { Schema } from 'joi';

export const validateRequest = (
  schema: Schema,
  data: any,
  res: Response
): boolean => {
  const { error } = schema.validate(data);

  if (error) {
    res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ error: error.details[0].message });
    return false;
  }

  return true;
};

export const validateResponse = (
  schema: Schema,
  data: any,
  res: Response
): boolean => {
  const { error } = schema.validate(data);

  if (error) {
    res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ error: error.details[0].message });
    return false;
  }

  return true;
};
