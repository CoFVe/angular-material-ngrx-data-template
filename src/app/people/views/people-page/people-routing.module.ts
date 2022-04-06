import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleDetailsResolver } from '../../../people/views/people-details-dialog/people-details.resolver';
import { PeopleComponent } from './people.component';
import { PeopleResolver } from './people.resolver';

const routes: Routes = [
  {
    path: '',
    component: PeopleComponent,
    resolve: {
      people: PeopleResolver
    }
  },
  {
    path: 'details/:id',
    component: PeopleComponent,
    resolve: {
      person: PeopleDetailsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule {}
