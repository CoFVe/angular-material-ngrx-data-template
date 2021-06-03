import { Component, Input, Injector } from '@angular/core';
import { BaseComponent } from '@/app/common/components/base/base.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'loading-spinner',
  templateUrl: './loading-spinner.html',
  styleUrls: ['./loading-spinner.scss']
})
export class LoadingSpinnerComponent extends BaseComponent {
  @Input() size!: string;
  @Input() loading$!: Observable<boolean>;
  @Input() color!: string;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.size = this.size || '100';
    this.loading$ = this.loading$ || new Observable<boolean>();
    this.color = this.color || 'accent';
  }

}
