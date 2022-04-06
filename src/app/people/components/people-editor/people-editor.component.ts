import { DepartmentModel } from '@/app/departments/models/department.model';
import { DepartmentService } from '@/app/departments/services/department.service';
import { PeopleService } from '@/app/people/services/people.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Output, EventEmitter, OnDestroy, Input, OnInit, Injector } from '@angular/core';
import { PeopleModel } from '@/app/people/models/people.model';
import { Observable, Subscription } from 'rxjs';
import { BaseComponent } from '@/app/common/components/base/base.component';
import { ConfirmationDialogService } from '../../../common/components/confirmation-dialog/confirmation-dialog.service';
import { NotificationService } from '@/app/common/components/notification-message/notification.service';
import { LoadingSpinnerService } from '@/app/common/components/loading-spinner/loading-spinner.service';

@Component({
  selector: 'people-editor',
  templateUrl: './people-editor.html',
  styleUrls: ['./people-editor.scss']
})
export class PeopleEditorComponent extends BaseComponent implements OnDestroy, OnInit {
  @Output() isEdited: EventEmitter<PeopleModel> = new EventEmitter<PeopleModel>();
  @Input() entity!: PeopleModel;
  subscriptions: Subscription[] = [];
  enableEdit :boolean = false;
  private originalEntity!: PeopleModel;
  departments$!: Observable<DepartmentModel[]>;

  constructor(private entityService: PeopleService, private departmentService: DepartmentService,
    private notificationService: NotificationService, private loadingSpinner: LoadingSpinnerService,
    public confirmDialogService: ConfirmationDialogService, injector: Injector) {
      super(injector);
  }

  ngOnInit() {
    if(!!!this.entity?.id) {
      this.entity = {
        id: null,
        name: '',
        departmentId: '0',
        email: '',
        avatar: '',
        phone: ''
      };
    }
    this.departments$ = this.departmentService.entities$;
    this.originalEntity = { ...this.entity };
    this.enableEdit = !!!this.entity?.id;
  }

  openConfirmationDialog(): void {
    this.confirmDialogService.open('Do you confirm deleting ' + this.entity.name + '?', '410px')
      .afterClosed().subscribe(answer => {
        if (answer) {
          this.delete();
        }
      });
  }

  onNoClick(): void {
    this.isEdited.emit(undefined);
  }

  save() {
    this.subscriptions.push(
      this.entityService.upsert({ ...this.entity }).subscribe((resultEntity) => {
        this.loadingSpinner.removeLoading();
        this.notificationService.show({ severity: 'info', detail: resultEntity.name + ' updated', life: 4000 });
      }, (error: HttpErrorResponse) => {
        this.loadingSpinner.removeLoading();
        this.notificationService.show({ severity: 'error', detail: 'error updating person: ' + this.entity.name, life: 4000 });
      })
    );
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
        this.notificationService.show({ severity: 'info', detail: 'person deleted', life: 4000 });
      }, (error: HttpErrorResponse) => {
        this.loadingSpinner.removeLoading();
        this.notificationService.show({ severity: 'error', detail: 'error deleting person: ' + this.entity.name, life: 4000 });
      })
    );
    this.isEdited.emit(this.entity);
  }

}
