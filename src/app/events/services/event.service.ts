import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, retry} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {IEvent} from "../models/IEvent";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private httpClient: HttpClient) { }

  /**
   *  Free events
   */
  public getFreeEvents(): Observable<IEvent[]>{
    let dataUrl: string = `http://localhost:5000/events/free`
    return this.httpClient.get<IEvent[]>(dataUrl).pipe(retry(1), catchError(this.handleError))
  }

  /**
   *  Pro events
   */
  public getProEvents(): Observable<IEvent[]>{
    let dataUrl: string = `http://localhost:5000/events/pro`
    return this.httpClient.get<IEvent[]>(dataUrl).pipe(retry(1), catchError(this.handleError))
  }

  /**
   * Upload event
   * @param event
   */
  public uploadEvent(event: IEvent): Observable<{result: string, event: IEvent}>{
    let dataUrl: string = `http://localhost:5000/events/upload`
    return this.httpClient.post<any>(dataUrl, event).pipe(retry(1), catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
