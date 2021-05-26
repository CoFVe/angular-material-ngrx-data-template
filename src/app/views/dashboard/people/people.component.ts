import { AfterViewInit, Component, Injector, ViewChild } from '@angular/core';
import { PageBaseComponent } from '@views/base/page-base.component';
import { PeopleModel } from '@/app/models/people.model';
import { PeopleService } from '@/app/services/people.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { QueryParams } from '@ngrx/data';
import { PaginationService } from '@/app/services/pagination.service';
import { PaginationModel } from '@/app/models/pagination.model';
import { PeopleDetailsDialogComponent } from './people-details-dialog/people-details-dialog.component';
import { Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { LoadingSpinnerService } from '@components/loading-spinner/loading-spinner.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '@/app/components/notification-message/notification.service';
import { ConfirmationDialogService } from '@/app/components/confirmation-dialog/confirmation-dialog.service';
import { environment } from '@environment';

@Component({
  selector: 'people-list',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})

export class PeopleComponent extends PageBaseComponent implements AfterViewInit {
  dataSource$!: Observable<PeopleModel[]>;

  displayedColumns = ['id','name','email','table-options'];
  pageLength!: number;

  isLoadingResults = true;
  isRateLimitReached = false;
  private isDetails!: boolean;
  detailsEntity!: PeopleModel;
  pageSize = environment.pageSize;
  idFilter = '';
  nameFilter = '';
  emailFilter = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(injector: Injector, public entityService: PeopleService, private paginationService: PaginationService, private confirmDialogService: ConfirmationDialogService,
    public dialog: MatDialog, private notificationService: NotificationService, private loadingSpinner: LoadingSpinnerService) {
    super(injector);
    this.isDetails = !!this.activatedRoute.snapshot.params.id;
    if (this.isDetails)
    this.detailsEntity = this.activatedRoute.snapshot.data.person as PeopleModel;
  }

  ngAfterViewInit(){
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.paginator.pageSize = this.pageSize;
    } );

    if(this.isDetails) {
      this.openDialog('PeopleDetails', this.detailsEntity);
    } else {
      this.loadEntities();
    }
  }

  openDialog(dialogName: string, currentEntity? : PeopleModel): void {

    switch (dialogName) {
      case 'PeopleDetails':
        const dialogRef = this.dialog.open(PeopleDetailsDialogComponent, {
          data: currentEntity
        });
        dialogRef.afterClosed().pipe(first()).subscribe(()=>{
          window.history.replaceState({}, '',`/people`);
          if (this.isDetails) {
            this.isDetails = false;
            this.changePage();
          }
        });
        break;
    }

  }
  changeLocation(dialogName: string, currentEntity : PeopleModel): void {
    window.history.pushState({}, '',`/people/details/${currentEntity.id}`);
    this.openDialog(dialogName, currentEntity);
  }

  sortChange(): void {
    this.paginator.pageIndex = 0;
    this.changePage();
  }

  changePage(): void {
    this.dataSource$ = this.entityService.getWithQuery({
      '_page': (this.paginator.pageIndex + 1).toString(),
      '_limit': this.paginator.pageSize.toString(),
      '_sort': this.sort.active,
      '_order': this.sort.direction,
      'id_like': this.idFilter,
      'name_like': this.nameFilter,
      'email_like': this.emailFilter
    } as QueryParams).pipe(tap(()=>{
      this.paginationService.getById(this.entityService.entityName).pipe(first()).subscribe((pagination: PaginationModel)=> {
        this.pageLength = pagination?.length || 0;
      });
    }));
  }

  loadEntities() {
    this.paginationService.getById(this.entityService.entityName).pipe(first()).subscribe((pagination: PaginationModel)=> {
      this.pageLength = pagination?.length || 0;
    });
    this.dataSource$ = this.entityService.entities$.pipe(map(entities => entities.slice(0, this.paginator.pageSize)));
  }

  openDeleteConfirmation(person: PeopleModel): void {
    this.confirmDialogService.open('Do you confirm deleting ' + person.name + '?', '410px')
      .afterClosed().subscribe((answer: boolean) => {
        if (answer) {
          this.delete(person);
        }
      });
  }

  delete(person: PeopleModel) {
    this.entityService.delete(person).subscribe(() => {
        this.loadingSpinner.removeLoading();
        this.notificationService.show({ severity: 'info', detail: 'person deleted', life: 4000 });
      }, (error: HttpErrorResponse) => {
        this.loadingSpinner.removeLoading();
        this.notificationService.show({ severity: 'error', detail: 'error deleting person: ' + person.name, life: 4000 });
      });
  }

}
