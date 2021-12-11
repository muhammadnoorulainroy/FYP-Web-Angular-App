import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Student } from 'src/app/DataModel';

/** Error when invalid control is dirty, touched, or submitted. */
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
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  students:Student = new Student;
  minDate!: Date;
  maxDate!: Date;

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

  constructor(private firebase: AngularFireDatabase) { }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 30, 0, 1);
    this.maxDate = new Date(currentYear + 0, 11, 31);
  }

  createStudent(form:NgForm){
    //alert(this.vans.ac);
    let phoneno = ("+92").concat(this.students.phone_No!.toString())
    this.students.phone_No = phoneno;
    this.students.password = phoneno;
    let student = this.firebase.database.ref('Students').child(phoneno);
    student.once('value', (existingStudent)=>{
      if(existingStudent.exists()){
        alert("Student "+ this.students.fullName.toUpperCase() + " already exists");
      }
      else{
        student.set(this.students);
        alert('Student '+ this.students.fullName.toUpperCase()+' has been Added Successfully');
        this.formReset();
      }
    }).catch(err=>{
      alert(err.message);
    })

   
  }

  changeDatePicker($event: any){
    let date!:Date;
    date = $event?.target.value;
    this.students.age = date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear();
    console.log(date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear());
    
  }

  formReset(){
    //this.students.age="";
    this.students.email="";
    this.students.fullName="";
    this.students.gender="";
    this.students.haddress="";
    this.students.iaddress="";
    this.students.phone_No="";
  }

  
}
