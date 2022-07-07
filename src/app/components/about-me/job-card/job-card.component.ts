import { Component, Input, ViewChild } from '@angular/core';
import { job } from './model';
import { gsap, Power4 } from 'gsap';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css']
})
export class JobCardComponent {
  @Input() job!: job;
  @ViewChild("image") image: any;
  
  showImage(index : number){
    setTimeout(() => {
      const tl = gsap.timeline();
      tl.to(this.image.nativeElement, {duration: 3, width: "50px", height: "50px", ease: Power4.easeOut});  
    }, index * 1500);
  }
}
