import { ErrorHandler } from "@angular/core";
import { Message } from "../components/notification-message/message";
import { NotificationService } from "../components/notification-message/notification.service";
import { LoggerService } from "../services/logger.service";

export class UncaughtExceptionHandler implements ErrorHandler
{
  constructor(private loggerService: LoggerService, private notificationService: NotificationService) { }

  handleError(err: any) {
    let message: Message = {};
    if (!!err && typeof err === 'string') {
      message = {
        severity: 'error',
        detail: err
      };
    } else if (!!err && !!err.message && typeof err.message === 'string') {
      message = {
        severity: 'error',
        detail: err.message
      };
    } else if (!!err && !!err.message && !!err.error.message && typeof err.error.message === 'string') {
      message = {
        severity: 'error',
        detail: err.error.message
      };
    } else if (!!err.error && typeof err.error === 'string') {
      message = {
        severity: 'error',
        detail: err.error
      };
    } else if (!!err && !!err.error && !!err.error.error && typeof err.error.error === 'string') {
      message = {
        severity: 'error',
        detail: err.error.error
      };
    } else {
      message = {
        severity: 'error',
        detail: JSON.stringify(err)
      };
    }

    this.loggerService.error(message.detail || "an error has occurs");
    this.notificationService.show({ detail: 'An unexepected error has occurs, please check logging console for details' } as Message);
  }
}
