/**
 * Logger Utility
 * Provides logging functionality for test execution
 */

export enum LogLevel {
  INFO = 'INFO',
  DEBUG = 'DEBUG',
  WARN = 'WARN',
  ERROR = 'ERROR'
}

class Logger {
  private static instance: Logger;
  private logToConsole: boolean = true;
  
  private constructor() {}
  
  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }
  
  /**
   * Format log message with timestamp and level
   */
  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] ${message}`;
  }
  
  /**
   * Log info message
   */
  public info(message: string): void {
    const formatted = this.formatMessage(LogLevel.INFO, message);
    if (this.logToConsole) {
      console.log(formatted);
    }
  }
  
  /**
   * Log debug message
   */
  public debug(message: string): void {
    const formatted = this.formatMessage(LogLevel.DEBUG, message);
    if (this.logToConsole) {
      console.debug(formatted);
    }
  }
  
  /**
   * Log warning message
   */
  public warn(message: string): void {
    const formatted = this.formatMessage(LogLevel.WARN, message);
    if (this.logToConsole) {
      console.warn(formatted);
    }
  }
  
  /**
   * Log error message
   */
  public error(message: string, error?: Error): void {
    const formatted = this.formatMessage(LogLevel.ERROR, message);
    if (this.logToConsole) {
      console.error(formatted);
      if (error) {
        console.error(error.stack);
      }
    }
  }
  
  /**
   * Enable or disable console logging
   */
  public setConsoleLogging(enabled: boolean): void {
    this.logToConsole = enabled;
  }
}

// Export singleton instance
export const logger = Logger.getInstance();