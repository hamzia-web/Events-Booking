import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import {IUser} from "../models/IUser";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  /**
   * Register a User
   * @param user
   */
  public register(user: IUser): Observable<{result: string, user: IUser}>{
    let dataUrl:string = `http://localhost:5000/users/register`
    return this.httpClient.post<{result: string, user: IUser}>(dataUrl, user).pipe(retry(1),
      catchError(this.handleError))
  }

  /**
   * Register a login
   * @param user
   */
  public login(user: IUser): Observable<{result: string, token: string, user: IUser, error:string} >{
    let dataUrl:string = `http://localhost:5000/users/login`
    return this.httpClient.post<{result: string, token: string, user: IUser, error: string}>(dataUrl, user)
      .pipe(retry(1), catchError(this.handleError))
  }

  /**
   * Get the token
   */
  getToken(): string{
    let token = localStorage.getItem('token') ? localStorage.getItem('token') : ''
    return token
  }

  /**
   * To check whether user is logged in or not
   */
  public isLoggedIn():boolean{
    return !!localStorage.getItem('token')
  }

  /**
   * To logout
   */
  public logout(){
    localStorage.removeItem('token')
    this.router.navigate(['/']).then(response => response)
  }

  /**
   * To check whether admin or not
   */
  public isAdminUser(): boolean{
    let user = JSON.parse(localStorage.getItem('user'))
    if(user)
      return user.isAdmin
    return false
  }

  /**
   * Get user data
   */
  public getUserData(){
    return JSON.parse(localStorage.getItem('user'))
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
