import { Component, Injector, OnDestroy, ViewChild } from '@angular/core';
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
import { FilterService } from '@/app/services/filter.service';
import { FilterField } from '@/app/models/filter-field.model';

@Component({
  selector: 'people-list',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})

export class PeopleComponent extends PageBaseComponent implements OnDestroy {
  env = environment;
  dataSource$!: Observable<PeopleModel[]>;
  private isDetails!: boolean;
  detailsEntity!: PeopleModel;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(injector: Injector, public entityService: PeopleService, private paginationService: PaginationService,
    private confirmDialogService: ConfirmationDialogService, public dialog: MatDialog, private notificationService: NotificationService,
    private loadingSpinner: LoadingSpinnerService, public filterService: FilterService) {
    super(injector);

    this.filterService.setFields([
      {
        name: 'id',
        isDisplayed: true,
        filterType: 'input'
      },
      {
        name: 'name',
        isDisplayed: true,
        filterType: 'input'
      },
      {
        name: 'email',
        isDisplayed: true,
        filterType: 'input'
      },
      {
        name: 'table-options',
        isDisplayed: true
      },
    ] as FilterField[]);
    this.filterService.setOriginalRoute('/people');

    this.filterService.pageSize = this.env.pageSize;
    this.isDetails = !!this.activatedRoute.snapshot.params.id;

    if(this.isDetails) {
      this.detailsEntity = this.activatedRoute.snapshot.data.person as PeopleModel;
      this.openDialog('PeopleDetails', this.detailsEntity);
    } else {
      this.loadEntities();
    }
  }

  ngOnInit(){
    const queryParams = JSON.parse(this.activatedRoute.snapshot.params?.queryParams || null);
    if (!!queryParams){
      this.dataSource$.pipe(tap(()=>{
        this.filterService.filterValues['id'] = queryParams.id_like;
        this.filterService.filterValues['name'] = queryParams.name_like;
        this.filterService.filterValues['email'] = queryParams.email_like;
        this.changePage(JSON.parse(this.activatedRoute.snapshot.params.queryParams));
      }), first()).subscribe();
    }
  }

  openDialog(dialogName: string, currentEntity? : PeopleModel): void {
    switch (dialogName) {
      case 'PeopleDetails':
        const dialogRef = this.dialog.open(PeopleDetailsDialogComponent, {
          data: currentEntity
        });
        dialogRef.afterClosed().pipe(first()).subscribe(()=>{
          if (this.isDetails) {
            this.isDetails = false;
            this.changePage();
            window.history.replaceState({}, '',`/people`);
          }
        });
        break;
    }
  }

  changeLocation(dialogName: string, currentEntity : PeopleModel): void {
    window.history.pushState({}, '',`/people/details/${currentEntity.id}`);
    this.openDialog(dialogName, currentEntity);
  }

  onSortChange(): void {
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = this.filterService.pageSize;
    this.changePage();
  }

  changePage(queryParams?: QueryParams): void {
    let params;
    if (!!queryParams) {
      params = this.filterService.replaceQueryParamsInRoute(queryParams);
    } else {
      params = this.filterService.addQueryParamsInRoute(this.paginator.pageIndex + 1, this.paginator.pageSize, this.sort.active, this.sort.direction);
    }

    this.dataSource$ = this.entityService.getWithQuery(params).pipe(tap(()=>{
      this.paginationService.getById(this.entityService.entityName).pipe(first()).subscribe((pagination: PaginationModel)=> {
        this.filterService.pageLength = pagination?.length || 0;
      });
    }));
  }

  loadEntities() {
    this.paginationService.getById(this.entityService.entityName).pipe(first()).subscribe((pagination: PaginationModel)=> {
      this.filterService.pageLength = pagination?.length || 0;
      this.dataSource$ = this.entityService.entities$.pipe(map(entities => entities.slice(0, this.paginator?.pageSize || environment.pageSize)));
    });

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

  onEnterKey(event: any){
    event.target.blur()
  }

  ngOnDestroy(): void {
    this.filterService.filterValues = [];
  }

}
