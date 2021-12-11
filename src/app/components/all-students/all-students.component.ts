import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AssignDriverToStudentComponent } from '../assign-driver-to-student/assign-driver-to-student.component';
import { VansService } from '../firebase-service';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css']
})
export class AllStudentsComponent implements OnInit {

  totalStds = 0;
  totalBoysStds = 0;
  totalGirlsStds = 0;
  totalUnassignedStds = 0;
  tStds=false;
  tBoysStds=false;
  tGirlsStds = false;
  unassignedStds = false;

  displayedColumns: string[] = ['fullName', 'gender', 'dob', 'email', 'phone', 'homeAddr', 'schoolAddr', 'actions'];
 
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
    this.vanService.getStudents().subscribe(
      list => {
        let array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
        this.dataSource = new MatTableDataSource(array);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
    this.firebase.database.ref('Students').on('value', (allrecords) => {
      this.totalBoysStds = 0
      this.totalGirlsStds = 0
      this.totalStds = 0
      this.totalUnassignedStds = 0;
      allrecords.forEach(currRecord => {
        if (currRecord.child('gender').val() == "Male" ){
          this.totalBoysStds++;
        }
        else  {
          this.totalGirlsStds++;
        }
        if (currRecord.child('Driver').exists()) {
        }
        else {
          this.totalUnassignedStds++;
        }
        this.totalStds++
        
      });
      this.tStds = true;
      this.unassignedStds = true;
      this.tGirlsStds = true;
      this.tBoysStds = true;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(row:any){
    this.vanService.setStudentGender(row.gender);
    this.vanService.setStudentPhoneNo(row.phone_No);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "60%";
    this.dialog.open(AssignDriverToStudentComponent, dialogConfig);
  }

  deleteVan(row: any, rowid: number) {
    if(confirm('Are you sure to delete student '+row.fullName+" Permanently?\nThis operation cannot be undo.")){
      this.dataSource.data.splice(rowid, 1);
      this.dataSource._updateChangeSubscription(); // <-- Refresh the datasource
    }
  }

  checkAssignedDriver(phone: string) {
    let exists = false;
    this.firebase.database.ref('Students/' + phone).child('Driver').once('value', function (snapshot) {
      exists = snapshot.exists();
    })
    return exists;
  }

  unassignDriver(row: any) {
    let d = this.firebase.database.ref('Drivers/' + row.Driver);
    d.once('value', currDriver => {
      if (confirm('Are you sure to remove the driver ' + currDriver.child('fullName').val() + ' from the Student ' + row.fullName+"?")) {
        //let vanNo = this.vanService.getVanNo();
        this.firebase.database.ref('Students/' + row.phone_No + '/Driver').set(null);
        //alert( this.firebase.database.ref('Drivers/'+row.phone_No+'/Van'))
        this.firebase.database.ref('Drivers/' + row.Driver + '/students/'+row.phone_No).set(null);
        alert('Driver assignment has been revoked from the student ' + row.fullName)
      }
    })

  }

  openViewStudentTab(row: any) {
    this.vanService.setDriverPhoneNo(row.Driver);
    let driver = this.firebase.database.ref('Drivers/'+row.Driver);
    driver.once('value', (assignedDriver=>{
      if(assignedDriver.child('Van').exists()){
        this.vanService.setVanNo(assignedDriver.child('Van').val());
        this.router.navigate(["admin/studentdetails/viewassignedvantostudent"]);
        return;
      }
    }))
  }

  deleteStudent(row: any, rowid: number) {
    if (confirm('Are you sure to delete the Student ' + row.fullName +" Permanently?\nThis operation cannot be undo.")) {
      this.dataSource.data.splice(rowid, 1);
      this.dataSource._updateChangeSubscription();
      this.firebase.database.ref('Students/'+row.phone_No).remove() // <-- Refresh the datasource
      alert('Student ' + row.fullName +" has been deleted successfully");
    }
  }
}
