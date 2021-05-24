import { DepartmentModel } from '@/app/models/department.model';
import { DepartmentService } from '@/app/services/department.service';
import { LoadingSpinnerService } from '@/app/components/loading-spinner/loading-spinner.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Output, EventEmitter, OnDestroy, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { ConfirmationDialogComponent } from '@components/confirmation-dialog/confirmation-dialog.component';
import { NotificationService } from '@components/notification-message/notification.service';

@Component({
  selector: 'departments-editor',
  templateUrl: './departments-editor.html',
  styleUrls: ['./departments-editor.scss']
})
export class DepartmentsEditorComponent implements OnDestroy, OnInit {
  @Output() isEdited: EventEmitter<DepartmentModel> = new EventEmitter<DepartmentModel>();
  @Input() entity!: DepartmentModel;
  subscriptions: Subscription[] = [];
  enableEdit :boolean = false;
  originalEntity!: DepartmentModel;
  departments$!: Observable<DepartmentModel[]>;

  constructor(private entityService: DepartmentService, private notificationService: NotificationService,
    private loadingSpinner: LoadingSpinnerService, public confirmDialog: MatDialog){
  }

  ngOnInit() {
    if(!!!this.entity?.id) {
      this.entity = {
        id: null,
        name: ''
      };
    }
    this.originalEntity = { ...this.entity };
    this.enableEdit = !!!this.entity?.id;
  }

  openConfirmationDialog(): void {
    const dialogRef = this.confirmDialog.open(ConfirmationDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(answer => {
      if (answer) {
        this.delete();
      }
    });
  }

  onNoClick(): void {
    this.isEdited.emit(undefined);
  }

  save() {
    if (!!!this.originalEntity?.id)
    {
      this.subscriptions.push(
        this.entityService.add({ ...this.entity }).subscribe((resultEntity) => {
          this.loadingSpinner.removeLoading();
          this.notificationService.show({ severity: 'info', detail: resultEntity.name + ' added' });
        }, (error: HttpErrorResponse) => {
          this.loadingSpinner.removeLoading();
          this.notificationService.show({ severity: 'error', detail: 'error updating person: ' + this.entity.name, life: 6000 });
        })
      );
    } else {
      this.subscriptions.push(
        this.entityService.upsert({ ...this.entity }).subscribe((resultEntity) => {
          this.loadingSpinner.removeLoading();
          this.notificationService.show({ severity: 'info', detail: resultEntity.name + ' updated' });
        }, (error: HttpErrorResponse) => {
          this.loadingSpinner.removeLoading();
          this.notificationService.show({ severity: 'error', detail: 'error updating person: ' + this.entity.name, life: 6000 });
        })
      );
    }
    this.isEdited.emit(this.entity);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  toggleEdit() {
    this.entity = { ...this.originalEntity };
    this.enableEdit = !this.enableEdit;
  }

  delete() {
    this.subscriptions.push(
      this.entityService.delete(this.entity).subscribe(() => {
        this.loadingSpinner.removeLoading();
        this.notificationService.show({ severity: 'info', detail: 'department deleted' });
      }, (error: HttpErrorResponse) => {
        this.loadingSpinner.removeLoading();
        this.notificationService.show({ severity: 'error', detail: 'error deleting department: ' + this.entity.name, life: 6000 });
      })
    );
    this.isEdited.emit(this.entity);
  }

}
