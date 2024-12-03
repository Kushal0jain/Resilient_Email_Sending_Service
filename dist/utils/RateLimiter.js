"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimiter = void 0;
class RateLimiter {
    constructor() {
        this.requests = 0;
        this.maxRequests = 5;
        this.interval = 60000; // 1 minute
        this.lastReset = Date.now();
    }
    canSend() {
        const now = Date.now();
        if (now - this.lastReset > this.interval) {
            this.requests = 0;
            this.lastReset = now;
        }
        if (this.requests < this.maxRequests) {
            this.requests++;
            return true;
        }
        return false;
    }
}
exports.RateLimiter = RateLimiter;
