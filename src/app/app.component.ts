import {
  AfterViewInit,
  Component,
  forwardRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { ContactMeComponent } from './components/contact-me/contact-me.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { gsap, Power4 } from 'gsap';
import { ThisReceiver } from '@angular/compiler';
import { AnimatedBorderButtonComponent } from './components/common-components/animated-border-button/animated-border-button.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
@Injectable()
export class AppComponent implements AfterViewInit {
  @ViewChild('aboutMeButton') aboutMeButton: any;
  @ViewChildren('aboutMeComponent')
  aboutMeComponent!: QueryList<AboutMeComponent>;
  @ViewChild('navigationButtonContainer') navigationButtonContainer: any;
  @ViewChildren('navigationButton') navigationButtonList!: QueryList<any>;
  @ViewChildren('contactMeComponent')
  contactMeComponent!: QueryList<ContactMeComponent>;
  @ViewChild('introductionButton') projectsButton: any;
  @ViewChildren('introductionComponent')
  projectsComponent!: QueryList<ProjectsComponent>;
  @ViewChild('componentContainer') componentContainer: any;
  @ViewChildren(forwardRef(()=>AnimatedBorderButtonComponent)) navigationButtonsBorders: QueryList<AnimatedBorderButtonComponent> = new QueryList();
  public headerVisible = false;
  public contactMeTextContext = { shownText: '', fullText: 'Contact me' };
  public aboutMeTextContext = { shownText: '', fullText: 'About me' };
  public textContexts: { [key: string]: any } = {"contactMe" : this.contactMeTextContext, "aboutMe" : this.aboutMeTextContext}
  public navigationButtonTextContext = { shownText: '', fullText: '' };
  public downloadCvTextContext = { shownText: '', fullText: 'Download cv' };
  private timeToWrite = 1000.0;
  private specialCaractersMultipliers: { [key: string]: number } = {
    '.': 500.0,
    ',': 200.0,
  };
  private interruptWriting = false;

  constructor(private http: HttpClient) {}

  public modules: { [key: string]: any } = {};
  public buttons: { [key: string]: any } = {};
  public visible: { [key: string]: boolean } = {
    contactMe: false,
    aboutMe: true
  };
  public initiated = false;
  public visibleComponent = "aboutMe"
  title = 'portfolio-fast';

  ngAfterViewInit() {
    this.navigationButtonTextContext = this.contactMeTextContext;
    this.modules = {
      aboutMe: this.aboutMeComponent.first,
      contactMe: undefined,
    };

    this.aboutMeComponent.changes.subscribe((comps: QueryList<any>) => {
      this.modules.aboutMe = comps.first;
    });
    this.contactMeComponent.changes.subscribe((comps: QueryList<any>) => {
      this.modules.contactMe = comps.first;
    });
    this.navigationButtonsBorders.changes.subscribe((comps: QueryList<any>) => {
      {
        this.navigationButtonsBorders.first.showBorder(1.3)
          .then(() => this.writeText(this.downloadCvTextContext))
          .then(() => this.navigationButtonsBorders.last.showBorder(1.2))
          .then(() => this.writeText(this.contactMeTextContext));
      }
    });
  }

  click() {
    this.cancelText(this.textContexts[this.getNonVisibleComponent()]).then(()=>{
    this.changeTextContext();
    const currentVisibleComponent = this.getVisibleComponent();
    this.modules[currentVisibleComponent].clickClose().then((data: string) => {
      this.expandElement();
    });
  })
  }

  changeTextContext() {
    this.navigationButtonTextContext = this.textContexts[this.getVisibleComponent()];
    this.writeText(this.textContexts[this.getVisibleComponent()]);
  }

  expandElement() {
    this.visible[this.getVisibleComponent()] = false;
    this.visible[this.getNonVisibleComponent()] = true;
    this.visibleComponent = this.getNonVisibleComponent();
  }

  getVisibleComponent(){
    return this.visibleComponent === "aboutMe"? "aboutMe" : "contactMe"
  }

  getNonVisibleComponent(){
    return this.visibleComponent === "aboutMe"? "contactMe" : "aboutMe" 
  }

  finishedIntro() {
    this.headerVisible = true;
  }

  writeText(textContext: any, timeToWrite = -1): any {
    return new Promise<void>((resolve, reject) => {
      if (timeToWrite === -1) {
        timeToWrite = this.timeToWrite / textContext.fullText.length;
        this.interruptWriting = false;
      }
      if (
        textContext.shownText.length < textContext.fullText.length &&
        !this.interruptWriting
      ) {
        textContext.shownText = this.addOneLetter(
          textContext.shownText,
          textContext.fullText
        );
        if (this.specialCaractersMultipliers[textContext.shownText.slice(-1)]) {
          timeToWrite =
            timeToWrite *
            this.specialCaractersMultipliers[textContext.shownText.slice(-1)];
        } else if (
          this.specialCaractersMultipliers[textContext.shownText.slice(-2, -1)]
        ) {
          timeToWrite =
            timeToWrite /
            this.specialCaractersMultipliers[
              textContext.shownText.slice(-2, -1)
            ];
        }
        setTimeout(() => {
          this.writeText(textContext, timeToWrite).then(resolve);
        }, timeToWrite);
      } else {
        resolve();
      }
    });
  }

  addOneLetter(destination: string, source: string) {
    return destination + source.charAt(destination.length);
  }

  
  cancelText(textContext: any, timeToWrite = -1): any {
    return new Promise<void>((resolve, reject) => {
      if (timeToWrite === -1) {
        timeToWrite = this.timeToWrite / textContext.fullText.length;
        this.interruptWriting = false;
      }
      if (
        textContext.shownText.length > 0 &&
        !this.interruptWriting
      ) {
        textContext.shownText = this.removeOneLetter(
          textContext.shownText
        );
        if (this.specialCaractersMultipliers[textContext.shownText.slice(-1)]) {
          timeToWrite =
            timeToWrite *
            this.specialCaractersMultipliers[textContext.shownText.slice(-1)];
        } else if (
          this.specialCaractersMultipliers[textContext.shownText.slice(-2, -1)]
        ) {
          timeToWrite =
            timeToWrite /
            this.specialCaractersMultipliers[
              textContext.shownText.slice(-2, -1)
            ];
        }
        setTimeout(() => {
          this.cancelText(textContext, timeToWrite).then(resolve);
        }, timeToWrite);
      } else {
        resolve();
      }
    });
  }

  removeOneLetter(text: string) {
    return text.slice(0, -1);
  }
}
