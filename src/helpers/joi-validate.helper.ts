/* eslint-disable no-console */
import { ObjectSchema } from 'joi';

export function joi(schema: ObjectSchema, data: any): any {
  try {
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      const missingKeys = Object.keys(schema.describe()['keys']).filter(
        key => !(key in data),
      );

      return {
        isValid: false,
        errors: [
          ...missingKeys.map(key => ({
            key,
            message: `"${key}" is required`,
          })),
          ...error.details.map(err => ({
            key: err.context?.key,
            message: err.message,
          })),
        ],
      };
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
