import { Component, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('messageModal') messageModal!: ElementRef;

  constructor(
    private surveyService: SurveyService,
    private router: Router
    ) {}
    
    ngOnInit() {
      this.getSurveys();
    }

    getSurveys() {
      this.surveyService.getSurveys().subscribe((result) => {
        this.surveys = result;
      })
    }
    
    openEditSurvey(studentId: number) {
      this.router.navigateByUrl("/survey/edit/"+studentId);
    }

    deleteSurvey(studentId: number) {
      this.surveyService.deleteSurvey(studentId).subscribe((result) => {
        document.getElementById("openModalButton")?.click();
        var div = document.getElementById("deletedId");
        div ? div.innerHTML = studentId.toString() : null;
      })
     }
        
}
