import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-students-tab',
  templateUrl: './students-tab.component.html',
  styleUrls: ['./students-tab.component.css']
})
export class StudentsTabComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  navlinks = [
    {path: 'allstudents', label:'Student Dashboard'},
    {path: 'addstudent', label:'Add New Student'},
    // {path: 'assignvan', label:'Assign Driver'},
  ];
  // activeLink = this.links[0];
  background: ThemePalette = undefined;

}
