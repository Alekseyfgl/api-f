import { BaseController } from '../../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { ILogger } from '../../logger/logger.interface';
import 'reflect-metadata';
import { IUsersController } from './users-interfaces/users.controller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { UsersService } from './users.service';
import { HTTPError } from '../../errors/exception.filter';
import { ValidateMiddleware } from '../../common/validate.middleware';
import { UserEntity } from './user.entity';

@injectable()
export class UsersController extends BaseController implements IUsersController {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger, @inject(TYPES.UsersService) private usersService: UsersService) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{ path: '/login', method: 'post', func: this.login },
		]);
	}

	async login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): Promise<void> {
		this.ok(res, 'login');
	}

	async register({ body }: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction) {
		const result: UserEntity | null = await this.usersService.createUser(body);

		result ? this.ok(res, 'login') : next(new HTTPError(422, 'This user already exists'));
	}
}
