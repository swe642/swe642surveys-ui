import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveysComponent } from './surveys/surveys.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch:'full'},
  { path: 'home', component: SurveysComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
