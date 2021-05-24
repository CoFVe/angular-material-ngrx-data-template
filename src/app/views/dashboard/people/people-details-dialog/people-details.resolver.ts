import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PeopleService } from '@/app/services/people.service';
import { tap, first, filter } from 'rxjs/operators';
import { LoadingSpinnerService } from '@/app/components/loading-spinner/loading-spinner.service';
import { DepartmentService } from '@/app/services/department.service';
import { PeopleModel } from '@/app/models/people.model';

@Injectable()
export class PeopleDetailsResolver implements Resolve<PeopleModel> {

  constructor(private entityService: PeopleService, private departmentService: DepartmentService, private loadingSpinner: LoadingSpinnerService) {
    this.entityService.loaded$.pipe(tap(loaded => {
      if (!loaded) {
        loadingSpinner.addLoading();
      }
      else {
        loadingSpinner.removeLoading();
      }
    }),
      first()
    );
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PeopleModel> {
    return this.entityService.getByKey(route.params.id).pipe(tap(()=>{
        this.departmentService.loaded$.pipe(tap(loaded => {
          if (!loaded) {
            this.departmentService.getAll();
          }
        }),
          filter((loaded: boolean) => !!loaded),
          first()
        );
    }));

  }
}
