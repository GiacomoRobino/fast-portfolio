import { Component, Input, ViewChild } from '@angular/core';
import { study } from './model';
import { gsap, Power4 } from 'gsap';

@Component({
  selector: 'app-study-card',
  templateUrl: './study-card.component.html',
  styleUrls: ['./study-card.component.css']
})
export class StudyCardComponent {
  @Input() study!: study;

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
