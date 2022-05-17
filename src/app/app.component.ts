import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { gsap, Power4 } from 'gsap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('aboutMe') aboutMeButton: any;
  @ViewChild('aboutMeComponent') aboutMeComponent: any;
  @ViewChild('contactMeButton') contactMeButton: any;
  @ViewChild('contactMeComponent') contactMeComponent: any;
  @ViewChild('introductionButton') introductionButton: any;
  @ViewChild('introductionComponent') introductionComponent: any;
  @ViewChild('componentContainer') componentContainer: any;

  public modules : {[key:string]:any} = {}
  public buttons : {[key:string]:any} = {}
  public visible : {[key:string]:boolean} = {contactMe : false, aboutMe : true, introduction : false}
  title = 'portfolio-fast';

  currentVisibleComponent = "introduction";


  ngAfterViewInit(){
    this.modules = { aboutMe : this.aboutMeComponent, contactMe: this.contactMeComponent, introduction: this.introductionComponent}
    this.buttons = { aboutMe : this.aboutMeButton, contactMe: this.contactMeButton, introduction: this.introductionButton}
  }


  click(element: string){
    this.modules[this.getVisibleComponent()].clickClose().then( (data : string) => {
      this.expandElement(element)
    })
  }

  expandElement(elementToExpand : string){
      let tl = gsap.timeline();
      tl.to(this.componentContainer.nativeElement, {duration: 0.5, height : 0 + "px", ease: Power4.easeOut})
        .to(this.componentContainer.nativeElement, {duration: 0.5, height : 500 + "px", ease: Power4.easeOut})
        .add(()=>{
          this.visible[this.getVisibleComponent()] = false
          this.visible[elementToExpand] = true})
  }

  getVisibleComponent() : string{
    let keys = Object.keys(this.visible);
    return keys.filter(key => this.visible[key])[0]
  }
}
