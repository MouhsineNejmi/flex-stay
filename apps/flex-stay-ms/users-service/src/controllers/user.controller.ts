import { Request, Response, NextFunction } from 'express';
import { GetUserInput } from '@flex-stay/shared-types';

import { UserService } from '../services/user.service';

export class UserController {
  private service: UserService;

  constructor(service: UserService) {
    this.service = service;
  }

  async getUser(
    req: Request<object, object, GetUserInput>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const body = <GetUserInput>req.body;
      const user = await this.service.findUser(body);

      return res.status(200).json({
        status: 'success',
        data: { user },
      });
    } catch (error) {
      next(error);
    }
  }
}
