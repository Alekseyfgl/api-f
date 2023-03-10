"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const base_controller_1 = require("../common/base.controller");
const inversify_1 = require("inversify");
const types_1 = require("../types");
require("reflect-metadata");
const user_register_dto_1 = require("./dto/user-register.dto");
const users_service_1 = require("./users.service");
const exception_filter_1 = require("../errors/exception.filter");
const validate_middleware_1 = require("../common/validate.middleware");
let UsersController = class UsersController extends base_controller_1.BaseController {
    constructor(loggerService, usersService) {
        super(loggerService);
        this.loggerService = loggerService;
        this.usersService = usersService;
        this.bindRoutes([
            {
                path: '/register',
                method: 'post',
                func: this.register,
                middlewares: [new validate_middleware_1.ValidateMiddleware(user_register_dto_1.UserRegisterDto)],
            },
            { path: '/login', method: 'post', func: this.login },
        ]);
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            this.ok(res, 'login');
        });
    }
    register({ body }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.usersService.createUser(body);
            result ? this.ok(res, 'login') : next(new exception_filter_1.HTTPError(422, 'This user already exists'));
        });
    }
};
UsersController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ILogger)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.UsersService)),
    __metadata("design:paramtypes", [Object, users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
