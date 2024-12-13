export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'your-secure-secret-key',
  expiresIn: '1h',
};
