import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer-container.component.html',
  styleUrls: ['./footer-container.component.scss']
})
export class FooterComponent implements OnInit {
  public skills = [{name:"angular"},
  {name:"d3js"},
  {name:"typescript"},
  {name:"css3"},
  {name:"html"},
  {name:"greensock"},
  {name:"javascript"},
  {name:"github"}]

  constructor() { }

  ngOnInit(): void {
  }

}
