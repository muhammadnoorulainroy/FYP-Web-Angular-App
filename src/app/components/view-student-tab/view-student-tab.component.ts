import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-view-student-tab',
  templateUrl: './view-student-tab.component.html',
  styleUrls: ['./view-student-tab.component.css']
})
export class ViewStudentTabComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  navlinks = [
    {path: 'viewassignedvantostudent', label:'Assigned Van'},
    {path: 'viewassigneddrivertostudent', label:'Assigned Driver'},
  ];
  background: ThemePalette = undefined;

}
