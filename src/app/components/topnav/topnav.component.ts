import { Component, Input, Output, EventEmitter, Injector } from '@angular/core';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { environment } from '@environment';
import { BaseComponent } from '@components/base/base.component';
import { Profile, User } from 'oidc-client';
import { ProfilePickerDialogService } from '../profile-picker-dialog/profile-picker-dialog.service';
import { OidcUserService } from '@/app/services/oidc-user.service';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-topnav',
    templateUrl: './topnav.component.html',
    styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent extends BaseComponent {
  public isSidebarToggled = false;
  public isMobile: boolean;
  public userData!: Profile | null;
  public userName = '';
  public isProduction = environment.production || environment.staging ? true : false;
  @Input() showMenuBars!: boolean;
  @Input() showTitle!: boolean;
  @Output() onSidebarToggled: EventEmitter<boolean> = new EventEmitter<boolean>();
  private profilePickerService!: ProfilePickerDialogService;

  constructor(injector: Injector, private translate: TranslateService, private deviceDetectorService: DeviceDetectorService,
    private oidcUserService: OidcUserService) {
    super(injector);
    if (!this.isProduction) {
      this.profilePickerService = injector.get(ProfilePickerDialogService);
    }
    this.isMobile = this.deviceDetectorService.isMobile();
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isSidebarToggled) {
        this.toggleSidebar();
      }
    });
  }

  ngOnInit() {
    this.userData = this.authService?.user?.profile || null;
    this.showMenuBars = this.showMenuBars || true;
    this.showTitle = this.showTitle || true;
  }

  toggleSidebar() {
    this.isSidebarToggled = !this.isSidebarToggled;
    this.onSidebarToggled.emit(this.isSidebarToggled);
  }

  changeLang(language: string) {
      this.translate.use(language);
  }

  showProfilesPicker(){
    this.profilePickerService.open().afterClosed().subscribe((userSelected) => {
      if (!!userSelected){
        this.oidcUserService.delete(this.authService.user as User).pipe(first()).subscribe(()=>{
          this.authService.user = null;
          this.authService.user = userSelected;
          this.oidcUserService.add( { ...userSelected } as unknown as User).pipe(first()).subscribe(()=>{
            window.location.href = window.location.href;
          });
        });
      }

    });
  }

}
