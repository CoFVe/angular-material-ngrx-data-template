import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '@app/auth/auth.service';
import { User } from 'oidc-client';

@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
  providers: []
})
export class LogoutComponent {
  @Input("iconOnly") iconOnly = false;
  @Input("color") color = "primary";

  user!: User | null;

  constructor(private translate: TranslateService, private authService: AuthService) {
    this.user = this.authService.user;
  }

  logout() {
    this.authService.logout();
  }

}
