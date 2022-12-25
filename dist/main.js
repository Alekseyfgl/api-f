"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.appContainer = exports.app = exports.appBindings = void 0;
const inversify_1 = require("inversify");
const app_1 = require("./app");
const logger_service_1 = require("./logger/logger.service");
const users_controller_1 = require("./server/users/users.controller");
const exception_filter_1 = require("./errors/exception.filter");
const types_1 = require("./types");
const users_service_1 = require("./server/users/users.service");
const config_service_1 = require("./config/config.service");
const emails_controller_1 = require("./server/emails/emails.controller");
const emails_service_1 = require("./server/emails/emails.service");
const emails_repository_1 = require("./server/emails/emails.repository");
exports.appBindings = new inversify_1.ContainerModule((bind) => {
    bind(types_1.TYPES.ILogger).to(logger_service_1.LoggerService).inSingletonScope();
    bind(types_1.TYPES.ConfigService).to(config_service_1.ConfigService).inSingletonScope();
    bind(types_1.TYPES.ExceptionFilter).to(exception_filter_1.ExceptionFilter);
    bind(types_1.TYPES.Application).to(app_1.App);
    bind(types_1.TYPES.UsersController).to(users_controller_1.UsersController);
    bind(types_1.TYPES.UsersService).to(users_service_1.UsersService);
    bind(types_1.TYPES.EmailsController).to(emails_controller_1.EmailsController);
    bind(types_1.TYPES.EmailsService).to(emails_service_1.EmailsService);
    bind(types_1.TYPES.EmailsRepository).to(emails_repository_1.EmailsRepository);
});
function bootstrap() {
    const appContainer = new inversify_1.Container();
    appContainer.load(exports.appBindings);
    const app = appContainer.get(types_1.TYPES.Application);
    app.init();
    return { appContainer, app };
}
_a = bootstrap(), exports.app = _a.app, exports.appContainer = _a.appContainer;
