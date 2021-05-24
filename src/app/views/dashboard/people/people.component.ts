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
import { MessageService } from 'primeng/api';
import { LoadingSpinnerService } from '@components/loading-spinner/loading-spinner.service';
import { ConfirmationDialogComponent } from '@/app/components/confirmation-dialog/confirmation-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';

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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(injector: Injector, public entityService: PeopleService, private paginationService: PaginationService,
    public dialog: MatDialog, private messageService: MessageService, private loadingSpinner: LoadingSpinnerService) {
    super(injector);
    this.isDetails = !!this.activatedRoute.snapshot.params.id;
    if (this.isDetails)
    this.detailsEntity = this.activatedRoute.snapshot.data.person as PeopleModel;
  }

  ngAfterViewInit(){
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

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
      '_order': this.sort.direction
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
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Do you confirm deleting ' + person.name + '?',
      width: '410px'
    });

    dialogRef.afterClosed().subscribe((answer: boolean) => {
      if (answer) {
        this.delete(person);
      }
    });
  }

  delete(person: PeopleModel) {
    this.entityService.delete(person).subscribe(() => {
        this.loadingSpinner.removeLoading();
        this.messageService.add({ severity: 'info', detail: 'person deleted' });
      }, (error: HttpErrorResponse) => {
        this.loadingSpinner.removeLoading();
        this.messageService.add({ severity: 'error', detail: 'error deleting person: ' + person.name, life: 6000 });
        this.messageService.add({ severity: 'error', detail: 'error detail: ' + JSON.stringify(error), life: 6000 });
      });
  }

}
