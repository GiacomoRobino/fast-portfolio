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
import { gsap, Power4 } from 'gsap';
import { StudyCardComponent } from './study-card/study-card.component';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css'],
})
export class AboutMeComponent implements OnInit {
  @Input() initiated = false;
  @Output() finishedIntro: EventEmitter<any> = new EventEmitter();
  @Output() initiatedChange: EventEmitter<any> = new EventEmitter();
  @ViewChildren(forwardRef(() => JobCardComponent))
  jobCards: QueryList<JobCardComponent> = new QueryList();
  @ViewChildren(forwardRef(() => StudyCardComponent))
  studyCards: QueryList<StudyCardComponent> = new QueryList();
  @ViewChildren('jobsHeader') jobsHeader: any = new QueryList();;
  @ViewChildren('studiesHeader') studiesHeader: any = new QueryList();
  @ViewChild('mainText') mainText: any;

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
          this.shownText = data;
          this.animateJobs(0);
        } else {
          this.initiated = true;
          this.initiatedChange.emit(true);
          this.fullText = data;
          this.writeText().then(() =>{
          const tl = gsap.timeline();
          tl.to(this.mainText.nativeElement, {
            duration: 1,
            color: 'transparent',
          }).then(() =>{
            this.mainTextVisible = false;
            this.finishedIntro.emit()
            this.animateJobs(1000)
          })}
          );
        }
      });
  }

  clickOpen() {
    this.opened = !this.opened;
  }

  clickClose() {
    return new Promise((resolve, reject) => {
      console.log("close about me")
      this.collapseText();
      resolve('foo');
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
      setTimeout(() => {
          const tl = gsap.timeline();
          tl.to(this.jobsHeader.first.nativeElement, {
            duration: 1,
            color: 'white',
          }).then(() => this.animateJobCards()).then(() => this.animateStudies());
      }, timer);
    });
  }

  animateJobCards() {
    return new Promise((resolve, reject) => {
      const waitPromiseList = this.jobCards.map((card, index) =>
        card.showImage(index)
      );
      Promise.all(waitPromiseList).then(resolve);
    });
  }

  animateStudies() {
    const tl = gsap.timeline();
    tl.to(this.studiesHeader.first.nativeElement, {
      duration: 1,
      color: 'white',
    }).then(() => this.animateStudyCards());
  }

  animateStudyCards() {
    const waitPromiseList = this.studyCards.map((card, index) =>
      card.showImage(index)
    );
    Promise.all(waitPromiseList).then();
  }
}
