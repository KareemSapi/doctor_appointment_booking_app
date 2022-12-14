import { Injectable } from '@angular/core';
import { DoctorsApi } from '../api/doctor.api';
import { Observable } from 'rxjs';
import { Doctor } from '../../interfaces/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  constructor(
    private api: DoctorsApi
  ) { }

  searchDoctors(term: string): Observable<Doctor[]>{
    return this.api.searchDoctors(term)
  }

  add(data: any): Observable<any> {
    return this.api.add(data)
  }

  getCurrent(): Observable<any> {
    return this.api.getCurrent();
  }

  get(id: any): Observable<any> {
    return this.api.get(id);
  }
}
