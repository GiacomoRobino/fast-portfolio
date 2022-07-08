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
    return new Promise<any>((resolve) => {
    setTimeout(() => {
      const tl = gsap.timeline();
      tl.to(this.image.nativeElement, {duration: 1, width: "50px", height: "50px", ease: Power4.easeOut}).then(resolve);  
    }, index * 1200);
  }
  )
}
}
