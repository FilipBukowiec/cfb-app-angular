import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GymScheduleService {

  private apiUrl = 'https://api.example.com/activities';
  constructor(private http: HttpClient) { }

  submitActivity(activityData: any): Observable<any> {
    return this.http.post(this.apiUrl, activityData)
  }
}
