import { HttpStatusCode } from 'axios';
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
      .status(HttpStatusCode.BadRequest)
      .json({ error: error.details[0].message });
    return false;
  }

  return true;
};
