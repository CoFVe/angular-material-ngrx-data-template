import { ContainerPageComponent } from '@/app/dashboard/components/container-page/container-page.component';
import { Component, Injector } from '@angular/core';

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
