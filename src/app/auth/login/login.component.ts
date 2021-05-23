import { Component, OnDestroy } from '@angular/core';
import { LoadingSpinnerService } from '@/app/components/loading-spinner/loading-spinner.service';
import { AuthService } from '@app/auth/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  isLoginVisible = true;

  constructor(private authService: AuthService, private loadingSpinner: LoadingSpinnerService) {
  }

  ngOnDestroy() {
    this.loadingSpinner.addLoading();
  }

  onLogin() {
    this.loadingSpinner.addLoading();
    this.authService.login();
  }

}

