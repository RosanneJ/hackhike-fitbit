import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './model/User';
import { LifeTimeActivity } from './model/LifeStyleActivity';
import { Heartrate } from './model/Heartrate';

@Injectable({
  providedIn: 'root'
})
export class FitbitService {
  private BASE_URL = '/api';

  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': 'true'
    })
  };

  constructor(private http: HttpClient) {
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}/user`, this.httpOptions);
  }

  getLifetimeActivity(): Observable<LifeTimeActivity> {
    return this.http.get<LifeTimeActivity>(`${this.BASE_URL}/lifetime-activity`, this.httpOptions);
  }

  getLatestHeartrate(): Observable<Heartrate> {
    return this.http.get<any>(`${this.BASE_URL}/latest-heartrate`, this.httpOptions);
  }
}
