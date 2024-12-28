import AuthService from '@service/auth/auth.service';
import { HttpResponse } from '@src/common/HttpResponse';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { joi } from '@src/helpers/joi-validate.helper';
import User from '@src/models/user.model';
import { validateRegisterRequest } from '@src/schema/auth/auth.schema';

class AuthController {
  public async register(params: User): Promise<HttpResponse> {
    const isValid = joi(validateRegisterRequest, params);
    if (!isValid) {
      return {
        status: HttpStatusCodes.BAD_REQUEST,
        message: 'Your data is not valid',
      };
    }
    const response = await AuthService.register(params);
    if (response.status) {
      const successResponse: HttpResponse = {
        status: HttpStatusCodes.CREATED,
        message: 'User registered successfully',
        response: response.response,
      };

      return successResponse;
    } else {
      const errorResponse: HttpResponse = {
        status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
        message: 'User registered failed',
        errors: [response.message],
      };

      return errorResponse;
    }
  }
}

export default new AuthController();
