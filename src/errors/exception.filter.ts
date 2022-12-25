import { NextFunction, Request, Response } from 'express';
import { IExceptionFilter } from './exception.filter.interface';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import 'reflect-metadata';

@injectable()
export class ExceptionFilter implements IExceptionFilter {
	/**
	 * inject() - это декоратор который принимает в себя индикатор того что нужно заинджектить,
	 * а это наш объект с символом который мы создали
	 * @param logger
	 */
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

	catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction): void {
		if (err instanceof HTTPError) {
			this.logger.error(`[${err.context}] Ошибка: ${err.statusCode} ${err.message}`);
			res.status(err.statusCode).send({ err: err.message });
		} else {
			this.logger.error(`${err.message}`);
			res.status(500).send({ err: err.message });
		}
	}
}

//здесь содержится информация из контроллера например 401- пользователь не авторизован
export class HTTPError extends Error {
	statusCode: number;
	message: string;
	context?: string;

	constructor(statusCode: number, message: string, context?: string) {
		super(message);
		this.statusCode = statusCode;
		this.message = message;
		this.context = context;
	}
}
