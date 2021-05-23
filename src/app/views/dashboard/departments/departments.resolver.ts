import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DepartmentService } from '@/app/services/department.service';
import { filter, tap, first, finalize } from 'rxjs/operators';
import { LoadingSpinnerService } from '@/app/components/loading-spinner/loading-spinner.service';

@Injectable()
export class DepartmentsResolver implements Resolve<boolean> {

  constructor(private entityService: DepartmentService, loadingSpinner: LoadingSpinnerService) {
    let loadingCount = 0;
    this.entityService.loaded$.pipe(tap(loaded => {
      if (!loaded) {
        loadingCount++;
        loadingSpinner.addLoading();
      }
      else {
        for (let i = 0; i < loadingCount; i++)
        loadingSpinner.removeLoading();
        loadingCount = 0;
      }
    }),
      first()
    );
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.entityService.loaded$.pipe(tap(loaded => {
            if (!loaded) {
              this.entityService.getAll().subscribe(()=>{
                  this.entityService.setLoaded(true);
              });
            }
          }),
        filter(loaded => !!loaded),
        first()
      );
  }
}
