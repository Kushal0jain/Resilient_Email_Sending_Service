import { EmailService } from '../src/EmailService';

test('should send email successfully', async () => {
  const service = new EmailService();
  const result = await service.sendEmail('test@example.com', 'Hello World!');
  expect(result).toBe('Email sent successfully');
});

test('should handle rate limiting', async () => {
  const service = new EmailService();
  for (let i = 0; i < 6; i++) {
    await service.sendEmail('test@example.com', 'Hello World!');
  }
  const result = await service.sendEmail('test@example.com', 'Hello Again!');
  expect(result).toBe('Rate limit exceeded');
});
