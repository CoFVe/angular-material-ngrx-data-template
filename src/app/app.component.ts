import { Component, OnInit, ChangeDetectorRef, AfterViewChecked, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, RouterEvent, Event, RouteConfigLoadStart, RouteConfigLoadEnd, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, ActivatedRoute } from '@angular/router';
import { filter, first, tap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { OidcUserService } from './auth/user/services/oidc-user.service';
import { DepartmentService } from './departments/services/department.service';
import {Location} from '@angular/common';
import { AuthService } from './auth/common/services/auth.service';
import { LoadingSpinnerService } from './common/components/loading-spinner/loading-spinner.service';

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
  private currentRoute: string = this.location.path();

  constructor(private translate: TranslateService, private router: Router, private loadinSpinnerService: LoadingSpinnerService, private departmentService: DepartmentService,
    private authService: AuthService, private cdRef: ChangeDetectorRef, private route: ActivatedRoute, oidcUserService: OidcUserService, private location: Location) {
    this.loading$ = this.loadinSpinnerService.loading$;

    oidcUserService.loaded$.pipe(tap(loaded => {
          if (!loaded) {
            oidcUserService.getAll().subscribe(async ()=>{
                if (await this.authService.isAuthenticated()) {
                  this.authService.listenTokenExpired();
                  this.departmentService.getAll().subscribe();
                  if (window.location.pathname === '/login' ) {
                    const params =new URLSearchParams(window.location.search);
                    if (params.has('redirect')){
                      router.navigate([params.get('redirect')]);
                    } else {
                      router.navigate(['/']);
                    }

                  }
                } else {
                  const params =new URLSearchParams(window.location.search);
                  if (params.has('redirect')){

                    router.navigate(['login'], {
                      queryParams: {
                        redirect: params.get('redirect')
                      }
                    });
                  }
                  else if (this.currentRoute !== '/' && this.currentRoute !== '/login' ) {
                    router.navigate(['login'], {
                      queryParams: {
                        redirect: this.location.path()
                      }
                    });
                  }
                  else {
                    router.navigate(['login']);
                  }
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
          // if (this.currentRoute !== this.location.path()){
          //   const params =new URLSearchParams(this.currentRoute);
          //    this.router.navigate([this.currentRoute.slice(1, this.currentRoute.length-1).split('/')[0]], {
          //      queryParams: params.getAll()
          //    });
          // }
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
