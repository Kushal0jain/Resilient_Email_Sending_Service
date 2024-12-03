export class MockEmailProvider2 {
    sendEmail(email: string, message: string): boolean {
      return Math.random() > 0.5; // 50% success rate
    }
  }
  