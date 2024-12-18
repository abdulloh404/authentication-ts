import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { HttpStatusCode } from 'axios';
import { Response } from 'express';
import { Schema } from 'joi';

export function validateRequest(schema: any, data: any): boolean {
  try {
    schema.validateSync(data, { abortEarly: false });
    return true;
  } catch (error) {
    console.error('Validation error:', error);
    return false;
  }
}

export const validateResponse = (
  schema: Schema,
  data: any,
  res: Response,
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
