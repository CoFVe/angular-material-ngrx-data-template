import { Component, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '@/app/common/components/base/base.component';

@Component({
  selector: '',
  template: ''
})

export class PageBaseComponent extends BaseComponent {
  protected activatedRoute: ActivatedRoute;

  constructor(injector: Injector) {
    super(injector);
    this.activatedRoute = injector.get(ActivatedRoute);
  }

}
