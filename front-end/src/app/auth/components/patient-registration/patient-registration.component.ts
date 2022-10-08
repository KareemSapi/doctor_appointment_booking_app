import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.scss']
})
export class PatientRegistrationComponent implements OnInit {

  submitted          = false;
  errors             : string[] = [];
  messages           : string[] = [];  
  registrationForm!: FormGroup;
  loading!: boolean;
  spinnerMsg         : string = "Processing...";
  data               : any;
  files              : any;
  profile            : any;

  constructor(private router: Router) { }

     //Form getters
     get firstName() { return this.registrationForm.get('firstName'); }
     get middleName() { return this.registrationForm.get('middleName'); }
     get surName() { return this.registrationForm.get('surName'); }
     get email() { return this.registrationForm.get('email'); }
     get date_of_birth() { return this.registrationForm.get('date_of_birth'); }
     get gender() { return this.registrationForm.get('gender'); }
     get bloodGroup() { return this.registrationForm.get('bloodGroup'); }
     get Address() { return this.registrationForm.get('Address'); }
     get phone() { return this.registrationForm.get('phone'); }
     get medicalConditions() { return this.registrationForm.get('medicalConditions');}
     get password() { return this.registrationForm.get('password'); }
     get confirmPassword() { return this.registrationForm.get('confirmPassword'); }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      firstName                     : new FormControl(null,{validators:[Validators.required]}),
      middleName                    : new FormControl(null),
      surName                       : new FormControl(null,{validators:[Validators.required]}),
      email                       : new FormControl(null,{validators:[Validators.required]}),
      date_of_birth                 : new FormControl(null,{validators:[Validators.required]}),
      gender                        : new FormControl(null,{validators:[Validators.required]}),
      bloodGroup                          : new FormControl(null,{validators:[Validators.required]}),
      Address                 : new FormControl(null,{validators:[Validators.required]}),
      medicalConditions              : new FormControl(null,{validators:[Validators.required]}),
      phone                         : new FormControl(null,{validators:[Validators.minLength(9)]}),
      password                         : new FormControl(null,{validators:[Validators.minLength(8)]}),
      confirmPassword                         : new FormControl(null,{validators:[Validators.minLength(8)]}),
      
   });
  }

  save(): void {} 

}
