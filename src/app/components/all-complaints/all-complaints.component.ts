import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VansService } from '../firebase-service';
import { ComplaintFeedbackComponent } from './complaint-feedback/complaint-feedback.component';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Complaint } from 'src/app/DataModel';
import { ComplaintsTabComponent } from '../complaints-tab/complaints-tab.component';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-all-complaints',
  templateUrl: './all-complaints.component.html',
  styleUrls: ['./all-complaints.component.css']
})
export class AllComplaintsComponent implements OnInit {

  displayedColumns: string[] = ['title','description', 'date','status','actions'];
  dataSource!: MatTableDataSource<any>;

  complaints:Complaint[] = []
  totalComplaint=0;
  stdsComplaints=0;
  driversComplaints=0;
  parentsComplaints=0;
  resolved=0;
  rejected=0;
  pending=0;
  inprog=0;

  totlComp=false;
    stdsComp=false;
    drvComp=false;
    prntComp=false;
    resComp=false
    pend=false;
    rejComp=false;
    inPrg=false;


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
    this.getComplaintsStats();

    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(row:any){
    this.vanService.setUserPhoneNo(row.userPhone_No);
    this.vanService.setComplaintDetails(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "40%";
    dialogConfig.maxHeight= '90vh'
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

  getComplaintsStats(){
    this.complaints.splice(0,this.complaints.length)
    this.totalComplaint=0;
    this.stdsComplaints=0;
    this.driversComplaints=0;
    this.parentsComplaints=0;
    this.resolved=0;
    this.rejected=0;
    this.pending=0;
    this.inprog=0;
    let complaints = this.firebase.database.ref('Complaints')
    complaints.on('value', (allComplaints)=>{
      //alert(allComplaints.key)
      allComplaints.forEach(subRecords=>{
        subRecords.forEach(currRecord=>{
          let comp:Complaint = new Complaint;
          comp.title =  currRecord.child('title').val();
          comp.description = currRecord.child('description').val();
          comp.date = currRecord.child('date').val();
          comp.feedback = currRecord.child('feedback').val();
          comp.status = currRecord.child('status').val()
          comp.userClass = currRecord.child('userClass').val();
          comp.userPhone_No = currRecord.child('userPhone_No').val();
          this.totalComplaint++;
          if(comp.status=="Resolved")
            this.resolved++
          else if(comp.status=="In Progress")
            this.inprog++
          else if(comp.status=="Pending")
            this.pending++
          else if(comp.status=="Rejected")
            this.rejected++
          if(comp.userClass=="Student")
            this.stdsComplaints++
          else if(comp.userClass="Driver")
            this.driversComplaints++
          else if(comp.userClass=="Parent")
            this.parentsComplaints++;
        })
      })
      this.totlComp=true;
      this.stdsComp=true
      this.drvComp=true
      this.prntComp=true
      this.resComp=true
      this.pend=true
      this.rejComp=true
      this.inPrg=true
    })
  } 
}
