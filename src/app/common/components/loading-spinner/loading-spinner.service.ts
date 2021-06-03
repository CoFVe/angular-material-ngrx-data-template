import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class LoadingSpinnerService {
  isShowingLoadSpinner: boolean = false;
  loading$: Observable<boolean>;
  private loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    this.loading$ = this.loading.asObservable();
  }

  addLoading() {
    this.loading.next(true);
  }

  removeLoading() {
      this.loading.next(false);
  }

}
