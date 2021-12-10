import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, snapshotChanges } from '@angular/fire/database';
import { Driver, Van } from '../DataModel';

export class Driverr{
  fullName!:string
  phone_No!:string
}
 
@Injectable({
  providedIn: 'root'
})
export class VansService {

  availableDriverss:Driverr[] = [];
  vanList!: AngularFireList<any>;
  driverPhoneNo!:string;
  driverDetails!:Driver;
  vanNo!:string;
  vanDetails!:Van;
  
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

  setDriverPhoneNo(phone:string){
    this.driverPhoneNo = phone;
  }
  getDriverPhoneNo(){
   return this.driverPhoneNo;
  }

  setVanNo(vanNo:string){
    this.vanNo = vanNo;
  }
  getVanNo(){
   return this.vanNo;
  }

 
  
}
