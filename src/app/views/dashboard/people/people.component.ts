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
import { first, map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})

export class PeopleComponent extends PageBaseComponent implements AfterViewInit {
  dataSource$!: Observable<PeopleModel[]>;

  displayedColumns = ['id','name','email'];
  pageLength!: number;

  isLoadingResults = true;
  isRateLimitReached = false;
  private areEntitiesLoaded = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(injector: Injector, public entityService: PeopleService, private paginationService: PaginationService,
    public dialog: MatDialog) {
    super(injector);
  }

  ngAfterViewInit(){
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    const currentEntityId = this.activatedRoute.snapshot.params.id;
    if(!!currentEntityId) {

      this.entityService.getByKey(currentEntityId).subscribe((currentEntity: PeopleModel)=>{
        this.openDialog('PeopleDetails', currentEntity);
      });

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
        dialogRef.afterClosed().subscribe(()=>{
          window.history.replaceState({}, '',`/people`);
          if (!this.areEntitiesLoaded) {
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
    this.areEntitiesLoaded = true;
  }

}
