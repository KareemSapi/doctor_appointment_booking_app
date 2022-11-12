import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormControl} from '@angular/forms'
import { AppointmentsService } from 'src/app/core/backend/services/appointments.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.scss']
})
export class AppointmentDetailsComponent implements OnInit {

  appointmentForm!: FormGroup;
  data:{} = {};
  submitted: boolean = false;
  message: string = '';
  appointment: any;

  get time() { return this.appointmentForm.get('time'); }
  get gender() { return this.appointmentForm.get('gender'); }
  get symptoms() { return this.appointmentForm.get('symptoms'); }
  get registrationNumber() { return this.appointmentForm.get('registrationNumber'); }
  get specialization() { return this.appointmentForm.get('specialization'); }
  get qualification() { return this.appointmentForm.get('qualification'); }
  get name() { return this.appointmentForm.get('name');}
  get remarks() { return this.appointmentForm.get('remarks')}
  get age() { return this.appointmentForm.get('age'); }

  constructor(
    private appointmentService: AppointmentsService,
    private router: Router,
    private route: ActivatedRoute,
    private date: DatePipe
  ) { }

  ngOnInit(): void {

    let id = this.route.snapshot.paramMap.get('id');
    this.getAppointmentDetails(id)
    
    this.appointmentForm = new FormGroup({
      name                  : new FormControl({value: null, disabled: true}, {validators:[Validators.required]}),
      age                   : new FormControl({value: null, disabled: true}, {validators:[Validators.required]}),
      time                  : new FormControl({value: null, disabled: true}, {validators:[Validators.required]}),
      gender                : new FormControl({value: null, disabled: true},{validators:[Validators.required]}),
      specialization        : new FormControl({value: null, disabled: true},{validators:[Validators.required]}),
      qualification         : new FormControl({value: null, disabled: true},{validators:[Validators.required]}),
      registrationNumber    : new FormControl({value: null, disabled: true},{validators:[Validators.required]}),
      symptoms              : new FormControl({value: null, disabled: true},{validators:[Validators.required]}),
      remarks               : new FormControl({value: null, disabled: true}, {validators:[Validators.required]}),
    });
  }

  getAppointmentDetails(id: any){
    this.appointmentService.get(id)
     .subscribe(res => {
       this.appointment = res;
       //console.log(this.appointment)
       this.appointmentForm.setValue({
        name                          : `${this.appointment.first_name} ${this.appointment.middle_name} ${this.appointment.last_name}`,
        gender                        : this.appointment.gender,
        specialization                : this.appointment.specialization,
        registrationNumber            : this.appointment.registration_number,
        remarks                       : this.appointment.remarks,
        symptoms                      : this.appointment.symptoms,
        qualification                 : this.appointment.qualification,
        time                          : this.date.transform(this.appointment.time, 'medium'),
        age                           : this.appointment.age

       });
     });
  }

}
