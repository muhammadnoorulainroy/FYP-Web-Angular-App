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
    {path: 'viewassignedstudentstodriver', label:'Assigned Students'},
    {path: 'viewassignedvantodriver', label:'Assigned Van'},
  ];
  background: ThemePalette = undefined;


}
