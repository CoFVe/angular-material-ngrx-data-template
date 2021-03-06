import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PeopleService } from '@/app/people/services/people.service';
import { filter, tap, first } from 'rxjs/operators';
import {  QueryParams } from '@ngrx/data';
import { DepartmentService } from '@/app/departments/services/department.service';
import { environment } from '@environment';
import { LoadingSpinnerService } from '@/app/common/components/loading-spinner/loading-spinner.service';

@Injectable()
export class PeopleResolver implements Resolve<boolean> {

  constructor(private entityService: PeopleService, private departmentService: DepartmentService, loadingSpinner: LoadingSpinnerService) {
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

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.entityService.loaded$.pipe(tap(loaded => {
                if (!loaded) {
                  this.entityService.getWithQuery({
                    '_page': '1',
                    '_limit': environment.pageSize,
                    '_sort': 'id',
                    '_order': 'desc'
                  } as QueryParams).pipe(first()).subscribe(()=>{

                    this.departmentService.loaded$.pipe(tap(loaded => {
                      if (!loaded) {
                        this.departmentService.getAll();
                      }
                    }),
                      filter(loaded => !!loaded),
                      first()
                    ).subscribe(()=> {
                      this.entityService.setLoaded(true);
                    });
                  });
                }
              }),
            filter(loaded => !!loaded),
            first()
          );
  }
}
