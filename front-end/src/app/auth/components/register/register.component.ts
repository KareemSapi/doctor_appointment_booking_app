import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  submitted          = false;
  errors             : string[] = [];
  messages           : string[] = [];  
  registrationForm!: FormGroup;
  loading!: boolean;
  data               : any;
  
  constructor() { }

  get email() { return this.registrationForm.get('email'); }
  get password() { return this.registrationForm.get('password'); }
  get confirmPassword() { return this.registrationForm.get('confirmPassword'); }

  ngOnInit(): void {

    this.registrationForm = new FormGroup({
      email                   : new FormControl(null,{validators:[Validators.required]}),
      password                    : new FormControl(null),
      confirmPassword                       : new FormControl(null,{validators:[Validators.required]}),
    })
  }

  register(): void {

    const data = JSON.stringify({
      username: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
      confirm_password: this.registrationForm.value.confirmPassword
    })

    console.log(data)
  }

}
