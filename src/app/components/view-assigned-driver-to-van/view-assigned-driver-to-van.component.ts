import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Driver, Van } from 'src/app/DataModel';
import { VansService } from '../firebase-service';

@Component({
  selector: 'app-view-assigned-driver-to-van',
  templateUrl: './view-assigned-driver-to-van.component.html',
  styleUrls: ['./view-assigned-driver-to-van.component.css']
})
export class ViewAssignedDriverToVanComponent implements OnInit {

  constructor(private vanService: VansService, private firebase:AngularFireDatabase){}
  driverPhoneNo!:string;
  driverDetails:Driver = new Driver;
  vanNo!:string;
  vanDetails:Van = new Van;

  ngOnInit(): void {
    this.getDriverDetails();
    this.getVanDetails();
  }

  getDriverDetails(){
    this.driverPhoneNo = this.vanService.getDriverPhoneNo();
    let driver = this.firebase.database.ref('Drivers/'+this.driverPhoneNo);
    let counter=0;
    driver.on('value', currDriver=>{
      this.driverDetails.age = currDriver.child('age').val(),
      this.driverDetails.email = currDriver.child('email').val(),
      this.driverDetails.fullName = currDriver.child('fullName').val(),
      this.driverDetails.gender = currDriver.child('gender').val();
      this.driverDetails.haddress = currDriver.child('haddress').val();
      this.driverDetails.phone_No = currDriver.child('phone_No').val();
      console.log(this.driverDetails);
      currDriver.child('students').forEach(assignedStudent=>{
        if(assignedStudent.exists()){
          console.log(counter);
          counter++;
        }
      })
      this.vanDetails.numOfStds = counter.toString();
    });
  }

  

  getVanDetails(){
    this.vanNo = this.vanService.getVanNo();
    let van = this.firebase.database.ref('Vans/'+this.vanNo);
    //alert(van)
    van.on('value', currVan=>{
      
      this.vanDetails.ac= currVan.child('ac').val(),
      this.vanDetails.capacity= currVan.child('capacity').val(),
      this.vanDetails.fuelType= currVan.child('fuelType').val(),
      this.vanDetails.make= currVan.child('make').val(),
      this.vanDetails.model= currVan.child('model').val(),
      this.vanDetails.stdCategory= currVan.child('stdCategory').val(),
      this.vanDetails.vehicleNo= currVan.child('vehicleNo').val(),
      this.vanDetails.year= currVan.child('year').val()
      console.log(this.vanDetails);
    });
  }

}
