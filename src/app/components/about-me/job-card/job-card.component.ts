import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { job } from './model';
import { gsap, Power4 } from 'gsap';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss'],
})
export class JobCardComponent {
  @Input() job!: job;
  @Output() updateJob = new EventEmitter();
  @Output() leaveJob = new EventEmitter();
  @ViewChild('image') image: any;

  showImage(index: number) {
    return new Promise<any>((resolve) => {
      setTimeout(() => {
        const tl = gsap.timeline();
        tl.to(this.image.nativeElement, {
          duration: 0.8,
          opacity: 1,
          ease: Power4.easeIn,
        }).then(resolve);
      }, index * 800);
    });
  }

  showJob(){
    console.log("ok");
    this.updateJob.emit(this.job);
  }

  hideJob(){
    console.log("ok");
    this.leaveJob.emit();
  }
}
