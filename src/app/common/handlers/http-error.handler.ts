import { Injectable, EventEmitter } from '@angular/core';
import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { DictionaryMap } from '@/app/common/models/dictionary-map.type';
import { NotificationService } from '../components/notification-message/notification.service';
import { LoggerService } from '../services/logger.service';
import { Message } from '../components/notification-message/message';

@Injectable({ providedIn: 'root' })
export class HttpErrorHandler {
  private retries: DictionaryMap<number> = {} as DictionaryMap<number>;

  onHttpError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(protected notificationService: NotificationService, private loggerService: LoggerService, private router: Router) {
  }

  handle(err: HttpErrorResponse, request: HttpRequest<any>) {
    let message: Message = {
      severity: 'error',
      detail: JSON.stringify(err)
    };

    switch (err.status) {
      case 401:
        this.notificationService.show({ severity: 'error', detail: 'Token expired, please renew your user Token', closable: true });
        return;
    }
    if (err.status === 403) {
      this.router.navigate(['/access-denied']);
      return;
    } else if (!!err && typeof err === 'string') {
      message = {
        severity: 'error',
        detail: err
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
    } else if (err.error !== undefined && err.error instanceof ProgressEvent) {
      message = {
        severity: 'error',
        detail: err.message
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
    }

    this.loggerService.error(message.detail || "an error has occurs");
    this.notificationService.show({ ...message, closable: true });
  }

}
