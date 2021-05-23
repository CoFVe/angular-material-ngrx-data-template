import { Component, Input, Output, EventEmitter, Injector } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { environment } from '@environment';
import { BaseComponent } from '@components/base/base.component';
import { Profile } from 'oidc-client';

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

  constructor(injector: Injector, private translate: TranslateService, private deviceDetectorService: DeviceDetectorService) {
    super(injector);
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

}
