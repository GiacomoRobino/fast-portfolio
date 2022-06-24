import { Component, Input, OnInit } from '@angular/core';
import { study } from './model';

@Component({
  selector: 'app-study-card',
  templateUrl: './study-card.component.html',
  styleUrls: ['./study-card.component.css']
})
export class StudyCardComponent implements OnInit {
  @Input() study!: study;
  
  constructor() { }

  ngOnInit(): void {
  }

}
