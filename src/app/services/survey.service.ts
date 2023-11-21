import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { Survey } from './survey';

// @author Vamshi Gopari, Akhil Krishna Sai Takkella, Purna Chandra Pattipati, Vaishnavi Priya Chennu 
@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  private apiUrl = 'http://localhost:8080/surveys';
  private surveyData: BehaviorSubject<Survey | null> =
    new BehaviorSubject<Survey | null>(null);

  constructor(private http: HttpClient) {}

  getSurveys() {
    return this.http.get<Survey[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error loading products from JSON file:', error);
        return of([]); // Return an empty array in case of an error
      })
    );
  }

  // Fetch details of a specific survey by its ID
  getSurveyById(studentId: number) {
    return this.http
      .get<Survey>(`${this.apiUrl}?id=${studentId}`)
      .pipe(catchError(() => of(null)));
  }

  createSurvey(survey: Survey) {
    return this.http.post<Survey>(this.apiUrl, survey).pipe(
      catchError((error) => {
        console.error('Error loading products from JSON file:', error);
        return of([]); // Return an empty array in case of an error
      })
    );
  }

  editSurvey(studentId: number | undefined, surveyData: any) {
    return this.http.put<Survey>(`${this.apiUrl}?id=${studentId}`, surveyData).pipe(
      catchError((error) => {
        console.error('Error loading products from JSON file:', error);
        return of([]); // Return an empty array in case of an error
      })
    );
  }
  setSurveyData(data: Survey): void {
    this.surveyData.next(data);
  }

  getSurveyData(): Observable<Survey | null> {
    return this.surveyData.asObservable();
  }

  deleteSurvey(studentId: number) {
    return this.http.delete(`${this.apiUrl}?id=${studentId}`).pipe(
      catchError((error) => {
        return of([]); // Return an empty array in case of an error
      })
    )
  }
}
