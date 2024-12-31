/* eslint-disable no-console */
import { ObjectSchema } from 'joi';

export function joi(schema: ObjectSchema, data: any): any {
  try {
    const { error } = schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      const uniqueErrors = error.details.reduce(
        (acc, err) => {
          const exists = acc.find(e => e.key === err.context?.key);
          if (!exists) {
            acc.push({
              key: err.context?.key || 'unknown',
              message: err.message,
            });
          }
          return acc;
        },
        [] as { key: string; message: string }[],
      );

      return {
        isValid: false,
        errors: uniqueErrors,
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
