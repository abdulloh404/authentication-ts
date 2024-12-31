import AuthService from '@service/auth/auth.service';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { IHttpResponse } from '@src/common/HttpResponse';
import { IUserRegister } from '@src/interfaces/user.interface';
import { joi } from '@src/helpers/joi-validate.helper';
import { validateRegisterRequest } from '@src/schema/auth/auth.schema';

class AuthController {
  public async register(
    _header: unknown,
    params: IUserRegister,
  ): Promise<IHttpResponse> {
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
        status: response.status,
        message: response.message,
        data: response.data,
      };
    } else {
      return {
        status: response.status,
        message: response.message,
        errors: [response.errors],
      };
    }
  }
}

export default new AuthController();
