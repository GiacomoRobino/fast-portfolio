import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { gsap, Power4 } from 'gsap';
import { IntroductionComponent } from './components/introduction/introduction.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('aboutMe') aboutMe: any;
  @ViewChild('contactMe') contactMe: any;
  @ViewChild('introduction') introduction: any;
  @ViewChild(IntroductionComponent, {static: false}) private introductionComponent: any;
  title = 'portfolio-fast';
  expand = false;

  introductionVisible = true;
  contactMeVisible = false;

  ngAfterViewInit(){
    this.moveHeaderButton();
  }

  moveHeaderButton(){
    let tl = gsap.timeline();
    let t2 = gsap.timeline();
    tl.from(this.aboutMe.nativeElement, {duration: 1, y: -1000, ease: Power4.easeOut});
    t2.from(this.contactMe.nativeElement, {duration: 1, y: -1000, ease: Power4.easeOut});
  }

  expandContactMe(){
    this.expand = !this.expand;
    let tl = gsap.timeline();
    if(this.expand){
      this.introductionComponent.collapseText();
    }
    else{
      this.introductionComponent.writeText();
    }
    tl.to(this.introduction.nativeElement, {duration: 1, height : (this.expand? 0 : 500) + "px", ease: Power4.easeOut})
    .add( ()=>{ this.introductionVisible = false; this.contactMeVisible = true} )
    .to(this.introduction.nativeElement, {duration: 1, height : (this.expand? 500 : 0) + "px", ease: Power4.easeOut});

  }
}
