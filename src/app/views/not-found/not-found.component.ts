import { Component, Injector } from '@angular/core';
import { ContainerPageComponent } from '@views/base/container-page.component';

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
