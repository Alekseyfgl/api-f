import { IEmailsService } from './emails-interfaces/emails.service.interface';
import { EmailsRingDto } from './dto/emails-ring.dto';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { IEmailsRepository } from './emails-interfaces/emails.repository.interface';
import { EmailReqCallDto } from './dto/emails-req-call.dto';

@injectable()
export class EmailsService implements IEmailsService {
	constructor(@inject(TYPES.EmailsRepository) private readonly emailsRepository: IEmailsRepository) {
	}

	async ringBack(dto: EmailsRingDto): Promise<boolean> {
		return this.emailsRepository.callBack(dto);
	}

	async reqCall(dto: EmailReqCallDto): Promise<boolean> {
		return this.emailsRepository.reqCall(dto)
	}
}