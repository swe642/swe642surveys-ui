import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyListComponent } from './survey-list/survey-list.component';
import { SurveyFormComponent } from './survey-form/survey-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/survey', pathMatch:'full'},
  { path: 'survey/form', component: SurveyFormComponent },
  { path: 'survey/edit/:id', component: SurveyFormComponent },
  { path: 'survey', component: SurveyListComponent }
];

// @author Vamshi Gopari, Akhil Krishna Sai Takkella, Purna Chandra Pattipati, Vaishnavi Priya Chennu
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
