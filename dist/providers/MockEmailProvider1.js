"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockEmailProvider1 = void 0;
class MockEmailProvider1 {
    sendEmail(email, message) {
        return Math.random() > 0.2; // 80% success rate
    }
}
exports.MockEmailProvider1 = MockEmailProvider1;
