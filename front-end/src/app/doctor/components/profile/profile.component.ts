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
  //private profileService  : ProfileDataService,
  ){
  const userId : any = this.route.snapshot.paramMap.get('id');
  //this.getProfile(userId)
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
    registrationNumber                       : new FormControl(null,{validators:[Validators.required]}),
    qualification                          : new FormControl(null,{validators:[Validators.required]}),
    Address                 : new FormControl(null),
    specialization              : new FormControl(null,{validators:[Validators.required]}),
    phone                         : new FormControl(null),
    
 });
  }

  // getProfile(id: any){
  //   this.profileService.get(id)
  //    .subscribe(res => {
  //      this.profile = res;
  //      console.log(this.profile)
  //      this.profileForm.setValue({
  //       firstName                     : this.profile.firstName,
  //       middleName                    : this.profile.middleName,
  //       surName                       : this.profile.surName,
  //       date_of_birth                 : this.profile.date_of_birth,
  //       gender                        : this.profile.gender,
  //       country                       : this.profile.country,
  //       city                          : this.profile.city,
  //       postalAddress                 : this.profile.postalAddress,
  //       physicalAddress               : this.profile.physicalAddress,
  //       phone                         : this.profile.phoneNumber,
  //      });
  //    });
  // }

  save(): void {

    const data = JSON.stringify({
      first_name: this.profileForm.value.firstName,
      middle_name: this.profileForm.value.middleName,
      sur_name: this.profileForm.value.surName,
      phone_number: this.profileForm.value.phone,
      date_of_birth: this.profileForm.value.date_of_birth,
      gender: this.profileForm.value.gender,
      address: this.profileForm.value.Address,
      registration_number: this.profileForm.value.registrationNumber,
      qualification: this.profileForm.value.qualification,
      specialization: this.profileForm.value.specialization,
    
    })

    this.doctorService.add(data)
     .subscribe(res => {
      if(!res){
        setTimeout(() => {
         this.loading = false 
        }, 3000);
        return;
      }else{
        this.profileForm.reset();
        this.router.navigate(['/doctor/appointment'])
      }
     })
  }



}
