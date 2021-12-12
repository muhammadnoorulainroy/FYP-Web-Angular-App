import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Driver } from 'src/app/DataModel';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
interface SelectOptions {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})
export class AddDriverComponent implements OnInit {

  make = new FormControl('', [Validators.required,Validators.maxLength(30),Validators.pattern('^[a-zA-Z ]*$')]);
  model = new FormControl('', [Validators.required,Validators.maxLength(30),Validators.pattern('^([A-Za-z0-9]{0,})$')]);
  phone = new FormControl('', [Validators.required,Validators.max(3599999999),Validators.min(3000000000)]);
  email =  new FormControl('', [Validators.required,Validators.email]);
  haddress= new FormControl('', [Validators.required,Validators.maxLength(30)]);
  iaddress= new FormControl('', [Validators.required,Validators.maxLength(30)]);

  sittingCapacity = new FormControl('', [Validators.required,Validators.max(80),Validators.min(0)]);
  selectionItems =  new FormControl('', [Validators.required]);
  selectionItems2 =  new FormControl('', [Validators.required]);
  selectionItems3 =  new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  gender: SelectOptions[]=[
    {value: 'Male', viewValue: 'Male'},
    {value: 'Female', viewValue: 'Female'},
  ];

  drivers:Driver = new Driver;
  minDate!: Date;
  maxDate!: Date;
  constructor(private firebase: AngularFireDatabase) { }

  ngOnInit(): void {
  }

  createDriver(){
    // //alert(this.vans.ac);
    // this.firebase.database.ref('Drivers').child(this.drivers.phone_No!).set(this.drivers);
    // const currentYear = new Date().getFullYear();
    // this.minDate = new Date(currentYear - 1, 1, 1990);
    // this.maxDate = new Date(currentYear + 1, 11, 31);
    // // if(this.content){
    // //   this.content.open();
    // // }
    // alert('Driver has been Added Successfully');
    // this.formReset();

    if(this.drivers.age=="" || this.drivers.email=="" || this.drivers.fullName=="" || this.drivers.gender==""||
      this.drivers.haddress=="" ||  this.drivers.phone_No=="" ){
      alert('One or more fields are either invalid or empty');
      return;
    }
    let phoneno = ("+92").concat(this.drivers.phone_No!.toString())
    this.drivers.phone_No = phoneno;
    this.drivers.password = phoneno;
    let driver = this.firebase.database.ref('Drivers').child(phoneno);
    driver.once('value', (existingDriver)=>{
      if(existingDriver.exists()){
        alert("Driver "+ this.drivers.fullName!.toUpperCase() + " already exists");
      }
      else{
        driver.set(this.drivers);
        alert('Driver '+ this.drivers.fullName!.toUpperCase()+' has been Added Successfully');
        this.formReset();
      }
    }).catch(err=>{
      alert(err.message);
    })

  }

  formReset(){
    this.drivers.email="";
    this.drivers.fullName="";
    this.drivers.gender="";
    this.drivers.haddress="";
    this.drivers.phone_No="";
  }
  changeDatePicker($event: any){
    let date!:Date;
    date = $event?.target.value;
    this.drivers.age = date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear();
    console.log(date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear());
  }
}