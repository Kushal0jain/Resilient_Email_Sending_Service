export class MockEmailProvider1 {
    sendEmail(email: string, message: string): boolean {
      return Math.random() > 0.2; // 80% success rate
    }
  }
  