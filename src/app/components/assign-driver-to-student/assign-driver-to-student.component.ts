import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VansService } from '../firebase-service';

@Component({
  selector: 'app-assign-driver-to-student',
  templateUrl: './assign-driver-to-student.component.html',
  styleUrls: ['./assign-driver-to-student.component.css']
})
export class AssignDriverToStudentComponent implements OnInit {

  displayedColumns: string[] = ['fullName', 'phone_no', 'Action'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private vanService: VansService) { }

  ngOnInit(): void {
    this.vanService.getAvailableDrivers(); 
    console.log(this.vanService.availableDriverss);
    this.dataSource = new MatTableDataSource(this.vanService.availableDriverss);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deleteTicket(row: any, rowid: number) {
    if(confirm('Are you sure to assign the student to '+row.fullName+' ?')){
      this.dataSource.data.splice(rowid, 1);
      this.dataSource._updateChangeSubscription(); // <-- Refresh the datasource
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
