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
  @ViewChild('introductionButton') introductionButton: any;
  @ViewChild(IntroductionComponent, {static: false}) private introductionComponent: any;
  title = 'portfolio-fast';
  expand = false;

  introductionVisible = true;
  contactMeVisible = false;
  aboutMeVisible = false;

  currentVisibleComponent = "introduction";


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
      let tl = gsap.timeline();
      tl.to(this.introduction.nativeElement, {duration: 0.5, height : 0 + "px", ease: Power4.easeOut})
    .add( ()=>{this.currentVisibleComponent = "contactMe"} )
    .to(this.introduction.nativeElement, {duration: 0.5, height : 500  + "px", ease: Power4.easeOut});
  }

  expandAboutMe(){
    let tl = gsap.timeline();
    tl.to(this.introduction.nativeElement, {duration: 0.5, height : 0 + "px", ease: Power4.easeOut})
    .add( ()=>{this.currentVisibleComponent = "aboutMe"} )
    .to(this.introduction.nativeElement, {duration: 0.5, height : 500 + "px", ease: Power4.easeOut});

  }

  
  expandIntroduction(){
    let tl = gsap.timeline();
    tl.to(this.introduction.nativeElement, {duration: 0.5, height : 0 + "px", ease: Power4.easeOut})
    .add( ()=>{this.currentVisibleComponent = "introduction"} )
    .to(this.introduction.nativeElement, {duration: 0.5, height : 500 + "px", ease: Power4.easeOut});
    this.introductionComponent.writeText();
  }

}
