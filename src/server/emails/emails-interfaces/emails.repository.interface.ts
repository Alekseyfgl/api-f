import { EmailsRingDto } from '../dto/emails-ring.dto';
import { EmailReqCallDto } from '../dto/emails-req-call.dto';

export interface IEmailsRepository {
	callBack: (dto: EmailsRingDto) => Promise<boolean>;
	reqCall: (dto: EmailReqCallDto) => Promise<boolean>;
}