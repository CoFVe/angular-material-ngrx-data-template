import { Component, Injector } from '@angular/core';
import { PageBaseComponent } from '@/app/common/views/base/page-base.component';
import { DepartmentModel } from '@/app/departments/models/department.model';
import { DepartmentService } from '@/app/departments/services/department.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DepartmentsDetailsDialogComponent } from '@/app/departments/components/departments-details-dialog/departments-details-dialog.component';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})

export class DepartmentsComponent extends PageBaseComponent {
  dataSource$!: Observable<DepartmentModel[]>;

  displayedColumns = ['id','name'];

  isLoadingResults = true;
  isRateLimitReached = false;

  constructor(injector: Injector, private entityService: DepartmentService, public dialog: MatDialog) {
    super(injector);
    this.dataSource$ = this.entityService.entities$;
  }

  openDialog(dialogName: string, currentEntity? : DepartmentModel): void {

    switch (dialogName) {
      case "DepartmentDetails":
        this.dialog.open(DepartmentsDetailsDialogComponent, {
          data: currentEntity
        });
        break;
    }

  }

}
