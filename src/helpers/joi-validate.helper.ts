import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { HttpStatusCode } from 'axios';
import { Response } from 'express';
import { Schema } from 'joi';

export const validateRequest = (
  schema: Schema,
  data: any,
  res: Response,
): boolean => {
  const { error } = schema.validate(data, { abortEarly: false }); // ตั้งค่าให้รวบรวมข้อผิดพลาดทั้งหมด
  if (error) {
    const missingKeys = error.details.map(err => err.path.join('.'));

    res.status(HttpStatusCode.BadRequest).json({
      error: 'Validation Error',
      missingKeys, // ระบุ Keys ที่ขาดหายหรือไม่ถูกต้อง
    });
    return false; // Validation ไม่ผ่าน
  }

  return true; // Validation ผ่าน
};

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
