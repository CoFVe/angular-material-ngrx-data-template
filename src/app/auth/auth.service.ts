import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserManager, User, WebStorageStateStore } from 'oidc-client';
import { BehaviorSubject } from 'rxjs';
import { environment } from '@environment';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';


@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private manager!: UserManager;
  public user!: User | any;

  constructor(private http: HttpClient, private router: Router, private messageService: MessageService) {
    const userStore = new WebStorageStateStore({ store: localStorage });
    const settings = {
      ...environment.msalConfig,
      userStore: userStore
    }
    this.manager = new UserManager(settings);
    this.manager.getUser().then((user: any) => {
      this.user = user;
      this._authNavStatusSource.next(((!!this.user) && !!!this.user?.expired));
    });
  }

  login() {
    return this.manager.signinRedirect();
  }

  async completeAuthentication() {
      this.user = await this.manager.signinRedirectCallback();
      this._authNavStatusSource.next(((!!this.user) && !!!this.user?.expired));
  }

  isAuthenticated(): boolean {
    return (!!this.user) && !!!this.user?.expired;
  }

  get authorizationHeaderValue(): string {
    return `${this.user?.token_type} ${this.user?.access_token}`;
  }

  get name(): string {
    return (this.user !== null && this.user !== undefined)  ? (this.user?.profile?.name || '') : '';
  }

  async logout() {
    await this.manager.signoutRedirect();
  }

  listenTokenExpired() {
    this.manager.events.addAccessTokenExpiring(() => {
      this.manager.signinSilent().then(() => {
        this.router.navigate([window.location.pathname]);
      }).catch((err: string) => this.messageService.add({ severity: 'error', detail: 'failed refreshing user token: ' + err }));
    });
  }

  getRoles() : string[] {
    return this.user?.profile.roles || [""];
  }
}
