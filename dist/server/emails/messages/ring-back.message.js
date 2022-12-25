"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ringBack = void 0;
const ringBack = (phone, toUser) => {
    return {
        from: `${phone}`,
        to: toUser,
        subject: 'Вас просили перезвонить 📞',
        text: 'Запрос на звонок',
        html: `<a style="font-size: 22px; color: #010101; text-decoration: none" href="\`tel:${phone}\`">${phone}</a>`,
    };
};
exports.ringBack = ringBack;
