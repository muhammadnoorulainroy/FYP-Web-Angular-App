import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AssignDriverToStudentComponent } from '../assign-driver-to-student/assign-driver-to-student.component';
import { VansService } from '../firebase-service';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css']
})
export class AllStudentsComponent implements OnInit {

  displayedColumns: string[] = ['fullName', 'gender', 'dob', 'email', 'phone', 'homeAddr', 'schoolAddr', 'actions'];
 
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private vanService: VansService, 
    private firebase: AngularFireDatabase, 
    private dialog: MatDialog
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
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "60%";
    this.dialog.open(AssignDriverToStudentComponent, dialogConfig);
  }

  deleteTicket(row: any, rowid: number) {
    if(confirm('Are you sure to delete student '+row.fullName+" Permanently?\nThis operation cannot be undo.")){
      this.dataSource.data.splice(rowid, 1);
      this.dataSource._updateChangeSubscription(); // <-- Refresh the datasource
    }
  }
}
