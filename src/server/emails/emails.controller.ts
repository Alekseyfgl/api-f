import { BaseController } from '../../common/base.controller';
import { IEmailsController } from './emails-interfaces/emails.controller.interface';
import { NextFunction, Request, Response } from 'express';
import { EmailsRingDto } from './dto/emails-ring.dto';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { ILogger } from '../../logger/logger.interface';
import { IEmailsService } from './emails-interfaces/emails.service.interface';
import { ValidateMiddleware } from '../../common/validate.middleware';
import { MESSAGE_RESPONSE } from '../../common/constans/message.constans';
import { HTTPError } from '../../errors/exception.filter';
import { EmailReqCallDto } from './dto/emails-req-call.dto';

@injectable()
export class EmailsController extends BaseController implements IEmailsController {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger, @inject(TYPES.EmailsService) private emailsService: IEmailsService) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/ring',
				method: 'post',
				func: this.ring,
				middlewares: [new ValidateMiddleware(EmailsRingDto)],
			},
			{
				path: '/req-call',
				method: 'post',
				func: this.reqCall,
				middlewares: [new ValidateMiddleware(EmailReqCallDto)],
			},
		]);
	}

	async ring(req: Request<{}, {}, EmailsRingDto>, res: Response, next: NextFunction): Promise<void> {
		console.log(req.body);
		const result: boolean = await this.emailsService.ringBack(req.body);
		if (!result) {
			return next(new HTTPError(500, MESSAGE_RESPONSE.FAILED));
		}
		this.ok(res, { message: MESSAGE_RESPONSE.SUCCESSFULLY });
	}

	async reqCall(req: Request<{}, {}, EmailReqCallDto>, res: Response, next: NextFunction): Promise<void> {
		const result: boolean = await this.emailsService.reqCall(req.body);
		if (!result) {
			return next(new HTTPError(500, MESSAGE_RESPONSE.FAILED));
		}
		this.ok(res, { message: MESSAGE_RESPONSE.SUCCESSFULLY });
	}
}
