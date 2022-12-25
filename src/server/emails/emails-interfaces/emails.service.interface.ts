import { EmailsRingDto } from '../dto/emails-ring.dto';
import { EmailReqCallDto } from '../dto/emails-req-call.dto';

export interface IEmailsService {
	ringBack: (dto: EmailsRingDto) => Promise<boolean>;
	reqCall: (dto: EmailReqCallDto) => Promise<boolean>;
}