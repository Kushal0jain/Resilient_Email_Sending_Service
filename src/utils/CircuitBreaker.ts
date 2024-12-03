export class CircuitBreaker {
    private isOpen: boolean = false;
    private failureCount: number = 0;
    private maxFailures: number = 3;
  
    open(): void {
      this.isOpen = true;
      this.failureCount = 0;
    }
  
    close(): void {
      this.isOpen = false;
    }
  
    recordFailure(): void {
      this.failureCount++;
      if (this.failureCount >= this.maxFailures) {
        this.open();
      }
    }
  
    isClosed(): boolean {
      return !this.isOpen;
    }
  }
  