import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { joi } from '@src/helpers/joi-validate.helper';
import { loginUser } from './../../services/auth/auth.service';
import { Request, Response } from 'express';
import {
  validateLogin,
  validateRegisterRequest,
  validateTokenResponse,
} from '@src/schema/auth/auth.schema';

class AuthController {
  async register(payload: any, dataRequest: any): Promise<any> {
    const isValid = joi(validateRegisterRequest, dataRequest);
    if (!isValid) {
      console.log('Validation failed: Invalid dataRequest');
      return;
    }
    // console.log(dataRequest);
    console.log(payload);
    // const response = await AuthResolver.register(payload, dataRequest);
    const response = {
      success: true,
      status: 201,
      data: payload,
    };

    return response;
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { error: requestError } = validateLogin(req.body);
      if (requestError) {
        res
          .status(HttpStatusCodes.OK)
          .json({
            error:
              requestError?.details && requestError.details.length > 0
                ? requestError.details[0]?.message
                : 'Invalid request',
          });
        return;
      }

      const { username, password } = req.body;
      const token = await loginUser(username, password);

      const { error: responseError } = validateTokenResponse({ token });
      if (responseError) {
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      res.status(200).json({ token });
    } catch (error) {
      res.status(400).json({
        error:
          error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  }
}

export default new AuthController();
