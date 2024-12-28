import AuthService from '@service/auth/auth.service';
import { HttpResponse } from '@src/common/HttpResponse';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { joi } from '@src/helpers/joi-validate.helper';
import User from '@src/models/user.model';
import { validateRegisterRequest } from '@src/schema/auth/auth.schema';

class AuthController {
  public async register(params: User): Promise<HttpResponse> {
    const validationResult = joi(validateRegisterRequest, params); // ตรวจสอบ validation result

    console.log(validationResult); // Log เพื่อตรวจสอบ

    if (!validationResult.isValid) {
      return {
        status: HttpStatusCodes.BAD_REQUEST,
        message: 'Your data is not valid',
        errors: validationResult.errors, // ส่ง error กลับไปยัง client
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
