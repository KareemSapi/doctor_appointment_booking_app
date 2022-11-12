import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Validators, FormGroup, FormControl} from '@angular/forms'
import { AppointmentsService } from 'src/app/core/backend/services/appointments.service';
import { PatientsService } from 'src/app/core/backend/services/patients.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.scss']
})
export class EditAppointmentComponent implements OnInit {

  appointmentForm!: FormGroup;
  data:{} = {};
  submitted: boolean = false;
  message: string = '';
  appointment: any;
  id: any;

  get time() { return this.appointmentForm.get('time'); }
  get gender() { return this.appointmentForm.get('gender'); }
  get symptoms() { return this.appointmentForm.get('symptoms'); }
  get bloodGroup() { return this.appointmentForm.get('bloodGroup'); }
  get medicalConditions() { return this.appointmentForm.get('medicalConditions'); }
  get name() { return this.appointmentForm.get('name');}
  get remarks() { return this.appointmentForm.get('remarks')}
  get age() { return this.appointmentForm.get('age'); }

  constructor(
    private patientService: PatientsService,
    private appointmentService: AppointmentsService,
    private router: Router,
    private route: ActivatedRoute,
    private date: DatePipe
  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');
    this.getAppointmentDetails(this.id)
    
    this.appointmentForm = new FormGroup({
      name                  : new FormControl({value: null, disabled: true}, {validators:[Validators.required]}),
      age                   : new FormControl({value: null, disabled: true}, {validators:[Validators.required]}),
      time                  : new FormControl({value: null, disabled: true}, {validators:[Validators.required]}),
      gender                : new FormControl({value: null, disabled: true},{validators:[Validators.required]}),
      bloodGroup            : new FormControl({value: null, disabled: true},{validators:[Validators.required]}),
      medicalConditions     : new FormControl({value: null, disabled: true},{validators:[Validators.required]}),
      symptoms              : new FormControl({value: null, disabled: true},{validators:[Validators.required]}),
      remarks               : new FormControl(null, {validators:[Validators.required]}),
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
        bloodGroup                    : this.appointment.blood_group,
        medicalConditions             : this.appointment.medical_conditions,
        remarks                       : this.appointment.remarks,
        symptoms                      : this.appointment.symptoms,
        //phone                         : this.profile.phone_number,
        time                          : this.date.transform(this.appointment.time, 'medium'),
        age                           : this.appointment.age

       });
     });
  }

  save(): void{
    this.data = {
      id: this.id,
      doctor_remarks: this.appointmentForm.value.remarks
    }
    this.submitted = true;

    this.appointmentService.update(this.data)
      .subscribe((result: any) => {
        if(!result){
          return;
        }

        this.appointmentForm.reset()
        this.router.navigate(['doctor/appointments'])
      })
  }

}
