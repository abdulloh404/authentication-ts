import bcrypt from 'bcryptjs';
import User from '@src/models/user.model';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { IHttpResponse } from '@src/common/HttpResponse';
export class AuthService {
  public async register(params: User): Promise<IHttpResponse> {
    try {
      // Destructure and set default values
      const {
        firstName,
        lastName,
        email,
        password,
        role = 'user',
        loginBy = 'regular',
      } = params;

      console.log('Register params:', params);

      // Check if the email already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return {
          status: HttpStatusCodes.CONFLICT,
          message: 'Email is already in use.',
          data: null,
          errors: null,
        };
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user
      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        loginBy,
        isVerify: 0,
      });

      // Return success response
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
      console.error('Register error:', error);

      // Return error response
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
