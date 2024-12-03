import { MockEmailProvider1 } from './providers/MockEmailProvider1';
import { MockEmailProvider2 } from './providers/MockEmailProvider2';
import { RateLimiter } from './utils/RateLimiter';
import { CircuitBreaker } from './utils/CircuitBreaker';
import { Logger } from './utils/Logger';

export class EmailService {
  private provider1 = new MockEmailProvider1();
  private provider2 = new MockEmailProvider2();
  private rateLimiter = new RateLimiter();
  private circuitBreaker1 = new CircuitBreaker();
  private circuitBreaker2 = new CircuitBreaker();

  async sendEmail(email: string, message: string): Promise<string> {
    if (!this.rateLimiter.canSend()) {
      Logger.log('Rate limit exceeded');
      return 'Rate limit exceeded';
    }

    const provider = this.circuitBreaker1.isClosed()
      ? this.provider1
      : this.provider2;

    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const success = provider.sendEmail(email, message);
        if (success) {
          Logger.log('Email sent successfully');
          return 'Email sent successfully';
        } else {
          throw new Error('Send failed');
        }
      } catch (error) {
        this.circuitBreaker1.recordFailure();
        await this.sleep(2 ** attempt * 1000); // Exponential backoff
      }
    }

    Logger.log('Email failed after retries');
    return 'Failed to send email';
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Temporary test to run the email service
(async () => {
    const emailService = new EmailService();
    const result = await emailService.sendEmail('test@example.com', 'Hello, this is a test email!');
    console.log(result);
  })();
  