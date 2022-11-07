import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientsService } from 'src/app/core/backend/services/patients.service';

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
 profile            : any;

 constructor( 
  private router          : Router,
  private route           : ActivatedRoute,
  private patientService  : PatientsService
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
   get bloodGroup() { return this.profileForm.get('bloodGroup'); }
   get Address() { return this.profileForm.get('Address'); }
   get phone() { return this.profileForm.get('phone'); }
   get medicalConditions() { return this.profileForm.get('medicalConditions');}
 

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
    firstName                     : new FormControl({value: null, disabled: true},{validators:[Validators.required]}),
    middleName                    : new FormControl(null),
    surName                       : new FormControl({value: null, disabled: true},{validators:[Validators.required]}),
    date_of_birth                 : new FormControl({value: null, disabled: true},{validators:[Validators.required]}),
    gender                        : new FormControl({value: null, disabled: true},{validators:[Validators.required]}),
    bloodGroup                    : new FormControl({value: null, disabled: true},{validators:[Validators.required]}),
    Address                       : new FormControl(null),
    medicalConditions             : new FormControl(null),
    phone                         : new FormControl(null,{validators:[Validators.minLength(9)]}),
    
 });
  }

  getProfile(){
    this.patientService.getCurrent()
     .subscribe(res => {
       this.profile = res;
       //console.log(this.profile)
       this.profileForm.setValue({
        firstName                     : this.profile.first_name,
        middleName                    : this.profile.middle_name,
        surName                       : this.profile.last_name,
        date_of_birth                 : this.profile.date_of_birth,
        gender                        : this.profile.gender,
        medicalConditions             : this.profile.medical_conditions,
        bloodGroup                    : this.profile.blood_group,
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
      blood_group: this.profileForm.value.bloodGroup,
      medical_conditions: this.profileForm.value.medicalConditions,
    }


    this.patientService.update(data)
     .subscribe(res => {
      if(!res){
        setTimeout(() => {
         this.loading = false 
        }, 3000);
        return;
      }else{
        //this.profileForm.reset();
        this.router.navigate(['/patient/profile'])
      }
     })
  }


}
