import { hash } from 'bcryptjs';

export class UserEntity {
	private _password: string;

	constructor(private readonly _email: string, private readonly _name: string) {}

	get email(): string {
		return this._email;
	}

	get name(): string {
		return this._name;
	}

	get password(): string {
		return this._password;
	}

	/**
	 * setter - не может быть асинхронным, поэтому делаем обычный метод
	 */
	public async setPassword(pass: string, salt: number): Promise<void> {
		this._password = await hash(pass, salt);
	}
}
