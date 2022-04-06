import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PeopleRoutingModule } from './people-routing.module';
import { PeopleComponent } from './people.component';
import { PeopleResolver } from './people.resolver';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
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
import { PeopleDetailsDialogComponent } from '../../../people/views/people-details-dialog/people-details-dialog.component';
import { PeopleDetailsResolver } from '../../../people/views/people-details-dialog/people-details.resolver';
import { NgxPermissionsModule } from 'ngx-permissions';
import { TableUpdaterModule } from '@/app/common/components/table-updater/table-updater.module';
import { FilterService } from '@/app/common/services/filter.service';
import { LoadingSpinnerModule } from '@/app/common/components/loading-spinner/loading-spinner.module';
import { PeopleEditorModule } from '../../components/people-editor/people-editor.module';
import { PeopleStoreModule } from '@/app/people/modules/people-store.module';

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
