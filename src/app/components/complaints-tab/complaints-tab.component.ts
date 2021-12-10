import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-complaints-tab',
  templateUrl: './complaints-tab.component.html',
  styleUrls: ['./complaints-tab.component.css']
})
export class ComplaintsTabComponent implements OnInit {

  navlinks = [
    {path: 'allcomplaints', label:'Complaints Dashboard'},
    // {path: 'assignvan', label:'Assign Driver'},
  ];
  // activeLink = this.links[0];
  background: ThemePalette = undefined;
  
  
  constructor() { }

  ngOnInit(): void {
  }

}
