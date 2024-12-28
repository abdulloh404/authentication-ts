import { ObjectSchema } from 'joi';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function joi(schema: ObjectSchema, data: any): any {
  try {
    const { error } = schema.validate(data);
    if (error) {
      return {
        isValid: false,
        errors: error.details.map(err => ({
          key: err.context?.key,
          message: err.message,
        })),
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
