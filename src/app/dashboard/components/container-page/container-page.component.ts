import { Component, ViewChild, Injector } from '@angular/core';
import { SidebarComponent } from '@/app/dashboard/components/sidebar/sidebar.component';
import { User } from 'oidc-client';
import { PageBaseComponent } from '@/app/common/views/base/page-base.component';

@Component({
  selector: 'app-container-page',
  templateUrl: './container-page.component.html',
  styleUrls: ['./container-page.component.scss']
})
export class ContainerPageComponent extends PageBaseComponent {
  @ViewChild(SidebarComponent, { static: false }) sideBarComponent!: SidebarComponent;
  expanded = true;
  pushRight = false;
  user: User | null;

  constructor(injector: Injector) {
    super(injector);
    this.user = this.authService.user;
  }
  ngOnInit() { }

  expandSidebar() {
    this.sideBarComponent.expand();
    this.expanded = true;
    this.pushRight = !this.pushRight;
  }
  toogleExpandMainContainer() {
    this.expanded = !this.expanded;
  }
}
