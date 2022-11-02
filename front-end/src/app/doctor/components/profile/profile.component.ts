import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DoctorsService } from 'src/app/core/backend/services/doctors.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

 //vars
 isPostTopicRequired: boolean = true;
 isPostTitleRequired: boolean = true;
 isPostTextRequired : boolean = true;
 submitted          = false;
 //disabled           = false;
 errors             : string[] = [];
 messages           : string[] = [];  
 profileForm!: FormGroup;
 loading!: boolean;
 spinnerMsg         : string = "Processing...";
 data               : any;
 files              : any;
 profile            : any;

 constructor( 
  private router          : Router,
  private route           : ActivatedRoute,
  private doctorService   : DoctorsService
  ){
  const userId : any = this.route.snapshot.paramMap.get('id');
  }

   //Form getters
   get firstName() { return this.profileForm.get('firstName'); }
   get middleName() { return this.profileForm.get('middleName'); }
   get surName() { return this.profileForm.get('surName'); }
   get date_of_birth() { return this.profileForm.get('date_of_birth'); }
   get gender() { return this.profileForm.get('gender'); }
   get registrationNumber() { return this.profileForm.get('registrationNumber'); }
   get qualification() { return this.profileForm.get('qualification'); }
   get Address() { return this.profileForm.get('Address'); }
   get phone() { return this.profileForm.get('phone'); }
   get specialization() { return this.profileForm.get('specialization');}
 

  ngOnInit(): void {

    this.getProfile()

      //Form validators.
  const postTopicValidators = [];
  const postTitleValidators = [];
  const postTextValidators  = [];
  
  this.isPostTopicRequired && postTopicValidators.push(Validators.required);
  this.isPostTitleRequired && postTitleValidators.push(Validators.required);
  this.isPostTextRequired && postTextValidators.push(Validators.required);

  this.profileForm = new FormGroup({
    firstName                     : new FormControl(null,{validators:[Validators.required]}),
    middleName                    : new FormControl(null),
    surName                       : new FormControl(null,{validators:[Validators.required]}),
    date_of_birth                 : new FormControl(null,{validators:[Validators.required]}),
    gender                        : new FormControl(null,{validators:[Validators.required]}),
    registrationNumber            : new FormControl(null,{validators:[Validators.required]}),
    qualification                 : new FormControl(null,{validators:[Validators.required]}),
    Address                       : new FormControl(null),
    specialization                : new FormControl(null,{validators:[Validators.required]}),
    phone                         : new FormControl(null),
    
 });
  }

  getProfile(){
    this.doctorService.getCurrent()
     .subscribe(res => {
       this.profile = res;
       //console.log(this.profile)
       this.profileForm.setValue({
        firstName                     : this.profile.first_name,
        middleName                    : this.profile.middle_name,
        surName                       : this.profile.last_name,
        date_of_birth                 : this.profile.date_of_birth,
        gender                        : this.profile.gender,
        specialization                : this.profile.specialization,
        qualification                 : this.profile.qualification,
        registrationNumber            : this.profile.registration_number,
        Address                       : this.profile.address,
        phone                         : this.profile.phone_number,
       });
     });
  }

  save(): void {

    const data = {
      first_name: this.profileForm.value.firstName,
      middle_name: this.profileForm.value.middleName,
      last_name: this.profileForm.value.surName,
      phone_number: this.profileForm.value.phone,
      date_of_birth: this.profileForm.value.date_of_birth,
      gender: this.profileForm.value.gender,
      address: this.profileForm.value.Address,
      registration_number: this.profileForm.value.registrationNumber,
      qualification: this.profileForm.value.qualification,
      specialization: this.profileForm.value.specialization,
    }


    this.doctorService.add(data)
     .subscribe(res => {
      if(!res){
        setTimeout(() => {
         this.loading = false 
        }, 3000);
        return;
      }else{
        this.profileForm.reset();
        this.router.navigate(['/doctor/profile'])
      }
     })
  }


}
