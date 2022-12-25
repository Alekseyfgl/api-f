"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reqCall = void 0;
const reqCall = (dto, toUser) => {
    const { name, phone, email } = dto;
    return {
        from: `${email}`,
        to: toUser,
        subject: 'Вас просили перезвонить 📞',
        text: 'Запрос на звонок',
        html: `
					<h1>${name} просил вас перезвонить ему</h1>
					<h2>${email}</h2>
					<a style="font-size: 22px; color: #010101; text-decoration: none" href="\`tel:${phone}\`">${phone}</a>
					`,
    };
};
exports.reqCall = reqCall;
