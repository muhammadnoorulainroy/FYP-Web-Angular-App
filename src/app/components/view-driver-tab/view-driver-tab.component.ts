import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-view-driver-tab',
  templateUrl: './view-driver-tab.component.html',
  styleUrls: ['./view-driver-tab.component.css']
})
export class ViewDriverTabComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  navlinks = [
    {path: 'viewassignedvantostudent', label:'Assigned Van'},
    {path: 'viewassigneddrivertostudent', label:'Assigned Driver'},
  ];
  background: ThemePalette = undefined;


}
