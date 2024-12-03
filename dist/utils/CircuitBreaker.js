"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircuitBreaker = void 0;
class CircuitBreaker {
    constructor() {
        this.isOpen = false;
        this.failureCount = 0;
        this.maxFailures = 3;
    }
    open() {
        this.isOpen = true;
        this.failureCount = 0;
    }
    close() {
        this.isOpen = false;
    }
    recordFailure() {
        this.failureCount++;
        if (this.failureCount >= this.maxFailures) {
            this.open();
        }
    }
    isClosed() {
        return !this.isOpen;
    }
}
exports.CircuitBreaker = CircuitBreaker;
