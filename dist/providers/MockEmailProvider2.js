"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockEmailProvider2 = void 0;
class MockEmailProvider2 {
    sendEmail(email, message) {
        return Math.random() > 0.5; // 50% success rate
    }
}
exports.MockEmailProvider2 = MockEmailProvider2;
