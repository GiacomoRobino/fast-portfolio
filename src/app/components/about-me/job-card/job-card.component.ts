import { Component, Input, OnInit } from '@angular/core';
import { job } from './model';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css']
})
export class JobCardComponent implements OnInit {
  @Input() job!: job;

  constructor() { }

  ngOnInit(): void {
  }

}
