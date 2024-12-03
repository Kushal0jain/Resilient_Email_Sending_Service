"use strict";
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
exports.EmailService = void 0;
const MockEmailProvider1_1 = require("./providers/MockEmailProvider1");
const MockEmailProvider2_1 = require("./providers/MockEmailProvider2");
const RateLimiter_1 = require("./utils/RateLimiter");
const CircuitBreaker_1 = require("./utils/CircuitBreaker");
const Logger_1 = require("./utils/Logger");
class EmailService {
    constructor() {
        this.provider1 = new MockEmailProvider1_1.MockEmailProvider1();
        this.provider2 = new MockEmailProvider2_1.MockEmailProvider2();
        this.rateLimiter = new RateLimiter_1.RateLimiter();
        this.circuitBreaker1 = new CircuitBreaker_1.CircuitBreaker();
        this.circuitBreaker2 = new CircuitBreaker_1.CircuitBreaker();
    }
    sendEmail(email, message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.rateLimiter.canSend()) {
                Logger_1.Logger.log('Rate limit exceeded');
                return 'Rate limit exceeded';
            }
            const provider = this.circuitBreaker1.isClosed()
                ? this.provider1
                : this.provider2;
            for (let attempt = 0; attempt < 3; attempt++) {
                try {
                    const success = provider.sendEmail(email, message);
                    if (success) {
                        Logger_1.Logger.log('Email sent successfully');
                        return 'Email sent successfully';
                    }
                    else {
                        throw new Error('Send failed');
                    }
                }
                catch (error) {
                    this.circuitBreaker1.recordFailure();
                    yield this.sleep(Math.pow(2, attempt) * 1000); // Exponential backoff
                }
            }
            Logger_1.Logger.log('Email failed after retries');
            return 'Failed to send email';
        });
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
exports.EmailService = EmailService;
// Temporary test to run the email service
(() => __awaiter(void 0, void 0, void 0, function* () {
    const emailService = new EmailService();
    const result = yield emailService.sendEmail('test@example.com', 'Hello, this is a test email!');
    console.log(result);
}))();
