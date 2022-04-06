import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@/app/auth/common/services/auth.service';
import { LoadingSpinnerService } from '@/app/common/components/loading-spinner/loading-spinner.service';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent implements OnInit, OnDestroy {

  error!: boolean;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private loadingSpinner: LoadingSpinnerService) {
  }

  async ngOnInit() {

    // check for error
    if (this.route.snapshot.fragment!.indexOf('error') >= 0) {
       this.error=true;
       return;
     }

    this.loadingSpinner.addLoading();
    await this.authService.completeAuthentication();


  }

  ngOnDestroy() {
    this.loadingSpinner.removeLoading();
  }
}
