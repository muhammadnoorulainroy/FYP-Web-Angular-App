import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Driver } from 'src/app/DataModel';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})
export class AddDriverComponent implements OnInit {

  drivers:Driver = new Driver;
  minDate!: Date;
  maxDate!: Date;
  constructor(private firebase: AngularFireDatabase) { }

  ngOnInit(): void {
  }

  createDriver(){
    //alert(this.vans.ac);
    this.firebase.database.ref('Drivers').child(this.drivers.phone_No!).set(this.drivers);
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 1, 1, 1990);
    this.maxDate = new Date(currentYear + 1, 11, 31);
    // if(this.content){
    //   this.content.open();
    // }
    alert('Driver has been Added Successfully');
    this.formReset();
  }

  formReset(){
    this.drivers.email="";
    this.drivers.fullName="";
    this.drivers.gender="";
    this.drivers.haddress="";
    this.drivers.phone_No="";
  }

}
