
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpService } from './http.service';
import { catchError, map, tap } from 'rxjs/operators';
import { Doctor } from '../../interfaces/doctor';

@Injectable()
export class DoctorsApi {
  private readonly apiController: string = 'doctor';

  constructor(private api: HttpService) {}

  getCurrent(): Observable<any> {
    return this.api.get(`${this.apiController}/current/doctor`)
      .pipe(map(data => {
        return { ...data };
      }));
  }
  
  getAll(data: any):Observable<any>{
    return this.api.get(`${this.apiController}/all`)
  }

  get(id: any): Observable<any> {
    return this.api.get(`${this.apiController}/${id}`)
      .pipe(map(data => {
        return { ...data };
      }));
  }

  add(data: any): Observable<any> {
    return this.api.post(`${this.apiController}/add`, data)
  }

 

/* GET heroes whose name contains search term */
searchDoctors(term: string): Observable<Doctor[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.api.get(`${this.apiController}/search/${term}`).pipe(
    tap(x => x.length ?
       this.log(`found doctors matching "${term}"`) :
       this.log(`no doctors matching "${term}"`)),
    catchError(this.handleError<Doctor[]>('searchDoctors', []))
  );
}

  /** Log a message with the MessageService */
  private log(message: string) {
    //this.messageService.add(` ${message}`);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
  
}
