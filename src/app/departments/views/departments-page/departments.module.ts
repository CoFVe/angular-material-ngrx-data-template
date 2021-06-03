import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentsComponent } from './departments.component';
import { DepartmentsResolver } from './departments.resolver';
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
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { DepartmentStoreModule } from '@/app/common/store/department-store.module';
import { DepartmentsEditorModule } from '../../components/departments-editor/departments-editor.module';
import { DepartmentsDetailsDialogComponent } from '../../components/departments-details-dialog/departments-details-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatTooltipModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false }),
    DepartmentStoreModule,
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
    DepartmentsEditorModule
  ],
  declarations: [ DepartmentsComponent, DepartmentsDetailsDialogComponent ],
  providers: [ DepartmentsResolver ],
  entryComponents:[DepartmentsDetailsDialogComponent]
})
export class DepartmentsModule {
}
