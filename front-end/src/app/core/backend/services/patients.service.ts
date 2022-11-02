import { Injectable } from '@angular/core';
import { PatientsApi } from '../api/patient.api';
import { NbAuthService } from '@nebular/auth';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs';
import { Patient } from '../../interfaces/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(
    private api: PatientsApi
  ) { }

  getAll(data: any): Observable<any> {
    return this.api.getAll(data)
  }


  get(id: any): Observable<any> {
    return this.api.get(id);
  }

  getCurrent(): Observable<any> {
    return this.api.getCurrent();
  }

  add(data: any): Observable<any> {
    return this.api.add(data);
  }

  update(data: any): Observable<any> {
    return this.api.update(data);
  }
}
