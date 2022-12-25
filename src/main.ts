import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './server/users/users.controller';
import { ExceptionFilter } from './errors/exception.filter';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { IBootstrapReturn } from './interfaces/main.interface';
import { IUsersService } from './server/users/users-interfaces/users.service.interface';
import { UsersService } from './server/users/users.service';
import { IUsersController } from './server/users/users-interfaces/users.controller.interface';
import { IConfigService } from './config/config.service.interface';
import { ConfigService } from './config/config.service';
import { EmailsController } from './server/emails/emails.controller';
import { IEmailsController } from './server/emails/emails-interfaces/emails.controller.interface';
import { IEmailsService } from './server/emails/emails-interfaces/emails.service.interface';
import { EmailsService } from './server/emails/emails.service';
import { IEmailsRepository } from './server/emails/emails-interfaces/emails.repository.interface';
import { EmailsRepository } from './server/emails/emails.repository';

/**
 * для интерфейса ILogger будет соответствовать LoggerService
 * TYPES.ILogger - символ связи чтобы инверсивай js мог по нему связать
 */
export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
	bind<App>(TYPES.Application).to(App);

	bind<IUsersController>(TYPES.UsersController).to(UsersController);
	bind<IUsersService>(TYPES.UsersService).to(UsersService);
	bind<IEmailsController>(TYPES.EmailsController).to(EmailsController);
	bind<IEmailsService>(TYPES.EmailsService).to(EmailsService);
	bind<IEmailsRepository>(TYPES.EmailsRepository).to(EmailsRepository);
});

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
