import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public complaints: any[] = [];

  constructor(private db: AngularFireDatabase, private modalService: NgbModal) {

  }

  // openScrollableContent(longContent: any) {
  //   this.modalService.open(longContent, { scrollable: true });
  // }
  
  ngOnInit() {
    this.readComplaint();
  }

  readComplaint() {
    let complaintsRef = this.db.database.ref('Complaints');
    //$('.complaint tbody').empty();
    complaintsRef.on('value', (allrecords) => {
     // $(".complaint .tbody").children().remove();
      if (allrecords.exists()) {
        //alert(complaintsRef);
        allrecords.forEach(currRecord => {
          currRecord.forEach(currUser => {
            this.complaints.push({
              title: currUser.child('title').val(),
              description: currUser.child('description').val(),
              userType: currUser.child("userClass").val(),

              phoneNo: currUser.child("userPhone_No").val(),
              date: currUser.child("date").val(),
              status: currUser.child("status").val(),
              fb: currUser.child("feedback").val(),
            });
            // alert(currUser.child('title').val());
          })
        });
      }
      else {

      }
    });

    // complaintsRef.child("Student +923124464000").child('Mb7iZLovQnKxhUqugpu').child('date').get().then((snapshot) => {
    //   if (snapshot.exists()) {
    //     alert(snapshot.val());
    //   } else {
    //     alert("No data available");
    //   }
    // }).catch((error) => {
    //   console.log(error.message);
    // });
  }
}

// //allrecords.forEach(currRecord => {
//   currRecord.forEach(currUser => {

//   })
// });