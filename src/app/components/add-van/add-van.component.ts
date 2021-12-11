import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

export class Van {
  constructor(
      public vehicleNo?: string,
      public model?: string,
      public capacity?: Number,
      public ac?: boolean,
      public make?: string,
      public fuelType?: string,
      public year?: string,
      public stdCategory?:string,
  ) { }

}
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

interface SelectOptions {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-add-van',
  templateUrl: './add-van.component.html',
  styleUrls: ['./add-van.component.css']
})
export class AddVanComponent implements OnInit {

  fuelTypes: SelectOptions[] = [
    {value: 'Petrol', viewValue: 'Petrol'},
    {value: 'Diesel', viewValue: 'Diesel'},
    {value: 'CNG/LNG/LPG', viewValue: 'CNG/LNG/LPG'},
  ];

  airCond: SelectOptions[]=[
    {value: 'Yes', viewValue: 'Yes'},
    {value: 'No', viewValue: 'No'},
  ];

  stdCategories: SelectOptions[]=[
    {value: 'Boys', viewValue: 'Boys'},
    {value: 'Girls', viewValue: 'Girls'},
  ];
  
  vans:Van = new Van;
  make = new FormControl('', [Validators.required,Validators.maxLength(30),Validators.pattern('^[a-zA-Z ]*$')]);
  model = new FormControl('', [Validators.required,Validators.maxLength(30),Validators.pattern('^([A-Za-z0-9]{0,})$')]);
  year = new FormControl('', [Validators.required,Validators.max(2022),Validators.min(2000)]);
  vehicleNo =  new FormControl('', [Validators.required,Validators.maxLength(8),Validators.pattern('^([A-Za-z0-9]{0,})$')]);
  sittingCapacity = new FormControl('', [Validators.required,Validators.max(80),Validators.min(0)]);
  selectionItems =  new FormControl('', [Validators.required]);
  selectionItems2 =  new FormControl('', [Validators.required]);
  selectionItems3 =  new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();
  constructor(private firebase: AngularFireDatabase, private modalService: NgbModal) { }


  closeResult = '';

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit(): void {
  }
  @ViewChild('content') content: any;

  createVan(){
    //alert(this.vans.ac);
    let van= this.firebase.database.ref('Vans').child(this.vans.vehicleNo!);
    alert(this.firebase.database.ref('Vans').child(this.vans.vehicleNo!));
    van.once('value', (existingVan)=>{
      if(existingVan.exists())
        alert("Van "+ this.vans.vehicleNo + " already exists");
      else{
        van.set(this.vans);
        alert('Van '+ this.vans.make+ " " +this.vans.model+" "+this.vans.year+' has been Added Successfully');
      }
    }).catch(err=>{
      alert(err.message);
    })
    // this.firebase.database.ref('Vans').child(this.vans.vehicleNo!).set(this.vans);
    // // if(this.content){
    // //   this.content.open();
    // // }
    // alert('Van has been Added Successfully');
  }


}
