import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  openScrollableContent(longContent: any) {
    this.modalService.open(longContent, { scrollable: true });
  }

  ngOnInit(): void {
  let arrow = document.querySelectorAll(".arrow");
  for (var i = 0; i < arrow.length; i++) {
    
    arrow[i].addEventListener("click", (e)=>{
      var element = e.target as HTMLInputElement;
      let arrowParent = element?.parentElement?.parentElement;//selecting main parent of arrow
      arrowParent?.classList.toggle("showMenu");
    });
  }
  let sidebar = document.querySelector(".sidebar");
  let sidebarBtn = document.querySelector(".sideBarToggleBtn");
 // console.log(sidebarBtn);
  //sidebarBtn?.addEventListener("click", ()=>{
    //console.log(document.querySelector(".sidebarrr"));
   // document.querySelector(".sidebarrr")?.classList.toggle("sidebarrr")
    //sidebar?.classList.toggle("close");

  //});
  }

}
