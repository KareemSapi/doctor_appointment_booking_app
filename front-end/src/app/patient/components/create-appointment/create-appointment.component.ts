import { Component, OnInit } from '@angular/core';
import { DoctorsService } from 'src/app/core/backend/services/doctors.service';
import { Router, ActivatedRoute } from '@angular/router';
import {Validators, FormGroup, FormControl} from '@angular/forms'
import { AppointmentsService } from 'src/app/core/backend/services/appointments.service';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.scss']
})
export class CreateAppointmentComponent implements OnInit {

  appointmentForm!: FormGroup;
  data:{} = {};
  submitted: boolean = false;
  message: string = '';
  profile: any;

  get time() { return this.appointmentForm.get('time'); }
  get gender() { return this.appointmentForm.get('gender'); }
  get registrationNumber() { return this.appointmentForm.get('registrationNumber'); }
  get qualification() { return this.appointmentForm.get('qualification'); }
  get specialization() { return this.appointmentForm.get('specialization');}

  constructor(
    private doctorService: DoctorsService,
    private appointmentService: AppointmentsService,
    private router: Router,
    private route: ActivatedRoute,
    ) {}


  ngOnInit(): void {
 
    let id = this.route.snapshot.paramMap.get('id')
    this.getDoctorProfile(id);

    this.appointmentForm = new FormGroup({
      name                  : new FormControl({value: null, disabled: true}, {validators:[Validators.required]}),
      time                  : new FormControl(null, {validators:[Validators.required]}),
      registrationNumber    : new FormControl({value: null, disabled: true},{validators:[Validators.required]}),
      qualification         : new FormControl({value: null, disabled: true},{validators:[Validators.required]}),
      specialization        : new FormControl({value: null, disabled: true},{validators:[Validators.required]}),
      symptoms              : new FormControl(null,{validators:[Validators.required]}),
    });
  }

  getDoctorProfile(id: any){
    this.doctorService.get(id)
     .subscribe(res => {
       this.profile = res;
       //console.log(this.profile)
       this.appointmentForm.setValue({
        name                          : `${this.profile.first_name} ${this.profile.middle_name} ${this.profile.last_name}`,
        //date_of_birth                 : this.profile.date_of_birth,
        //gender                        : this.profile.gender,
        specialization                : this.profile.specialization,
        qualification                 : this.profile.qualification,
        registrationNumber            : this.profile.registration_number,
        time                          : null,
        symptoms                      : null,
       });
     });
  }

  save(): void {

    this.data = {
      time: this.appointmentForm.value.time,
      doctorId: this.profile.id,
      patient_symptoms: this.appointmentForm.value.symptoms,
    }

    this.submitted = true;

    this.appointmentService.createAppointment(this.data)
      .subscribe((res) => {
        this.submitted = false;

        if(!res){
          return;
        }

        this.message = res.message;
        this.appointmentForm.reset();
        return this.router.navigate(['/patient/appointments'])
      })

  }

  back() {
    this.router.navigate(['/patient/dashboard']);
  }

}
