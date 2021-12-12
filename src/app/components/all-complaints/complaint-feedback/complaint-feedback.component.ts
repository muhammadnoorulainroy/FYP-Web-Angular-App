import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { VansService } from '../../firebase-service';

export class Complaint {
  constructor
      (
          public date: string = "",
          public title: string = "",
          public description: string = "",
          public status: string = "",
          public feedback: string = "",
          public userClass:string="",
          public userPhone_No:string="",
          public filedBy:string=""
  ) { }
}

interface SelectOptions {
  value: string;
  viewValue: string;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-complaint-feedback',
  templateUrl: './complaint-feedback.component.html',
  styleUrls: ['./complaint-feedback.component.css']
})
export class ComplaintFeedbackComponent implements OnInit {

  gender: SelectOptions[]=[
    {value: 'Pending', viewValue: 'Pending'},
    {value: 'In Progress', viewValue: 'In Progress'},
    {value: 'Resolved', viewValue: 'Resolved'},
    {value: 'Rejected', viewValue: 'Rejected'},
  ];
  matcher = new MyErrorStateMatcher();
  selectionItems =  new FormControl('', [Validators.required]);

  complaintDetails:Complaint = new Complaint
  
  
  constructor(private vanService: VansService, 
    private firebase: AngularFireDatabase, ) { }

  ngOnInit(): void {
    this.getCompDetails()
  }

  getCompDetails(){
    let complaint = this.vanService.getComplaintDetails();
    this.complaintDetails.date = complaint.date;
    this.complaintDetails.description = complaint.description
    this.complaintDetails.feedback = complaint.feedback
    this.complaintDetails.status = complaint.status
    this.complaintDetails.title = complaint.title
    this.complaintDetails.userClass = complaint.userClass
    this.complaintDetails.userPhone_No = complaint.userPhone_No;

    if(complaint.userClass=="Student"){
      let std = this.firebase.database.ref('Students/'+complaint.userPhone_No);
      std.once('value', (student)=>{
        this.complaintDetails.filedBy = student.child('fullName').val();
      })
    }
    else if(complaint.userClass=="Driver"){
      let drv = this.firebase.database.ref('Drivers/'+complaint.userPhone_No);
      drv.once('value', (driver)=>{
        this.complaintDetails.filedBy = driver.child('fullName').val();
      })
    }
    else if(complaint.userClass=="Parent"){
      let prnt = this.firebase.database.ref('Parents/'+complaint.userPhone_No);
      prnt.once('value', (parent)=>{
        this.complaintDetails.filedBy = parent.child('fullName').val();
      })
    }
  }

  updateComplaint(){

      let complaint = this.firebase.database.ref('Complaints/'+this.complaintDetails.userClass+" "+this.complaintDetails.userPhone_No);
      complaint.once('value',(complaints)=>{
       complaints.forEach(currComplaint=>{
         if(currComplaint.child('description').val()==this.complaintDetails.description){
           let node = this.firebase.database.ref('Complaints/'+this.complaintDetails.userClass+" "+this.complaintDetails.userPhone_No+"/"+currComplaint.key);
           node.update({
             feedback: this.complaintDetails.feedback,
             status: this.complaintDetails.status
           });
           alert('Complaint Status Updated')
           return;
         }
       })
      })
  }
}
