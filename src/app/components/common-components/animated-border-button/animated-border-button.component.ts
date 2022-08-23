import {
  Component,
  Output,
  Input,
  EventEmitter,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-animated-border-button',
  templateUrl: './animated-border-button.component.html',
  styleUrls: ['./animated-border-button.component.scss'],
})
export class AnimatedBorderButtonComponent implements AfterViewInit {
  @Output() click = new EventEmitter();
  @ViewChild('rectangle') rectangle: any;
  @ViewChild('content') content: any;
  @Input('initTime') initTime = -1;

  ngAfterViewInit(){
    if(this.initTime > 0){
      this.showBorder(this.initTime);
    }
  }

  public showBorder(seconds: number) {
    return new Promise<void>((resolve) => {
      const tl = gsap.timeline();
      tl.to(this.rectangle.nativeElement, {
        duration: seconds,
        strokeOpacity: 1,
      }).then(() => resolve());
    });
  }
  
}
