import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VansService } from '../firebase-service';

@Component({
  selector: 'app-all-drivers',
  templateUrl: './all-drivers.component.html',
  styleUrls: ['./all-drivers.component.css']
})
export class AllDriversComponent implements OnInit {

  totalDrivers = 0;
  totalBoysDrivers = 0;
  totalGirlsDrivers = 0;
  totalUnassignedDrivers = 0;
  tDrivers=false;
  tBoysDrivers=false;
  tGirlsDrivers = false;
  unassignedDrivers = false;

  displayedColumns: string[] = ['fullName', 'gender','dob',  'homeAddr','email', 'phone', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private vanService: VansService, 
    private firebase: AngularFireDatabase, 
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.vanService.getDrivers().subscribe(
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
    this.firebase.database.ref('Drivers').on('value', (allrecords) => {
      this.totalBoysDrivers = 0
      this.totalGirlsDrivers = 0
      this.totalDrivers = 0
      this.totalUnassignedDrivers = 0;
      allrecords.forEach(currRecord => {
        if (!currRecord.child('Van').exists()) {
          this.totalUnassignedDrivers++;
        }
        else{
          let van = this.firebase.database.ref('Vans/'+currRecord.child('Van').val());
          van.once('value', (vanData)=>{
            if(vanData.child('stdCategory').val()=="Boys")
              this.totalBoysDrivers++;
            else
              this.totalGirlsDrivers++;
          })
        }
        this.totalDrivers++
      });
      setTimeout(()=>{
        this.tDrivers= true;
      this.unassignedDrivers= true;
      this.tGirlsDrivers = true;
      this.tBoysDrivers = true;
      },50)
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(){
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.width = "60%";
    //this.dialog.open(AssignDriverToStudentComponent, dialogConfig);
  }

  deleteTicket(row: any, rowid: number) {
    if(confirm('Are you sure to delete driver '+row.fullName+" Permanently?\nThis operation cannot be undo.")){
      this.dataSource.data.splice(rowid, 1);
      this.dataSource._updateChangeSubscription(); // <-- Refresh the datasource
    }
  }

  checkAssignedVanStudent(phone: string) {
    let exists = false;
    this.firebase.database.ref('Drivers/' + phone).child('Van').once('value', function (snapshot) {
      exists = snapshot.exists();
    })
    this.firebase.database.ref('Drivers/' + phone).child('students').once('value', function (snapshot) {
      exists = snapshot.exists();
    })
    return exists;
  }

  openViewStudentTab(row: any) {
    this.vanService.setDriverPhoneNo(row.Driver);
    let driver = this.firebase.database.ref('Drivers/'+row.Driver);
    driver.once('value', (assignedDriver=>{
      if(assignedDriver.child('Van').exists()){
        this.vanService.setVanNo(assignedDriver.child('Van').val());
       // this.router.navigate(["admin/studentdetails/viewassignedvantostudent"]);
        return;
      }
    }))
  }
}
