import { Component, Injector } from '@angular/core';
import { ContainerPageComponent } from '../base/container-page.component';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.scss']
})
export class AccessDeniedComponent extends ContainerPageComponent {

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
  }

}
