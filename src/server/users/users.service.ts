import { IUsersService } from './users-interfaces/users.service.interface';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserEntity } from './user.entity';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { IConfigService } from '../../config/config.service.interface';

@injectable()
export class UsersService implements IUsersService {
	constructor(@inject(TYPES.ConfigService) private configService: IConfigService) {}

	async createUser({ name, email, password }: UserRegisterDto): Promise<UserEntity | null> {
		const newUser: UserEntity = new UserEntity(name, email);

		const salt: string = this.configService.get('SALT');

		await newUser.setPassword(password, +salt);
		/**
		 * 1 -создали нового пользователя
		 * 2 - проверка что он есть, то возвращает его, если его нет возвращаем null
		 */

		return null;
	}

	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return true;
	}
}