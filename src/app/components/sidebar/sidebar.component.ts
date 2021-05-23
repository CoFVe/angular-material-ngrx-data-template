import { Component, Input, EventEmitter, Output, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '@components/base/base.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent extends BaseComponent {
  public showMenu!: string;

  constructor(injector: Injector, private translate: TranslateService) {
    super(injector);
  }

  @Input() collapsed: boolean = false;
  @Output() onSidebarCollaped: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit() {
      this.showMenu = '';
  }

  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  expand() {
    this.collapsed = false;
    this.onSidebarCollaped.emit(this.collapsed);
  }

  toggleCollapse(event: Event) {
    this.collapsed = !this.collapsed;
    this.onSidebarCollaped.emit(this.collapsed);
  }
}
