import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VansService } from '../firebase-service';
import { ComplaintFeedbackComponent } from './complaint-feedback/complaint-feedback.component';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-all-complaints',
  templateUrl: './all-complaints.component.html',
  styleUrls: ['./all-complaints.component.css']
})
export class AllComplaintsComponent implements OnInit {

  displayedColumns: string[] = ['title','description', 'date','status','actions'];
 
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private vanService: VansService, 
    private firebase: AngularFireDatabase, 
    private dialog: MatDialog,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.vanService.getComplaints().subscribe(
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
    this.dialog.open(ComplaintFeedbackComponent, dialogConfig);
  }

  deleteTicket(row: any, rowid: number) {
    if(confirm('Are you sure to delete complain '+row.fullName+" Permanently?\nThis operation cannot be undo.")){
      this.dataSource.data.splice(rowid, 1);
      this.dataSource._updateChangeSubscription(); // <-- Refresh the datasource
    }
  }

  open(content: any, row: any) {
    this.modalService.open(content, {
      centered:true
    });
    alert( document.getElementById('title'));
      document.getElementById('title')!.innerHTML = row.title;
      document.getElementById('desc')!.innerHTML = row.description;
      document.getElementById('datee')!.innerHTML = row.date;
      document.getElementById('status')!.innerHTML = row.status;
  }

  
}
