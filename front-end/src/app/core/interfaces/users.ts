import { Observable } from 'rxjs';

export interface User {
    id        : number;
    email     : string;
    is_verified: boolean;
    is_approved : boolean;
    is_doctor   : boolean;
    is_patient  : boolean;
    is_admin : boolean
  }

  export abstract class UserData {
    //abstract get gridDataSource(): DataSource;
    abstract getCurrentUser(): Observable<User>;
    abstract list(pageNumber: number, pageSize: number): Observable<User[]>;
    abstract getAll(id:number):Observable<User>;
    abstract get(id:number): Observable<User>;
    abstract update(user:User): Observable<User>;
    abstract updateCurrent(user: User): Observable<User>;
    abstract create(user: User): Observable<User>;
    abstract delete(id: number): Observable<boolean>;
  }