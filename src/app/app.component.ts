import { Component, OnInit, ChangeDetectorRef, AfterViewChecked, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, RouterEvent, Event, RouteConfigLoadStart, RouteConfigLoadEnd, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, ActivatedRoute } from '@angular/router';
import { filter, first, tap } from 'rxjs/operators';
import { LoadingSpinnerService } from '@/app/components/loading-spinner/loading-spinner.service';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '@app/auth/auth.service';
import { OidcUserService } from './services/oidc-user.service';
import { DepartmentService } from './services/department.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked, OnDestroy {
  loading$!: Observable<boolean>;
  loading = false;
  loadingSubscription!: Subscription;
  title: string = 'angular-material-ngrx-data-template';

  constructor(private translate: TranslateService, private router: Router, private loadinSpinnerService: LoadingSpinnerService, private departmentService: DepartmentService,
    private authService: AuthService, private cdRef: ChangeDetectorRef, route: ActivatedRoute, oidcUserService: OidcUserService) {
    this.loading$ = this.loadinSpinnerService.loading$;

    oidcUserService.loaded$.pipe(tap(loaded => {
          if (!loaded) {
            oidcUserService.getAll().subscribe(()=>{
                if (this.authService.isAuthenticated()) {
                  this.authService.listenTokenExpired();
                  this.departmentService.getAll().subscribe();
                } else {
                  router.navigate(['login']);
                }

            });
          }
        }),
      filter(loaded => !!loaded),
      first()
    ).subscribe();

    translate.setDefaultLang('en');
    // As the router loads modules asynchronously (via loadChildren), we're going to
    // keep track of how many asynchronous requests are currently active. If there is
    // at least one pending load request, we'll show the indicator.

    // The Router emits special events for "loadChildren" configuration loading. We
    // just need to listen for the Start and End events in order to determine if we
    // have any pending configuration requests.
    router.events
    .pipe(
      filter((e: Event): e is RouterEvent => e instanceof RouterEvent)
    )
    .subscribe(
      (event: RouterEvent) => {
        if (event instanceof RouteConfigLoadStart) {
          this.loadinSpinnerService.addLoading();
        } else if (event instanceof RouteConfigLoadEnd) {
          this.loadinSpinnerService.removeLoading();
        }
      }
    );

  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loadinSpinnerService.addLoading();
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loadinSpinnerService.removeLoading();
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngAfterViewChecked() {
    this.loadingSubscription =
      this.loading$.subscribe((loading) => {
        if (loading != this.loading) { // check if it change, tell CD update view
          this.loading = loading;
          this.cdRef.detectChanges();
        }
      });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
