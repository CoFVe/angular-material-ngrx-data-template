import { ContainerPageComponent } from '@/app/dashboard/components/container-page/container-page.component';
import { Component, Injector } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent extends ContainerPageComponent {

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
  }

}
