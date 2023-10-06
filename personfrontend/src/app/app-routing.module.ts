import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { PersonFormComponent } from './components/person-form/person-form.component';

const routes: Routes = [
  { path: '', component: PersonFormComponent },
  { path: 'people', component: PeopleListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
