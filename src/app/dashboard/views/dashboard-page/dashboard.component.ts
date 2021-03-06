import { Component, Injector } from '@angular/core';
import { ContainerPageComponent } from '../../components/container-page/container-page.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends ContainerPageComponent {

  constructor(injector: Injector) {
    super(injector);
  }

}
