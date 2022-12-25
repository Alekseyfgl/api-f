import { IsMobilePhone } from 'class-validator';

export class EmailsRingDto {
	@IsMobilePhone()
	phone: string;
}