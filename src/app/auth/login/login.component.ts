import { Component } from '@angular/core';
import { AuthService } from '@app/auth/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLoginVisible = true;

  constructor(private authService: AuthService) {
  }

  onLogin() {
    this.authService.login();
  }

}

