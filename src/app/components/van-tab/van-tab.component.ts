import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-van-tab',
  templateUrl: './van-tab.component.html',
  styleUrls: ['./van-tab.component.css']
})
export class VanTabComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  navlinks = [
    {path: 'allvans', label:'Van Dashboard'},
    {path: 'addvan', label:'Add New Van'},
    // {path: 'assignvan', label:'Assign Driver'},
  ];
  // activeLink = this.links[0];
  background: ThemePalette = undefined;

}
