import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppointmentsApi } from '../api/appointment.api';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private api: AppointmentsApi) { }

  getAll(): Observable<any> {
    return this.api.getAll()
  }

  createAppointment(data: any): Observable<any> {
    return this.api.add(data)
  }

  get(id: any): Observable<any> {
    return this.api.get(id);
  }

  update(data: any): Observable<any> {
    return this.api.update(data);
  }

}
