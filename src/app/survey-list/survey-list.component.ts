import { Component } from '@angular/core';
import { SurveyService } from '../services/survey.service';
import { Survey } from '../services/survey';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent {
  
  surveys: Survey [] = [];
  
  constructor(
    private surveyService: SurveyService,
    private router: Router
    ) {}
    
    ngOnInit() {
      this.surveyService.getSurveys().subscribe((result) => {
        this.surveys = result;
      })
    }
    
    openEditSurvey(studentId: number) {
      this.router.navigateByUrl("/survey/edit/"+studentId);
    }
}
