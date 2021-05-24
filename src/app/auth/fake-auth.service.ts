import { Injectable } from '@angular/core';
import { Profile, User } from 'oidc-client';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { OidcUserService } from '../services/oidc-user.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  authNavStatus$ = this._authNavStatusSource.asObservable();

  public user!: User | any;

  constructor(private router: Router, private route: ActivatedRoute, private entityService: OidcUserService, private permissionsService: NgxPermissionsService, private messageService: MessageService) {
    this.entityService.getAll().pipe(first()).subscribe((oidcUsers: User[] | any) => {
      if (!!oidcUsers[0]) {
        this.user = {...oidcUsers[0]};
      }
    });
  }

  login() {

    this.entityService.entities$.pipe(first()).subscribe((oidcUsers: User[] | any) => {
      if (!!oidcUsers[0]) {
        this.user = {...oidcUsers[0]};
      } else {
        this.user = {
          id_token: "user_id_token_string",
          access_token: "user_access_token_string",
          expired: false,
          profile: {
            email: "user@email.com",
            sub: "user_id",
            name: "user_name",
            given_name: "user_given_name",
            family_name: "user_family_name",
            nickname: "user_nickname",
            roles: 'Administrator'
          } as unknown as Profile
        } as User;
        this.entityService.add( { ...this.user } as unknown as User);

      }
      const routeParams = this.route.snapshot.paramMap;
      this.router.navigate([routeParams.get('redirect') || '/']);
    });
  }

  async completeAuthentication() {
    this._authNavStatusSource.next((!!this.user) && !!!this.user?.expired);
  }


  isAuthenticated(): boolean {
    let result = (!!this.user) && !!!this.user?.expired;
    if (result)
      this.loadRoles(this.user);
    return result;
  }

  get authorizationHeaderValue(): string {
    return `${this.user?.token_type} ${this.user?.access_token}`;
  }

  get name(): string {
    return (this.user !== null && this.user !== undefined)  ? (this.user?.profile?.name || '') : '';
  }

  logout() {
    this.entityService.delete(this.user as User).pipe(first()).subscribe(()=>{
      this.user = null;
      // this.router.navigate(['/login'], { replaceUrl: true });
      window.location.href = "/login";
    });

  }

  listenTokenExpired() {
    this.router.navigate([window.location.pathname]);
  }

  loadRoles(user: User | any) {
    let roles = [...user?.profile?.roles.split(',')] || ['Administrator'];
    this.permissionsService.loadPermissions(roles);
  }

  getRoles() : string[] {
    return this.user?.profile.roles || [""];
  }

}
