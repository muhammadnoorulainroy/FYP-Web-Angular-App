import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VansService } from '../firebase-service';

export interface Van {
  make: string;
  model: string;
  fuelType: string;
  capacity: string;
  for: string,
  assignedTo: string
}


@Component({
  selector: 'app-assign-van-to-driver',
  templateUrl: './assign-van-to-driver.component.html',
  styleUrls: ['./assign-van-to-driver.component.css']
})
export class AssignVanToDriverComponent implements OnInit {

  displayedColumns: string[] = ['fullName', 'phone_no', 'Action'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private firebase: AngularFireDatabase, private vanService: VansService) { }

  
  ngOnInit(): void {
    this.vanService.getAvailableDrivers(); 
    console.log(this.vanService.availableDriverss);
    this.dataSource = new MatTableDataSource(this.vanService.availableDriverss);
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

  deleteTicket(row: any, rowid: number) {
    if(confirm('Are you sure to assign the van to '+row.fullName+' ?')){
      let vanNo = this.vanService.getVanNo();
      this.firebase.database.ref('Vans/'+vanNo).update({Driver:row.phone_No});
      this.firebase.database.ref('Drivers/'+row.phone_No).update({Van:vanNo});
      this.dataSource.data.splice(rowid, 1);
      this.dataSource._updateChangeSubscription(); // <-- Refresh the datasource
      alert('Driver Assigned Successfully')
    }
    //const index = this.dataSource.data.indexOf(item.id);
  }
  


}
