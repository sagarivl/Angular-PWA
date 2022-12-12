import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public notificationURL = 'http://localhost:3001/subscribe';
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
    //return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }
  // SendSubsriptionToService(subscription: PushSubscription) {
  //   return this.http.post(
  //     'https://jsonplaceholder.typicode.com/users',
  //     subscription
  //   );
  // }

  //push notifiy
  postSubscription(sub: PushSubscription) {
    return this.http
      .post(this.notificationURL, sub)
      .pipe(catchError(this.handlError));
  }
  handlError(error) {
    return throwError(error.error.message);
  }
}
