import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { gsap, Power4 } from 'gsap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('aboutMe') aboutMe: any;
  @ViewChild('contactMe') contactMe: any;
  title = 'portfolio-fast';

  ngAfterViewInit(){
    this.moveHeaderButton();
  }

  moveHeaderButton(){
    let tl = gsap.timeline();
    let t2 = gsap.timeline();
    tl.from(this.aboutMe.nativeElement, {duration: 1, y: -1000, ease: Power4.easeOut});
    t2.from(this.contactMe.nativeElement, {duration: 1, y: -1000, ease: Power4.easeOut});
  }
}
