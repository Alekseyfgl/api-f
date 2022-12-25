import { IsEmail, IsMobilePhone, IsString, Length } from 'class-validator';

export class EmailReqCallDto {
	@IsString()
	name: string;
	@IsMobilePhone()
	phone: string;
	@Length(5)
	email: string;
}