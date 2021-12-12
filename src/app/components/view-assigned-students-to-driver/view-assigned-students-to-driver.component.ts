import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { VansService } from '../firebase-service';

export class Students{
  fullName!:string
  phone_No!:string
  haddress!:string
  iaddress!:string
}

@Component({
  selector: 'app-view-assigned-students-to-driver',
  templateUrl: './view-assigned-students-to-driver.component.html',
  styleUrls: ['./view-assigned-students-to-driver.component.css']
})



export class ViewAssignedStudentsToDriverComponent implements OnInit {

  assignedStudentsToDriver:Students[] = [];
  displayedColumns: string[] = ['fullName', 'phone', 'homeAddr', 'schoolAddr', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private vanService: VansService,
    private firebase: AngularFireDatabase,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAssignedStudetsToDriver();
    this.dataSource = new MatTableDataSource(this.assignedStudentsToDriver);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  unassignDriver(row: any, rowId:number) {
    let s = this.firebase.database.ref('Drivers/' + this.vanService.driverPhoneNo+'/students/'+row.phone_No);
    s.once('value', student => {
      if (confirm('Are you sure to remove the driver assignment from ' + student.child('fullName').val() + ' ?')) {
        this.firebase.database.ref('Students/' + row.phone_No + '/Driver').set(null);
        //alert( this.firebase.database.ref('Drivers/'+row.phone_No+'/Van'))
        this.firebase.database.ref('Drivers/' + this.vanService.driverPhoneNo + '/students/' + row.phone_No).set(null);
        this.assignedStudentsToDriver.splice(0, this.assignedStudentsToDriver.length)
        this.getAssignedStudetsToDriver();
        this.dataSource.data.splice(rowId,1)
        this.dataSource._updateChangeSubscription();
        alert('Driver assignment has been revoked from the student ' + row.fullName)
      }
    })
  }

  getAssignedStudetsToDriver(){
    let students = this.firebase.database.ref('Drivers').child(this.vanService.driverPhoneNo).child('students');
    students.on('value',(currStudent)=>{
      if(currStudent.exists()){
        currStudent.forEach(studentData=>{
          let student:Students = new Students;
          student.fullName = studentData.child('fullName').val();
          student.phone_No = studentData.child('phone_No').val();
          student.haddress = studentData.child('haddress').val();
          student.iaddress = studentData.child('iaddress').val();
          this.assignedStudentsToDriver.push(student);
        })
      }
    })
    console.log(this.assignedStudentsToDriver)
  }

}
