import { Injectable } from '@angular/core';
import { User } from 'oidc-client';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { OidcUserService } from '../services/oidc-user.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { first } from 'rxjs/operators';
import { ProfilePickerDialogService } from '../components/profile-picker-dialog/profile-picker-dialog.service';
import { LoadingSpinnerService } from '../components/loading-spinner/loading-spinner.service';
import { IAuthService } from './auth.service.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {

  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  authNavStatus$ = this._authNavStatusSource.asObservable();

  public user!: User | any;

  constructor(private router: Router, private route: ActivatedRoute, private entityService: OidcUserService, private loadingSpinner: LoadingSpinnerService,
    private permissionsService: NgxPermissionsService, private profilePickerService: ProfilePickerDialogService) {
    this.entityService.getAll().pipe(first()).subscribe((oidcUsers: User[] | any) => {
      if (!!oidcUsers[0]) {
        this.user = {...oidcUsers[0]};
      }
    });
  }

  login() {
    this.loadingSpinner.addLoading();
    this.entityService.entities$.pipe(first()).subscribe((oidcUsers: User[] | any) => {
      this.loadingSpinner.removeLoading();
      if (!!oidcUsers[0]) {
        this.user = {...oidcUsers[0]};
        const routeParams = this.route.snapshot.queryParamMap;
        this.router.navigate([routeParams.get('redirect') || '/']);
      } else {
        this.profilePickerService.open().afterClosed().subscribe((user: User | any) => {
          if (!!user){
            this.user = user;
            this.entityService.add( { ...this.user } as unknown as User);
            const routeParams = this.route.snapshot.queryParamMap;
            this.router.navigate([routeParams.get('redirect') || '/']);
          }
        });
      }
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

  reloadProfile() {
    this.profilePickerService.open().afterClosed().pipe(first()).subscribe((userSelected) => {
      if (!!userSelected){
        this.entityService.delete(this.user as User).pipe(first()).subscribe(()=>{
          this.user = null;
          this.user = { ...userSelected };
          this.entityService.add( { ...userSelected } as unknown as User).pipe(first()).subscribe(()=>{
            setInterval(()=>{
              window.location.href = window.location.href;
            }, 100);
          });
        });
      }
    });
  }

}
