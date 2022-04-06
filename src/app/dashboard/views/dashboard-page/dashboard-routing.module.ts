import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'people'
      },
      {
        path: '/',
        redirectTo: 'people'
      },
      {
        path: 'people',
        loadChildren: () => import('../../../people/views/people-page/people.module').then(m => m.PeopleModule)
      },
      {
        path: 'departments',
        loadChildren: () => import('../../../departments/views/departments-page/departments.module').then(m => m.DepartmentsModule)
      },
      {
        path: 'about',
        loadChildren: () => import('../../../about/views/about-page/about.module').then(m => m.AboutModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
