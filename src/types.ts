/**
 * Делаем символы , т.к. они уникальны для всех компонент которые му будем связывать
 * Связь лучше через интерфейсы делать, поэтому ILogger
 */

export const TYPES = {
    Application: Symbol.for('Application'),
    ILogger: Symbol.for('ILogger'),
    UsersController: Symbol.for('UsersController'),
    UsersService: Symbol.for('UsersService'),
    ExceptionFilter: Symbol.for('ExceptionFilter'),
    ConfigService: Symbol.for('ConfigService'),
    EmailsController: Symbol.for('EmailsController'),
    EmailsService: Symbol.for('EmailsService'),
    EmailsRepository: Symbol.for('EmailsRepository'),
};
