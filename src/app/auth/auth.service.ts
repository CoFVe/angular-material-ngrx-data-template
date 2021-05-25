import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserManager, User, WebStorageStateStore } from 'oidc-client';
import { BehaviorSubject } from 'rxjs';
import { environment } from '@environment';
import { Router } from '@angular/router';
import { NotificationService } from '@/app/components/notification-message/notification.service';
import { LoadingSpinnerService } from '../components/loading-spinner/loading-spinner.service';
import { IAuthService } from './auth.service.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {

  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private manager!: UserManager;
  public user!: User | any;

  constructor(private http: HttpClient, private router: Router, private notificationService: NotificationService, private loadingSpinner: LoadingSpinnerService) {
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
    this.loadingSpinner.addLoading();
    return this.manager.signinRedirect();
  }

  async completeAuthentication() {
      this.user = await this.manager.signinRedirectCallback();
      this._authNavStatusSource.next(((!!this.user) && !!!this.user?.expired));
  }

  isAuthenticated(): boolean {
    return (!!this.user) && !!!this.user?.expired;
  }

  async logout() {
    await this.manager.signoutRedirect();
  }

  listenTokenExpired() {
    this.manager.events.addAccessTokenExpiring(() => {
      this.manager.signinSilent().then(() => {
        this.router.navigate([window.location.pathname]);
      }).catch((err: string) => this.notificationService.show({ severity: 'error', detail: 'failed refreshing user token: ' + err }));
    });
  }

  getRoles() : string[] {
    return this.user?.profile.roles || [""];
  }

  reloadProfile(){

  }

}
