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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailsRepository = void 0;
const inversify_1 = require("inversify");
const nodemailer_1 = __importDefault(require("nodemailer"));
const types_1 = require("../../types");
const ring_back_message_1 = require("./messages/ring-back.message");
const req_call_messages_1 = require("./messages/req-call.messages");
let EmailsRepository = class EmailsRepository {
    constructor(configService, loggerService) {
        this.configService = configService;
        this.loggerService = loggerService;
        this.host = this.configService.get('HOST_GMAIL');
        this.user = this.configService.get('GMAIL');
        this.pass = this.configService.get('PASS_CODE');
    }
    callBack(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { phone } = dto;
            const host = this.host;
            const user = this.user;
            const pass = this.pass;
            const transporter = nodemailer_1.default.createTransport({ host, auth: { user, pass } });
            try {
                const message = (0, ring_back_message_1.ringBack)(phone, user);
                yield transporter.sendMail(message);
                return true;
            }
            catch (error) {
                this.loggerService.error(error);
                return false;
            }
        });
    }
    reqCall(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const transporter = nodemailer_1.default.createTransport({
                host: this.host,
                auth: { user: this.user, pass: this.pass },
            });
            try {
                const message = (0, req_call_messages_1.reqCall)(dto, this.user);
                yield transporter.sendMail(message);
                return true;
            }
            catch (error) {
                this.loggerService.error(error);
                return false;
            }
        });
    }
};
EmailsRepository = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.TYPES.ConfigService)),
    __param(1, (0, inversify_1.inject)(types_1.TYPES.ILogger)),
    __metadata("design:paramtypes", [Object, Object])
], EmailsRepository);
exports.EmailsRepository = EmailsRepository;
