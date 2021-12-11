import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, snapshotChanges } from '@angular/fire/database';
import { Driver, Student, Van } from '../DataModel';

export class Driverr{
  fullName!:string
  phone_No!:string
}
 
@Injectable({
  providedIn: 'root'
})
export class VansService {

  availableDriverss:Driverr[] = [];
  availableDriversForStudents:Driverr[] = [];
  vanList!: AngularFireList<any>;
  driverPhoneNo!:string;
  //driverDetails!:Driver;
  vanNo!:string;
  vanDetails!:Van;
  studentPhoneNo!:string;
  studentGender!:string;
  studentDetails!:Student;
  
  constructor(private firebase: AngularFireDatabase) { }

  getVans() {
    this.vanList = this.firebase.list('Vans');
    return this.vanList.snapshotChanges();
  }

  getStudents() {
    this.vanList = this.firebase.list('Students');
    return this.vanList.snapshotChanges();
  }

  getComplaints() {
    this.vanList = this.firebase.list('Complaints/Student +923124464000');
    return this.vanList.snapshotChanges();
  }

  getDrivers() {
    this.vanList = this.firebase.list('Drivers');
    return this.vanList.snapshotChanges();
  }

  async getAvailableDrivers(){
    this.availableDriverss.splice(0,this.availableDriverss.length)
    let driver = this.firebase.database.ref('Drivers');
    driver.on('value', allDrivers=>{
      allDrivers.forEach(currDriver=>{
       if(!currDriver.child('Van').exists()){
         let d:Driverr = new Driverr;
         d.fullName = currDriver.child('fullName').val();
         d.phone_No = currDriver.child('phone_No').val();
         this.availableDriverss.push(d);
       }
      });
      console.log(this.availableDriverss);
    });
  }

  async getAvailableDriversForStudents(){
    this.availableDriversForStudents.splice(0,this.availableDriversForStudents.length)
    let driver = this.firebase.database.ref('Drivers');
    driver.once('value', allDrivers=>{
      allDrivers.forEach(currDriver=>{
       if(currDriver.child('Van').exists()){
         let van = this.firebase.database.ref('Vans/'+currDriver.child('Van').val());
         van.once('value',(vanData)=>{
           if(vanData.child('stdCategory').val()=='Boys' && this.studentGender=='Male'){
              let d:Driverr = new Driverr;
              d.fullName = currDriver.child('fullName').val();
              d.phone_No = currDriver.child('phone_No').val();
              this.availableDriversForStudents.push(d);
           }
           else if(vanData.child('stdCategory').val()=='Girls' && this.studentGender=='Female'){
            let d:Driverr = new Driverr;
            d.fullName = currDriver.child('fullName').val();
            d.phone_No = currDriver.child('phone_No').val();
            this.availableDriversForStudents.push(d);
           }
         })
        //  let d:Driverr = new Driverr;
        //  d.fullName = currDriver.child('fullName').val();
        //  d.phone_No = currDriver.child('phone_No').val();
        //  this.availableDriverss.push(d);
       }
      });
      console.log(this.availableDriversForStudents);
    });
  }

  setDriverPhoneNo(phone:string){
    this.driverPhoneNo = phone;
  }
  getDriverPhoneNo(){
   return this.driverPhoneNo;
  }

  setStudentPhoneNo(phone:string){
    this.studentPhoneNo = phone;
  }
  getStudentPhoneNo(){
   return this.studentPhoneNo;
  }
  setStudentGender(gender:string){
    this.studentGender = gender;
  }
  getStudentGender(){
   return this.studentGender;
  }

  setVanNo(vanNo:string){
    this.vanNo = vanNo;
  }
  getVanNo(){
   return this.vanNo;
  }

 
  
}
