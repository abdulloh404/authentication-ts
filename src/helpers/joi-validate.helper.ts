import { ObjectSchema } from 'joi';

export function joi(schema: ObjectSchema, data: any): any {
  try {
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      const errors = error.details.map(detail => ({
        key: detail.path.join('.'), // ระบุ path หรือ key ของฟิลด์ที่ผิด
        message: detail.message, // ข้อความแสดงข้อผิดพลาด
      }));
      return { isValid: false, errors };
    }
    return { isValid: true, errors: [] };
  } catch (err) {
    console.error('Unexpected validation error:', err);
    return {
      isValid: false,
      errors: [{ key: 'unknown', message: 'Unexpected validation error' }],
    };
  }
}
