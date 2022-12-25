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
exports.EmailsController = void 0;
const base_controller_1 = require("../../common/base.controller");
const emails_ring_dto_1 = require("./dto/emails-ring.dto");
const inversify_1 = require("inversify");
const types_1 = require("../../types");
const validate_middleware_1 = require("../../common/validate.middleware");
const exception_filter_1 = require("../../errors/exception.filter");
const emails_req_call_dto_1 = require("./dto/emails-req-call.dto");
let EmailsController = class EmailsController extends base_controller_1.BaseController {
    constructor(loggerService, emailsService) {
        super(loggerService);
        this.loggerService = loggerService;
        this.emailsService = emailsService;
        this.bindRoutes([
            {
                path: '/ring',
                method: 'post',
                func: this.ring,
                middlewares: [new validate_middleware_1.ValidateMiddleware(emails_ring_dto_1.EmailsRingDto)],
            },
            {
                path: '/req-call',
                method: 'post',
                func: this.reqCall,
                middlewares: [new validate_middleware_1.ValidateMiddleware(emails_req_call_dto_1.EmailReqCallDto)],
            },
            {
                path: '/test',
                method: 'get',
                func: this.test,
            },
        ]);
    }
    ring(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const result = yield this.emailsService.ringBack(req.body);
            if (!result) {
                return next(new exception_filter_1.HTTPError(500, "failed"));
            }
            this.ok(res, { message: "successfully" });
        });
    }
    reqCall(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.emailsService.reqCall(req.body);
            if (!result) {
                return next(new exception_filter_1.HTTPError(500, "failed"));
            }
            this.ok(res, { message: "successfully" });
        });
    }
    test(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            this.ok(res, { message: "successfully" });
        });
    }
};
EmailsController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ILogger)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.EmailsService)),
    __metadata("design:paramtypes", [Object, Object])
], EmailsController);
exports.EmailsController = EmailsController;
