import { Component, OnInit, Injector } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '@app/auth/auth.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: '',
  template: ''
})

export class BaseComponent {
  protected router: Router;
  protected authService: AuthService;
  protected permissionsService: NgxPermissionsService;

  constructor(injector: Injector) {
    this.router = injector.get(Router);
    this.authService = injector.get(AuthService);
    this.permissionsService = injector.get(NgxPermissionsService);
  }

  goToRoute(routes: Array<any>, extras?: NavigationExtras) {
    this.router.navigate(routes,extras);
  }

  windowWidth() {
    return window.innerWidth;
  }

  utf8_encode(data: string | null | undefined) {
    return decodeURIComponent(escape(data || ""));
  }

  hasPermissions() {
    let hasPermissions = false;
    this.authService.getRoles().forEach((role: string | any) => {
      if (!hasPermissions)
        if (this.permissionsService.getPermissions()[role])
          hasPermissions = !!this.permissionsService.getPermissions()[role];
    });
    return hasPermissions;
  }

}
