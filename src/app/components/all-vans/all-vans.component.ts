
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { VansService } from '../firebase-service';
import { AssignVanToDriverComponent } from '../assign-van-to-driver/assign-van-to-driver.component';

export interface Van {
  make: string;
  model: string;
  fuelType: string;
  capacity: string;
  for: string,
  assignedTo: string
}

export class Driver {
  fullName!: string
  phoneNo!: string
}

export interface Van {
  make: string;
  model: string;
  fuelType: string;
  capacity: string;
  for: string,
  assignedTo: string
}


@Component({
  selector: 'app-all-vans',
  templateUrl: './all-vans.component.html',
  styleUrls: ['./all-vans.component.css']
})




export class AllVansComponent implements OnInit {
  availableDrivers: Driver[] = [];
  totalVans = 0;
  totalBoysVans = 0;
  totalGirlsVans = 0;
  totalUnassignedVans = 0;
  tVans=false;
  tBoysVans=false;
  tGirlsVans = false;
  unassignedVans = false;
  driver: Driver = new Driver;
  displayedColumns: string[] = ['make', 'model', 'year', 'vehicleNo', 'fuelType', 'capacity', 'stdCategory', 'ac', 'actions'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private vanService: VansService,
    private firebase: AngularFireDatabase,
    private router: Router,
    private dialog: MatDialog) { }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.vanService.getVans().subscribe(
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
    this.firebase.database.ref('Vans').on('value', (allrecords) => {
      this.totalBoysVans = 0
      this.totalGirlsVans = 0
      this.totalVans = 0
      this.totalUnassignedVans = 0;
      allrecords.forEach(currRecord => {
        if (currRecord.child('stdCategory').val() === "Boys") {
          this.totalBoysVans++;
        }
        else {
          this.totalGirlsVans++;
        }
        if (currRecord.child('Driver').exists()) {
        }
        else {
          this.totalUnassignedVans++;
        }
        this.totalVans++
        
      });
      this.tVans = true;
      this.unassignedVans = true;
      this.tGirlsVans = true;
      this.tBoysVans = true;
    });

  }


  openDialog(row: any) {
    this.vanService.setVanNo(row.vehicleNo);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "60%";
    this.dialog.open(AssignVanToDriverComponent, dialogConfig);
  }

  deleteVan(row: any, rowid: number) {
    if (confirm('Are you sure to delete vehicle ' + row.make + ' ' + row.model + " " + row.year + " Permanently?\nThis operation cannot be undo.")) {
      this.dataSource.data.splice(rowid, 1);
      this.dataSource._updateChangeSubscription();
      this.firebase.database.ref('Vans/'+row.vehicleNo).remove() // <-- Refresh the datasource
      alert('Van '+ row.make + ' ' + row.model + " " + row.year + " has been deleted successfully")
    }
  }

  checkAssignedDriver(vanNo: string) {
    let exists = false;
    this.firebase.database.ref('Vans/' + vanNo).child('Driver').once('value', function (snapshot) {
      exists = snapshot.exists();
    })
    return exists;
  }

  openViewVanTab(row: any) {
    this.vanService.setDriverPhoneNo(row.Driver);
    this.vanService.setVanNo(row.vehicleNo);
    this.router.navigate(["admin/vandetails/viewvandetails"]);
  }

  unassignDriver(row: any) {
    let d = this.firebase.database.ref('Drivers/' + row.Driver);
    d.once('value', currDriver => {
      if (confirm('Are you sure to remove the driver ' + currDriver.child('fullName').val() + ' from ' + row.make + ' ' + row.model + ' ' + row.year)) {
        //let vanNo = this.vanService.getVanNo();
        this.firebase.database.ref('Vans/' + row.vehicleNo + '/Driver').set(null);
        //alert( this.firebase.database.ref('Drivers/'+row.phone_No+'/Van'))
        this.firebase.database.ref('Drivers/' + row.Driver + '/Van').set(null);
        alert('Driver ' + currDriver.child('fullName').val() + ' has been removed from ' + row.make + ' ' + row.model + ' ' + row.year)
      }
    })

  }

  getDriverName(driverPhoneNo: string) {
    let d = this.firebase.database.ref('Drivers/' + driverPhoneNo);
    d.on('value', currDriver => {
      this.driver.fullName = currDriver.child('fullName').val(),
        this.driver.phoneNo = currDriver.child('phone_No').val();
    })
  }
}
