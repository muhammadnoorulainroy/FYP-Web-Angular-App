import * as $ from 'jquery'
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { VansService } from '../../firebase-service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { AssignVanToDriverComponent } from '../../assign-van-to-driver/assign-van-to-driver.component';
export interface Van {
  make: string;
  model: string;
  fuelType: string;
  capacity: string;
  for: string,
  assignedTo: string
}



@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  totalVans=0;
  totalBoysVans=0;
  totalGirlsVans=0;
  totalUnassignedVans=0;
  displayedColumns: string[] = ['make', 'model', 'year', 'vehicleNo', 'fuelType', 'capacity', 'stdCategory', 'ac', 'actions'];
 
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private vanService: VansService, 
    private firebase: AngularFireDatabase, 
    private router:Router, 
    private dialog: MatDialog) {}


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
    this.firebase.database.ref('Vans').on('value', (allrecords)=>{
      allrecords.forEach(currRecord=>{
        //alert('a');
        this.totalVans++
      });
    });
  
  }
    allVans = async ()=>{
    let v = 0;
    this.firebase.database.ref('Vans').on('value', (allrecords)=>{
      allrecords.forEach(currRecord=>{
        //alert('a');
       v++
      });
    });
    return v;
  }

  openDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "60%";
    this.dialog.open(AssignVanToDriverComponent, dialogConfig);
  }

  deleteTicket(row: any, rowid: number) {
    if(confirm('Are you sure to delete vehicle '+row.make+' ' + row.model+" "+row.year+" Permanently?\nThis operation cannot be undo.")){
      this.dataSource.data.splice(rowid, 1);
      this.dataSource._updateChangeSubscription(); // <-- Refresh the datasource
    }
  }

}

