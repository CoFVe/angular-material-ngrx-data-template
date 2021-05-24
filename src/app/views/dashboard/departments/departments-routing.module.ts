import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentsComponent } from './departments.component';
import { DepartmentsResolver } from './departments.resolver';

const routes: Routes = [
  {
    path: '',
    component: DepartmentsComponent,
    resolve: {
      departments: DepartmentsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentsRoutingModule {}
