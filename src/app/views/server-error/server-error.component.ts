import { Component, Injector } from '@angular/core';
import { ContainerPageComponent } from '@views/base/container-page.component';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.scss']
})
export class ServerErrorComponent extends ContainerPageComponent {
  message: string = 'Sorry, a server error has occurs';

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
  }

}
