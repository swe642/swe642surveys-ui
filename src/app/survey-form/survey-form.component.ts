import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Survey } from '../services/survey';
import { SurveyService } from '../services/survey.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// @author Vamshi Gopari, Akhil Krishna Sai Takkella, Purna Chandra Pattipati, Vaishnavi Priya Chennu 
@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css'],
})
export class SurveyFormComponent {
  surveyForm: FormGroup;
  id: number | undefined;
  isAddMode: boolean = true;
  submitted = false;
  @ViewChild('messageModal') messageModal!: ElementRef;
  
  constructor(
    private formBuilder: FormBuilder,
    private surveyService: SurveyService,
    private route: ActivatedRoute,
    private renderer: Renderer2
  ) {
    this.surveyForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      telephoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateOfSurvey: ['', Validators.required],
      likedStudents: [false],
      likedLocation: [false],
      likedCampus: [false],
      likedAtmosphere: [false],
      likedDormRooms: [false],
      likedSports: [false],
      interestSource: [],
      recommendLikelihood: [null],
      additionalComments: [''],
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.isAddMode = false;
      this.surveyService
        .getSurveyById(this.id)
        .subscribe((result: any) => this.surveyForm.patchValue(result));
    }
  }

  get f() { 
    return this.surveyForm.controls; 
  }

  saveSurvey() {
    this.submitted = true;
    if (this.isAddMode) {
      if (this.surveyForm && this.surveyForm.valid) {
        const surveyData = this.surveyForm.value;
        this.surveyService
          .createSurvey(surveyData)
          .subscribe((response: any) => {
            // Handle success, e.g., show a success message or navigate to a new page
            if (response.studentId != null) {
              document.getElementById("openModalButton")?.click();
            }
          });
      } else {
        // Form is invalid, show validation errors
        Object.keys(this.surveyForm.controls).forEach((field) => {
          const control = this.surveyForm.get(field);
          control?.markAsTouched({ onlySelf: true });
        });
      }
    } else {
      if (this.surveyForm && this.surveyForm.valid) {
        let recommendLikelihood =  this.surveyForm.controls['recommendLikelihood'];
        recommendLikelihood.value == '' ? recommendLikelihood.setValue(null) : null;
        const surveyData = this.surveyForm.value;
        surveyData.studentId = this.id;
        this.surveyService
          .editSurvey(this.id, surveyData)
          .subscribe((response: any) => {
            // Handle success, e.g., show a success message or navigate to a new page
            if (response.studentId != null) {
              document.getElementById("openModalButton")?.click();
            }
          });
      } else {
        // Form is invalid, show validation errors
        Object.keys(this.surveyForm.controls).forEach((field) => {
          const control = this.surveyForm.get(field);
          control?.markAsTouched({ onlySelf: true });
        });
      }
    }
  }

  ngOnDestroy() {
    console.log('destroyed');
    this.isAddMode = false;
    this.id = undefined;
  }
}
