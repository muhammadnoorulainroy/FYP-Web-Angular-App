import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Student } from 'src/app/DataModel';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  students:Student = new Student;
  minDate!: Date;
  maxDate!: Date;
  constructor(private firebase: AngularFireDatabase) { }

  ngOnInit(): void {
  }

  createStudent(){
    //alert(this.vans.ac);
    this.firebase.database.ref('Students').child(this.students.phone_No!).set(this.students);
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 1, 1, 1990);
    this.maxDate = new Date(currentYear + 1, 11, 31);
    // if(this.content){
    //   this.content.open();
    // }
    alert('Student has been Added Successfully');
    this.formReset();
  }

  formReset(){
    this.students.age="";
    this.students.email="";
    this.students.fullName="";
    this.students.gender="";
    this.students.haddress="";
    this.students.iaddress="";
    this.students.phone_No="";
  }

}
