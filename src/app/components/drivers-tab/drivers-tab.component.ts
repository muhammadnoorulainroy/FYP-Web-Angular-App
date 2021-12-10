import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-drivers-tab',
  templateUrl: './drivers-tab.component.html',
  styleUrls: ['./drivers-tab.component.css']
})
export class DriversTabComponent implements OnInit {

  constructor() { }

  navlinks = [
    {path: 'alldrivers', label:'Driver Dashboard'},
    {path: 'adddriver', label:'Add New Driver'},
    // {path: 'assignvan', label:'Assign Driver'},
  ];
  // activeLink = this.links[0];
  background: ThemePalette = undefined;
  
  ngOnInit(): void {
  }

}
