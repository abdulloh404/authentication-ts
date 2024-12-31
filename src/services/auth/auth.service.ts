import bcrypt from 'bcryptjs';
import User from '@src/models/user.model';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { IHttpResponse } from '@src/common/HttpResponse';
export class AuthService {
  public async register(params: User): Promise<IHttpResponse> {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        role = 'user',
        loginBy = 'regular',
      } = params;

      // eslint-disable-next-line no-console
      console.log('Register params:', params);

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return {
          status: HttpStatusCodes.CONFLICT,
          message: 'Email is already in use.',
          data: null,
          errors: null,
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        loginBy,
        isVerify: 0,
      });

      return {
        status: HttpStatusCodes.CREATED,
        message: 'User registered successfully.',
        data: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          loginBy: user.loginBy,
        },
        errors: null,
      };
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error('Register error:', error);
      return {
        status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
        message: 'User registration failed.',
        data: null,
        errors: [(error as Error).message],
      };
    }
  }
}

export default new AuthService();
