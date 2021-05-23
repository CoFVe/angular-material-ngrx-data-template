import { DepartmentModel } from '@/app/models/department.model';
import { DepartmentService } from '@/app/services/department.service';
import { LoadingSpinnerService } from '@/app/components/loading-spinner/loading-spinner.service';
import { PeopleService } from '@/app/services/people.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Output, EventEmitter, OnDestroy, Input, OnInit, Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PeopleModel } from '@models/people.model';
import { MessageService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { BaseComponent } from '../base/base.component';

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
    private messageService: MessageService, private loadingSpinner: LoadingSpinnerService,
    public confirmDialog: MatDialog, injector: Injector) {
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
    this.subscriptions.push(
      this.entityService.upsert({ ...this.entity }).subscribe((resultEntity) => {
        this.loadingSpinner.removeLoading();
        this.messageService.add({ severity: 'info', detail: resultEntity.name + ' updated' });
      }, (error: HttpErrorResponse) => {
        this.loadingSpinner.removeLoading();
        this.messageService.add({ severity: 'error', detail: 'error updating person: ' + this.entity.name, life: 6000 });
        this.messageService.add({ severity: 'error', detail: 'error detail: ' + JSON.stringify(error), life: 6000 });
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
        this.messageService.add({ severity: 'info', detail: 'person deleted' });
      }, (error: HttpErrorResponse) => {
        this.loadingSpinner.removeLoading();
        this.messageService.add({ severity: 'error', detail: 'error deleting person: ' + this.entity.name, life: 6000 });
        this.messageService.add({ severity: 'error', detail: 'error detail: ' + JSON.stringify(error), life: 6000 });
      })
    );
    this.isEdited.emit(this.entity);
  }

}
