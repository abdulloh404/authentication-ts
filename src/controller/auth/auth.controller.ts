import AuthService from '@service/auth/auth.service';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import User from '@src/models/user.model';
import { IHttpResponse } from '@src/common/HttpResponse';
import { joi } from '@src/helpers/joi-validate.helper';
import { validateRegisterRequest } from '@src/schema/auth/auth.schema';

class AuthController {
  public async register(params: User): Promise<IHttpResponse> {
    const result = joi(validateRegisterRequest, params);
    if (!result.isValid) {
      return {
        status: HttpStatusCodes.BAD_REQUEST,
        message: 'Your data is not valid',
        errors: result.errors,
      };
    }

    const response = await AuthService.register(params);

    if (response.status) {
      return {
        status: HttpStatusCodes.CREATED,
        message: 'User registered successfully',
        response: response.response,
      };
    } else {
      return {
        status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
        message: 'User registration failed',
        errors: [response.message],
      };
    }
  }
}

export default new AuthController();
