export class RateLimiter {
    private requests: number = 0;
    private maxRequests: number = 5;
    private interval: number = 60000; // 1 minute
    private lastReset: number = Date.now();
  
    canSend(): boolean {
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
  