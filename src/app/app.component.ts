import {
  AfterViewInit,
  Component,
  forwardRef,
  HostListener,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { ContactMeComponent } from './components/contact-me/contact-me.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { Injectable } from '@angular/core';
import { AnimatedBorderButtonComponent } from './components/common-components/animated-border-button/animated-border-button.component';
import {
  BreakpointObserver, Breakpoints
} from '@angular/cdk/layout';
import { DeviceCheckService } from './services/device-check.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
@Injectable()
export class AppComponent implements AfterViewInit, OnInit {
  @ViewChildren('aboutMeComponent')
  aboutMeComponent!: QueryList<AboutMeComponent>;
  @ViewChildren('contactMeComponent')
  contactMeComponent!: QueryList<ContactMeComponent>;
  @ViewChild('introductionButton') projectsButton: any;
  @ViewChild('background') background: any;

  @ViewChildren('introductionComponent')
  projectsComponent!: QueryList<ProjectsComponent>;
  @ViewChild('componentContainer') componentContainer: any;
  @ViewChildren(forwardRef(() => AnimatedBorderButtonComponent))
  navigationButtonsBorders: QueryList<AnimatedBorderButtonComponent> = new QueryList();
  public headerVisible = false;
  public contactMeTextContext = { shownText: '', fullText: 'Contact me' };
  public aboutMeTextContext = { shownText: '', fullText: 'About me' };
  public textContexts: { [key: string]: any } = {
    contactMe: this.contactMeTextContext,
    aboutMe: this.aboutMeTextContext,
  };
  public navigationButtonTextContext = { shownText: '', fullText: '' };
  public downloadCvTextContext = { shownText: '', fullText: 'Download cv' };
  private timeToWrite = 1000.0;
  private specialCaractersMultipliers: { [key: string]: number } = {
    '.': 300.0,
    ',': 200.0,
    ':': 300.0
  };
  private interruptWriting = false;
  public startingParticles = 40;


  public modules: { [key: string]: any } = {};
  public buttons: { [key: string]: any } = {};
  public visible: { [key: string]: boolean } = {
    contactMe: false,
    aboutMe: true,
  };
  public initiated = false;
  public visibleComponent = 'aboutMe';
  title = 'portfolio';
  public buttonBlock = true;
  public colors = {
    introColor: '52, 91,235',
    aboutMe: '235, 88, 52',
    contactMe: '52, 235, 204',
  };
  public bgColor = this.colors.introColor;
  public linkRadius = 150;
  public isPhone = this.deviceCheckService.isPhone(true);

  constructor(private deviceCheckService: DeviceCheckService){}

  @HostListener('window:scroll', ['$event'])
  setBackground(event: any) {
    const newBgRadius = 150 - window.pageYOffset / 4;
    this.linkRadius = newBgRadius > 0 ? newBgRadius : 0;
    this.setParticles(this.startingParticles + window.pageYOffset / 2);
  }
  ngOnInit(){
    this.isPhone.subscribe(() => this.downloadCvTextContext.fullText = "Get CV")
  }

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
        this.navigationButtonsBorders.first
          .showBorder(1.3)
          .then(() => this.writeText(this.downloadCvTextContext))
          .then(() => this.navigationButtonsBorders.last.showBorder(1.2))
          .then(() => this.writeText(this.contactMeTextContext));
      }
    });
  }

  setParticles(particlesNumber: number) {
    this.background.setParticles(particlesNumber);
  }

  changePage() {
    this.switchColor();
    if (!this.buttonBlock) {
      this.buttonBlock = true;
      this.cancelText(this.textContexts[this.getNonVisibleComponent()]).then(
        () => {
          this.changeTextContext();
          const currentVisibleComponent = this.getVisibleComponent();
          this.modules[currentVisibleComponent]
            .clickClose()
            .then((data: string) => {
              this.buttonBlock = false;
              this.expandElement();
            });
        }
      );
    }
  }

  switchColor() {
    this.background.setParticlesProgressive(0).then(() => {
    if (this.bgColor == this.colors.aboutMe) {
      this.bgColor = this.colors.contactMe;
      this.linkRadius = 300;
    } else {
      this.bgColor = this.colors.aboutMe;
      this.linkRadius = 150;
    }
    this.background.setParticlesProgressive(this.startingParticles)
  }
    )
  }

  switchColorIntro() {
    this.background.setParticlesProgressive(0).then(() => {
      this.bgColor = this.colors.aboutMe;
    this.background.setParticlesProgressive(this.startingParticles)
  }
    )
  }

  download() {
    const link = document.createElement('a');
    link.setAttribute('type', 'hidden');
    link.href = 'assets/cv/Giacomo_Robino.pdf';
    link.download = 'Giacomo_Robino.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();

    this.cancelText(this.downloadCvTextContext).then(() => {
      this.downloadCvTextContext = {
        shownText: '',
        fullText: 'Cv Downloaded!',
      };
      this.writeText(this.downloadCvTextContext);
    });
  }

  changeTextContext() {
    this.navigationButtonTextContext =
      this.textContexts[this.getVisibleComponent()];
    this.writeText(this.textContexts[this.getVisibleComponent()]);
  }

  expandElement() {
    this.visible[this.getVisibleComponent()] = false;
    this.visible[this.getNonVisibleComponent()] = true;
    this.visibleComponent = this.getNonVisibleComponent();
  }

  getVisibleComponent() {
    return this.visibleComponent === 'aboutMe' ? 'aboutMe' : 'contactMe';
  }

  getNonVisibleComponent() {
    return this.visibleComponent === 'aboutMe' ? 'contactMe' : 'aboutMe';
  }

  finishedIntro() {
    this.switchColorIntro();
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
        this.buttonBlock = true
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
        this.buttonBlock = false
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
      if (textContext.shownText.length > 0 && !this.interruptWriting) {
        textContext.shownText = this.removeOneLetter(textContext.shownText);
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
