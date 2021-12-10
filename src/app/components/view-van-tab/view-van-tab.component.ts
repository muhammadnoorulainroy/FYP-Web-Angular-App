import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-view-van-tab',
  templateUrl: './view-van-tab.component.html',
  styleUrls: ['./view-van-tab.component.css']
})
export class ViewVanTabComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  navlinks = [
    {path: 'viewvandetails', label:'Van Details'},
    {path: 'viewassigneddrivertovan', label:'Assigned Driver'},
  ];
  background: ThemePalette = undefined;

}
