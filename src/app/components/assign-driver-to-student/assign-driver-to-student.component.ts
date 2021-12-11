import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VansService } from '../firebase-service';

export interface Student {
  fullName: string;
  haddress: string;
  iaddress: string;
  lat: string;
  lon: string,
  phone_No: string
}

@Component({
  selector: 'app-assign-driver-to-student',
  templateUrl: './assign-driver-to-student.component.html',
  styleUrls: ['./assign-driver-to-student.component.css']
})
export class AssignDriverToStudentComponent implements OnInit {

  displayedColumns: string[] = ['fullName', 'phone_no', 'Action'];

  dataSource!: MatTableDataSource<any>;
  studentGender= this.vanService.getStudentGender();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private vanService: VansService, private firebase: AngularFireDatabase) { }

  ngOnInit(): void {
    this.vanService.getAvailableDriversForStudents();
    console.log(this.vanService.availableDriversForStudents);
    this.dataSource = new MatTableDataSource(this.vanService.availableDriversForStudents);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  assignDriver(row: any, rowid: number) {
    if(confirm('Are you sure to assign the student to '+row.fullName+' ?')){
      var stdPhoneNo = this.vanService.getStudentPhoneNo();
      this.firebase.database.ref('Students/'+stdPhoneNo).update({Driver:row.phone_No});

      //get student data to store in driver node
      let student = this.firebase.database.ref('Students/'+stdPhoneNo);
      student.once('value',(stdData)=>{
        let data:Student = {
          fullName: stdData.child('fullName').val(),
          haddress: stdData.child('haddress').val(),
          iaddress: stdData.child('iaddress').val(),
          lat: stdData.child('lat').val(),
          lon: stdData.child('lon').val(),
          phone_No: stdData.child('phone_No').val(),
        }
      this.firebase.database.ref('Drivers/'+row.phone_No+'/students/'+stdPhoneNo).set(data);
      this.dataSource.data.splice(0, this.dataSource.data.length);
      this.dataSource._updateChangeSubscription(); // <-- Refresh the datasource
      alert('Driver Assigned Sucessfully')
      })
      
    }
    //const index = this.dataSource.data.indexOf(item.id);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
}
