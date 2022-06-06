import { AfterViewInit, Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { gsap, Power4 } from 'gsap';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { ContactMeComponent } from './components/contact-me/contact-me.component';
import { ProjectsComponent } from './components/projects/projects.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('aboutMeButton') aboutMeButton: any;
  @ViewChildren('aboutMeComponent') aboutMeComponent !: QueryList<AboutMeComponent>;
  @ViewChild('contactMeButton') contactMeButton: any;
  @ViewChildren('contactMeComponent') contactMeComponent !: QueryList<ContactMeComponent>;
  @ViewChild('introductionButton') projectsButton: any;
  @ViewChildren('introductionComponent') projectsComponent !: QueryList<ProjectsComponent>;
  @ViewChild('componentContainer') componentContainer: any;

  public modules : {[key:string]:any} = {}
  public buttons : {[key:string]:any} = {}
  public visible : {[key:string]:boolean} = {contactMe : false, aboutMe : true, introduction : false}
  title = 'portfolio-fast';


  ngAfterViewInit(){
    this.modules = { aboutMe : this.aboutMeComponent.first, contactMe: undefined, projects: undefined}
    this.buttons = { aboutMe : this.aboutMeButton, contactMe: this.contactMeButton, projects: this.projectsButton}

    this.aboutMeComponent.changes.subscribe((comps: QueryList <any>) =>{
      this.modules.aboutMe = comps.first;});
    this.contactMeComponent.changes.subscribe((comps: QueryList <any>) =>{
      this.modules.contactMe = comps.first;});
    this.projectsComponent.changes.subscribe((comps: QueryList <any>) =>{
      this.modules.introduction = comps.first;});
  }

  click(element: string){
    let currentVisibleComponent = this.getVisibleComponent();
    this.modules[currentVisibleComponent].clickClose().then( (data : string) => {
      this.expandElement(element)
    })
  }

  expandElement(elementToExpand : string){
      let tl = gsap.timeline();
      tl.to(this.componentContainer.nativeElement, {duration: 0.5, height : 0 + "px", ease: Power4.easeOut})
        .to(this.componentContainer.nativeElement, {duration: 0.5, height : 500 + "px", ease: Power4.easeOut})
        .add(()=>{
          this.visible[this.getVisibleComponent()] = false
          this.visible[elementToExpand] = true
        }
        )
  }

  getVisibleComponent() : string{
    let keys = Object.keys(this.visible);
    return keys.filter(key => this.visible[key])[0]
  }
}
