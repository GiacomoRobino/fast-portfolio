import {
  Component,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { JobCardComponent } from './job-card/job-card.component';
import { forwardRef } from '@angular/core';
import jobsConfig from '../../../assets/carreer/companies/companies.json';
import studiesConfig from '../../../assets/carreer/studies/studies.json';
import { job } from './job-card/model';
import { study } from './study-card/model';
import { gsap } from 'gsap';
import { StudyCardComponent } from './study-card/study-card.component';
import { AnimatedBorderButtonComponent } from '../common-components/animated-border-button/animated-border-button.component';
@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
})
export class AboutMeComponent implements OnInit {
  @Input() initiated = false;
  @Output() finishedIntro: EventEmitter<any> = new EventEmitter();
  @Output() initiatedChange: EventEmitter<any> = new EventEmitter();
  @ViewChildren(forwardRef(() => JobCardComponent))
  jobCards: QueryList<JobCardComponent> = new QueryList();
  @ViewChildren(forwardRef(() => StudyCardComponent))
  studyCards: QueryList<StudyCardComponent> = new QueryList();
  @ViewChildren(forwardRef(() => AnimatedBorderButtonComponent))
  jobsHeader: QueryList<AnimatedBorderButtonComponent> = new QueryList();
  @ViewChildren('studiesHeader') studiesHeader: any = new QueryList();
  @ViewChildren('jobsHeaderText') jobsHeaderText: any = new QueryList();
  @ViewChild('mainText') mainText: any;
  @ViewChild('mainContainer') mainContainer: any;
  @ViewChildren('jobDescription')
  jobDescription: any = new QueryList();

  public shownJob = { name: '', description: '' };
  private httpClient: HttpClient;
  private opened = false;
  private fullText = '';
  public shownText = '';
  private timeToWrite = 400.0;
  private interruptWriting = false;
  private specialCaractersMultipliers: { [key: string]: number } = {
    '.': 500.0,
    ',': 200.0,
  };
  public jobs: job[] = jobsConfig;
  public studies: study[] = studiesConfig;
  public mainTextVisible = true;

  constructor(http: HttpClient) {
    this.httpClient = http;
  }

  ngOnInit(): void {
    this.httpClient
      .get('assets/copywrite/presentation.txt', { responseType: 'text' })
      .subscribe((data) => {
        if (this.initiated) {
          this.returnToPageAnimation();
        } else {
          this.initiated = true;
          this.initiatedChange.emit(true);
          this.fullText = data;
          this.writeText().then(() => {
            const tl = gsap.timeline();
            tl.to(this.mainText.nativeElement, {
              duration: 1,
              color: 'transparent',
            }).then(() => {
              this.mainTextVisible = false;
              this.finishedIntro.emit();
              this.animateJobs(1000);
            });
          });
        }
      });
  }

  clickOpen() {
    this.opened = !this.opened;
  }

  clickClose() {
    return new Promise((resolve, reject) => {
      console.log('close about me');
      this.collapseText();
      const tl = gsap.timeline();
      tl.to(this.mainContainer.nativeElement, {
        duration: 1,
        opacity: 0,
      }).then(() => {
        resolve('foo');
      });
    });
  }

  writeText(timeToWrite = -1): any {
    return new Promise<void>((resolve, reject) => {
      if (timeToWrite === -1) {
        timeToWrite = this.timeToWrite / this.fullText.length;
        this.interruptWriting = false;
      }
      if (
        this.shownText.length < this.fullText.length &&
        !this.interruptWriting
      ) {
        this.shownText = this.addOneLetter(this.shownText, this.fullText);
        if (this.specialCaractersMultipliers[this.shownText.slice(-1)]) {
          timeToWrite =
            timeToWrite *
            this.specialCaractersMultipliers[this.shownText.slice(-1)];
        } else if (
          this.specialCaractersMultipliers[this.shownText.slice(-2, -1)]
        ) {
          timeToWrite =
            timeToWrite /
            this.specialCaractersMultipliers[this.shownText.slice(-2, -1)];
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

  collapseText() {
    this.shownText = '';
    this.interruptWriting = true;
  }

  removeLastLetter(s: string) {
    return s.substring(0, s.length - 1);
  }

  animateJobs(timer: number) {
    return new Promise((resolve, reject) => {
      const tl = gsap.timeline();
      setTimeout(() => {
        this.jobsHeader.first
          .showBorder(1)
          .then(() =>
            tl.to(this.jobsHeaderText.first.nativeElement, {
              duration: 1,
              color: 'white',
            })
          )
          .then(() =>
            this.jobsHeader.last.showBorder(1).then(() => {
              tl.to(this.jobsHeaderText.last.nativeElement, {
                duration: 1,
                color: 'white',
              });
            })
          )
          .then(() => this.animateJobCards())
          .then(() => this.animateStudyCards());
      }, timer);
    });
  }

  animateJobCards() {
    return new Promise((resolve, reject) => {
      const waitPromiseList = this.jobCards.map((card, index) =>
        card.showImage(index)
      );
      this.assignJobsPreviewFunctions();
      Promise.all(waitPromiseList).then(resolve);
    });
  }

  animateStudyCards() {
    const waitPromiseList = this.studyCards.map((card, index) =>
      card.showImage(index)
    );
    Promise.all(waitPromiseList).then();
  }

  returnToPageAnimation() {
    this.mainTextVisible = false;
    this.animateJobs(0);
  }

  showJob(job: any) {
    console.log('waiting');
  }

  hideJob() {
    this.setJobDescriptionColor('transparent');
  }

  setJobDescriptionColor(color: string) {
    this.jobDescription._results.forEach((element: any, index: number) => {
      const duration = 0.8 * (2 - index);
      console.log(duration);
      const tl = gsap.timeline();
      tl.to(element.nativeElement, {
        duration,
        color: color,
      });
    });
  }

  assignJobsPreviewFunctions() {
    this.showJob = (job) => {
      this.setJobDescriptionColor('white');
      this.shownJob = { name: job.name, description: job.description };
    };
  }
}
