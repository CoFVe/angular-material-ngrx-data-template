import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PeopleRoutingModule } from './people-routing.module';
import { PeopleComponent } from './people.component';
import { PeopleResolver } from './people.resolver';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PeopleStoreModule } from '@/app/stores/people-store.module';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { PeopleDetailsDialogComponent } from './people-details-dialog/people-details-dialog.component';
import { PeopleEditorModule } from '@/app/components/people-editor/people-editor.module';
import { LoadingSpinnerModule } from '@/app/components/loading-spinner/loading-spinner.module';
import { PeopleDetailsResolver } from './people-details-dialog/people-details.resolver';
import { NgxPermissionsModule } from 'ngx-permissions';
import { TableUpdaterModule } from '@/app/components/table-updater/table-updater.module';
import { FilterService } from '@/app/services/filter.service';

@NgModule({
  imports: [
    CommonModule,
    PeopleRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatTooltipModule,
    FlexLayoutModule,
    PeopleStoreModule,
    RouterModule,
    MatDialogModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    FormsModule,
    TranslateModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSortModule,
    PeopleEditorModule,
    LoadingSpinnerModule,
    NgxPermissionsModule,
    TableUpdaterModule
  ],
  declarations: [ PeopleComponent, PeopleDetailsDialogComponent ],
  providers: [ PeopleResolver, PeopleDetailsResolver, FilterService ],
  entryComponents:[ PeopleDetailsDialogComponent ]
})
export class PeopleModule {
}
