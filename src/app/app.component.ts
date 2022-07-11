import { AfterViewInit, Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { ContactMeComponent } from './components/contact-me/contact-me.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()

export class AppComponent implements AfterViewInit {
  @ViewChild('aboutMeButton') aboutMeButton: any;
  @ViewChildren('aboutMeComponent') aboutMeComponent !: QueryList<AboutMeComponent>;
  @ViewChild('contactMeButton') contactMeButton: any;
  @ViewChildren('contactMeComponent') contactMeComponent !: QueryList<ContactMeComponent>;
  @ViewChild('introductionButton') projectsButton: any;
  @ViewChildren('introductionComponent') projectsComponent !: QueryList<ProjectsComponent>;
  @ViewChild('componentContainer') componentContainer: any;
  public headerVisible = false;

  constructor(private http: HttpClient){

  }

  public modules : {[key:string]:any} = {}
  public buttons : {[key:string]:any} = {}
  public visible : {[key:string]:boolean} = {contactMe : false, aboutMe : true, introduction : false}
  public initiated = false
  title = 'portfolio-fast';


  ngAfterViewInit(){

    this.modules = { aboutMe : this.aboutMeComponent.first, contactMe: undefined}
    this.buttons = { aboutMe : this.aboutMeButton, contactMe: this.contactMeButton}

    this.aboutMeComponent.changes.subscribe((comps: QueryList <any>) =>{
      this.modules.aboutMe = comps.first;});
    this.contactMeComponent.changes.subscribe((comps: QueryList <any>) =>{
      this.modules.contactMe = comps.first;});
  }

  click(element: string){
    const currentVisibleComponent = this.getVisibleComponent();
    this.modules[currentVisibleComponent].clickClose().then( (data : string) => {
      this.expandElement(element)
    })
  }

  expandElement(elementToExpand : string){
          this.visible[this.getVisibleComponent()] = false
          this.visible[elementToExpand] = true
    
  }

  getVisibleComponent() : string{
    const keys = Object.keys(this.visible);
    return keys.filter(key => this.visible[key])[0]
  }

  finishedIntro(){
    this.headerVisible = true;
  }
}
