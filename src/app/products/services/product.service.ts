import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import {IProduct} from "../models/IProduct";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Method is to get all products
   *
   * @returns
   */
  getAllProducts():Observable<IProduct[]>{
    const dataUrl = "http://127.0.0.1:5000/api/products";
    return this.httpClient.get<IProduct[]>(dataUrl)
      .pipe(retry(1), catchError(this.handleError));
  }


  /**
   * Method is to get a single products
   *
   * @returns
   */
  getProduct(productId:string):Observable<IProduct>{
    const dataUrl = `http://127.0.0.1:5000/api/products/${productId}`;
    return this.httpClient.get<IProduct>(dataUrl)
      .pipe(retry(1), catchError(this.handleError));
  }

  /**
   * Method is to create a single products
   *
   * @param product
   */
  createAProducts(product:IProduct):Observable<IProduct>{
    const dataUrl = 'http://127.0.0.1:5000/api/products/';
    return this.httpClient.post<IProduct>(dataUrl, product)
      .pipe(retry(1), catchError(this.handleError));
  }

  /**
   * Method is to update a single product
   *
   * @returns
   */
  updateProducts(product:IProduct, productId:string):Observable<IProduct>{
    const dataUrl = `http://127.0.0.1:5000/api/products/${productId}`;
    return this.httpClient.put<IProduct>(dataUrl, product)
      .pipe(retry(1), catchError(this.handleError));
  }

  /**
   * Method is to delete a product
   *
   * @returns
   */
  deleteProduct(productId:string):Observable<IProduct>{
    const dataUrl = `http://127.0.0.1:5000/api/products/${productId}`;
    return this.httpClient.delete<IProduct>(dataUrl)
      .pipe(retry(1), catchError(this.handleError));
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
