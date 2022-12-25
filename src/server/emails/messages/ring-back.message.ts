import { IRingBackMessage } from '../emails-interfaces/messages.interface';

export const ringBack = (phone: string, toUser: string): IRingBackMessage => {
	return {
		from: `${phone}`, // sender address
		to: toUser, // list of receivers
		subject: 'Вас просили перезвонить 📞', // Subject line
		text: 'Запрос на звонок', // plain text body
		html: `<a style="font-size: 22px; color: #010101; text-decoration: none" href="\`tel:${phone}\`">${phone}</a>`,
	};
};