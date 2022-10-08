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

}
