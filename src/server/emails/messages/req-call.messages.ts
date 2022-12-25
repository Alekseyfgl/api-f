import { IRingBackMessage } from '../emails-interfaces/messages.interface';
import { EmailReqCallDto } from '../dto/emails-req-call.dto';

export const reqCall = (dto: EmailReqCallDto, toUser: string): IRingBackMessage => {
	const { name, phone, email } = dto;
	return {
		from: `${email}`, // sender address
		to: toUser, // list of receivers
		subject: 'Вас просили перезвонить 📞', // Subject line
		text: 'Запрос на звонок', // plain text body
		html: `
					<h1>${name} просил вас перезвонить ему</h1>
					<h2>${email}</h2>
					<a style="font-size: 22px; color: #010101; text-decoration: none" href="\`tel:${phone}\`">${phone}</a>
					`,
	};
};