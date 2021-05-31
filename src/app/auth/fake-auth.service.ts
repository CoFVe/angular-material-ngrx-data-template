import { Injectable } from '@angular/core';
import { User } from 'oidc-client';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { OidcUserService } from '@services/oidc-user.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { filter, first, map, tap } from 'rxjs/operators';
import { ProfilePickerDialogService } from '@components/profile-picker-dialog/profile-picker-dialog.service';
import { LoadingSpinnerService } from '@components/loading-spinner/loading-spinner.service';
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
      const redirectUrl = this.route.snapshot.queryParamMap.get('redirect') || '/';
      if (!!oidcUsers[0]) {
        this.user = {...oidcUsers[0]};
        window.location.href = redirectUrl;
      } else {
        this.profilePickerService.open().afterClosed().subscribe((user: User | any) => {
          if (!!user){
            this.user = user;
            this.entityService.add( { ...this.user } as unknown as User);
            window.location.href = redirectUrl;
          }
        });
      }
    });
  }

  async completeAuthentication() {
    this._authNavStatusSource.next((!!this.user) && !!!this.user?.expired);
  }

  isAuthenticated(): Promise<boolean> {

    return new Promise((resolve) => {

      this.entityService.loaded$
        .pipe(tap(loaded => {
          if (loaded) {
            this.entityService.entities$.pipe(tap((users)=>{
              if(!!users[0])
                this.loadRoles(users[0]);
            }),map((oidcUsers: User[] | any) => {
              return !!oidcUsers[0] && !!!oidcUsers[0]?.expired;
            }), first()).subscribe((result) => {
              resolve(result);
            })
          }
        }),
        filter(loaded => !!loaded),
        first()
      ).subscribe();

    });

  }

  logout() {
    this.entityService.delete(this.user as User).pipe(first()).subscribe(()=>{
      this.user = null;
      // this.router.navigate(['/login'], { replaceUrl: true });
      window.location.href = "/login";
    });

  }

  listenTokenExpired() {

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
            window.location.href = window.location.href;
          });
        });
      }
    });
  }

}
