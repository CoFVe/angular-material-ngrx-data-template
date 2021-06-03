import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '@environment';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
    constructor(private logger: NGXLogger) {
        this.logger.updateConfig(environment.loggerConfig);
  }

  getConfigSnapshot() {
      return this.logger.getConfigSnapshot();
  }

  setCustomHttpHeaders(httpHeaders: HttpHeaders) {
      this.logger.setCustomHttpHeaders(httpHeaders);
  }

  trace(msg: string, ...additionalParams: Array<any>): void {
    this.logger.trace(msg, additionalParams);
  }

  debug(msg: string, ...additionalParams: Array<any>): void {
    this.logger.debug(msg, additionalParams);
  }

  info(msg: string, ...additionalParams: Array<any>): void {
    this.logger.info(msg, additionalParams);
  }

  warn(msg: string,  ...additionalParams: Array<any>): void {
    this.logger.warn(msg, additionalParams);
  }

  error(msg: string, ...additionalParams: Array<any>): void {
    this.logger.error(msg, additionalParams);
  }

  fatal(msg: string, ...additionalParams: Array<any>): void {
    this.logger.fatal(msg, additionalParams);
  }

}
