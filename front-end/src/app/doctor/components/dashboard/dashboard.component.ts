import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppointmentsService } from 'src/app/core/backend/services/appointments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  appointments: any[] = [];

  constructor(
    private appointmentService: AppointmentsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAppointments()
  }

  getAppointments(){
    this.appointmentService.getAll()
     .subscribe( data => {
      if(!data){
        this.appointments = []
      }else{
        this.appointments = data
        this.appointments.slice(0,2)
        this.appointments.reverse()
        //console.log(this.appointments)
      }
     })
  }

  details(item: any){
    return this.router.navigate([`/doctor/appointment/${item.id}/details`])
  }

}
