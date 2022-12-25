import { NextFunction, Request, Response } from 'express';

export interface IEmailsController {
	ring: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	reqCall: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}