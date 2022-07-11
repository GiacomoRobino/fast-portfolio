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
  @ViewChild('contactMeButtonContainer') contactMeButtonContainer: any;
  @ViewChildren('contactMeButton') contactMeButtonList!: QueryList<any>;
  @ViewChildren('contactMeComponent')
  contactMeComponent!: QueryList<ContactMeComponent>;
  @ViewChild('introductionButton') projectsButton: any;
  @ViewChildren('introductionComponent')
  projectsComponent!: QueryList<ProjectsComponent>;
  @ViewChild('componentContainer') componentContainer: any;
  public headerVisible = false;
  public contactMeButtonText = '';
  public fullText = 'Contact Me';
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
    this.modules = {
      aboutMe: this.aboutMeComponent.first,
      contactMe: undefined,
    };
    this.buttons = {
      aboutMe: this.aboutMeButton
    };

    this.aboutMeComponent.changes.subscribe((comps: QueryList<any>) => {
      this.modules.aboutMe = comps.first;
    });
    this.contactMeComponent.changes.subscribe((comps: QueryList<any>) => {
      this.modules.contactMe = comps.first;
    });
    this.contactMeButtonList.changes.subscribe((comps: QueryList<any>) => {
      {
        const tl = gsap.timeline();
        tl.to(comps.first.nativeElement, {
          duration: 2,
          borderColor: 'white',
        }).then(() => this.writeText());
      }
    });
  }

  click(element: string) {
    const currentVisibleComponent = this.getVisibleComponent();
    this.modules[currentVisibleComponent].clickClose().then((data: string) => {
      this.expandElement(element);
    });
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

  writeText(timeToWrite = -1): any {
    return new Promise<void>((resolve, reject) => {
      if (timeToWrite === -1) {
        timeToWrite = this.timeToWrite / this.fullText.length;
        this.interruptWriting = false;
      }
      if (
        this.contactMeButtonText.length < this.fullText.length &&
        !this.interruptWriting
      ) {
        this.contactMeButtonText = this.addOneLetter(
          this.contactMeButtonText,
          this.fullText
        );
        if (
          this.specialCaractersMultipliers[this.contactMeButtonText.slice(-1)]
        ) {
          timeToWrite =
            timeToWrite *
            this.specialCaractersMultipliers[
              this.contactMeButtonText.slice(-1)
            ];
        } else if (
          this.specialCaractersMultipliers[
            this.contactMeButtonText.slice(-2, -1)
          ]
        ) {
          timeToWrite =
            timeToWrite /
            this.specialCaractersMultipliers[
              this.contactMeButtonText.slice(-2, -1)
            ];
        }
        setTimeout(() => {
          this.writeText(timeToWrite).then(resolve);
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
