import AuthService from '@service/auth/auth.service';
import { joi } from '@src/helpers/joi-validate.helper';
import { validateRegisterRequest } from '@src/schema/auth/auth.schema';

class AuthController {
  async register(requestBody: any, requestData: any): Promise<any> {
    const isValid = joi(validateRegisterRequest, requestBody);
    if (!isValid) {
      console.error('Validation failed: Invalid requestBody');
      return {
        status: 500,
        message: 'User registered successfully',
      };
    }
    const response = await AuthService.registerUserService(requestBody);
    return {
      status: 201,
      message: 'User registered successfully',
      data: response,
    };
  }
}

export default new AuthController();
