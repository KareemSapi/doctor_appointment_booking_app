import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DoctorsService } from 'src/app/core/backend/services/doctors.service';
import { Doctor } from 'src/app/core/interfaces/doctor';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import {Validators, FormGroup, FormBuilder, FormControl} from '@angular/forms'
import { AppointmentsService } from 'src/app/core/backend/services/appointments.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  doctors!: Observable<Doctor[]>;
  private searchTerms = new Subject<string>();
  appointmentForm!: FormGroup;
  data:{} = {};
  submitted: boolean = false;
  message: string = ''

  get doctorId() { return this.appointmentForm.get('doctorId'); }
  get time() { return this.appointmentForm.get('time'); }

  constructor(
    private doctorService: DoctorsService,
    private appointmentService: AppointmentsService,
    ) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.doctors = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.doctorService.searchDoctors(term)),
    );

    this.appointmentForm = new FormGroup({
      doctorId  : new FormControl(null, {validators:[Validators.required]}),
      time      : new FormControl(null, {validators:[Validators.required]}),
    });
  }

  save(): void {

    this.data = {
      time: this.appointmentForm.value.time,
      doctorId: this.appointmentForm.value.doctorId
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
      })

  }

}
