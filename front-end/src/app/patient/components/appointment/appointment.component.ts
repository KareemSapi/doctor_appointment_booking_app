import { Component, OnInit } from '@angular/core';
import { DoctorsService } from 'src/app/core/backend/services/doctors.service';
import { AppointmentsService } from 'src/app/core/backend/services/appointments.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  appointments: any[] = []

  constructor(
    private appointment: AppointmentsService,
    private doctor: DoctorsService
  ) { }

  ngOnInit(): void {
    this.getAppointments()
  }

  getAppointments(){
    this.appointment.getAll()
     .subscribe( data => {
      if(!data){
        this.appointments = []
      }else{
        this.appointments = data
        console.log(this.appointments)
      }
     })
  }

}
