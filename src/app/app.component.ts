import {
  AfterViewInit,
  Component,
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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
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
  public headerVisible = false;
  public contactMeTextContext = { shownText: '', fullText: 'Contact me' };
  public aboutMeTextContext = { shownText: '', fullText: 'About me' };
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
    aboutMe: true,
    introduction: false,
  };
  public initiated = false;
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
    this.navigationButtonList.changes.subscribe((comps: QueryList<any>) => {
      {
        const tl = gsap.timeline();
        tl.to(comps.first.nativeElement, {
          duration: 2,
          borderColor: 'white',
        })
          .then(() => this.writeText(this.downloadCvTextContext))
          .then(() => {
            tl.to(comps.last.nativeElement, {
              duration: 2,
              borderColor: 'white',
            });
          })
          .then(() => this.writeText(this.contactMeTextContext));
      }
    });
  }

  click(element: string) {
    this.changeTextContext('aboutMe', 'contactMe');
    const currentVisibleComponent = this.getVisibleComponent();
    this.modules[currentVisibleComponent].clickClose().then((data: string) => {
      this.expandElement(element);
    });
  }

  changeTextContext(a: any, b: any) {
    this.navigationButtonTextContext = this.aboutMeTextContext;
    this.writeText(this.aboutMeTextContext);
  }

  expandElement(elementToExpand: string) {
    this.visible[this.getVisibleComponent()] = false;
    this.visible[elementToExpand] = true;
  }

  getVisibleComponent(): string {
    const keys = Object.keys(this.visible);
    return keys.filter((key) => this.visible[key])[0];
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
}
