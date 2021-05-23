import { Component, ViewChild, Injector } from '@angular/core';
import { SidebarComponent } from '@components/sidebar/sidebar.component';
import { PageBaseComponent } from './page-base.component';
import { User } from 'oidc-client';

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
