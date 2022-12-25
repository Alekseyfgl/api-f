import { IEmailsRepository } from './emails-interfaces/emails.repository.interface';
import { EmailsRingDto } from './dto/emails-ring.dto';
import { inject, injectable } from 'inversify';
import nodemailer, { SentMessageInfo, Transporter } from 'nodemailer';
import { TYPES } from '../../types';
import { IConfigService } from '../../config/config.service.interface';
import { ILogger } from '../../logger/logger.interface';
import { ringBack } from './messages/ring-back.message';
import { IRingBackMessage } from './emails-interfaces/messages.interface';
import { EmailReqCallDto } from './dto/emails-req-call.dto';
import { reqCall } from './messages/req-call.messages';

@injectable()
export class EmailsRepository implements IEmailsRepository {
	private readonly host: string;
	private readonly user: string;
	private readonly pass: string;

	constructor(@inject(TYPES.ConfigService) private configService: IConfigService, @inject(TYPES.ILogger) private loggerService: ILogger) {
		this.host = this.configService.get('HOST_GMAIL');
		this.user = this.configService.get('GMAIL');
		this.pass = this.configService.get('PASS_CODE');
	}

	async callBack(dto: EmailsRingDto): Promise<boolean> {
		const { phone } = dto;
		const host: string = this.host;
		const user: string = this.user;
		const pass: string = this.pass;

		const transporter: Transporter<SentMessageInfo> = nodemailer.createTransport({ host, auth: { user, pass } });

		try {
			const message: IRingBackMessage = ringBack(phone, user);

			await transporter.sendMail(message);
			return true;
		} catch (error) {
			this.loggerService.error(error);
			return false;
		}
	}

	async reqCall(dto: EmailReqCallDto): Promise<boolean> {
		const transporter: Transporter<SentMessageInfo> = nodemailer.createTransport({
			host: this.host,
			auth: { user: this.user, pass: this.pass },
		});

		try {
			const message: IRingBackMessage = reqCall(dto, this.user);
			await transporter.sendMail(message);
			return true;
		} catch (error) {
			this.loggerService.error(error);
			return false;
		}
	}
}