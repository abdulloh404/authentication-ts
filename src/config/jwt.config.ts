export const jwtConfig = {
  // eslint-disable-next-line n/no-process-env
  secret: process.env['JWT_SECRET'],
  expiresIn: '1h',
};
