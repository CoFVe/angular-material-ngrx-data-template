import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleComponent } from './people.component';
import { PeopleResolver } from './people.resolver';

const routes: Routes = [
  {
    path: '',
    component: PeopleComponent,
    resolve: {
      applications: PeopleResolver
    }
  },
  {
    path: 'details/:id',
    component: PeopleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule {}
