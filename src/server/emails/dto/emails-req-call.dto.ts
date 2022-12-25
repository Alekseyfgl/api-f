import { IsEmail, IsMobilePhone, IsString } from 'class-validator';

export class EmailReqCallDto {
	@IsString()
	name: string;
	@IsMobilePhone()
	phone: string;
	@IsEmail()
	email: string;
}