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
  @ViewChildren('jobsHeaderText') jobsHeaderText: any = new QueryList();
  @ViewChild('mainText') mainText: any;
  @ViewChild('authorText') authorText: any;
  @ViewChild('mainContainer') mainContainer: any;
  @ViewChildren('jobDescription')
  jobDescription: any = new QueryList();

  public shownJob = { name: '', description: '', period: {start: '', end: ''} };
  private httpClient: HttpClient;
  private opened = false;
  private fullText = '';
  public shownText = '';
  private timeToWrite = 1500.0;
  private interruptWriting = false;
  private specialCaractersMultipliers: { [key: string]: number } = {
    '.': 50.0,
    ',': 40.0,
    '\n': 100.0
  };
  public jobs: job[] = jobsConfig;
  public studies: study[] = studiesConfig;
  public mainTextVisible = true;
  public author = '';

  constructor(http: HttpClient) {
    this.httpClient = http;
  }

  ngOnInit(): void {
    this.httpClient
      .get('assets/copywrite/quotes.txt', { responseType: 'text' })
      .subscribe((data) => {
        if (this.initiated) {
          this.returnToPageAnimation();
        } else {
          this.initiated = true;
          this.initiatedChange.emit(true);
          this.fullText = this.getRandomQuote(data);
          this.writeText().then(() => {
            const tl = gsap.timeline();
            tl.to(this.authorText.nativeElement, { duration: 1, opacity: 1})
            .then(()=>
            tl.to(this.mainText.nativeElement, {
              duration: 1,
              color: 'transparent',
            }))
            .then(()=>
            tl.to(this.authorText.nativeElement, {
              duration: 0.5,
              color: 'transparent',
            }))
            .then(() => {
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

  getRandomQuote(data: string){
    const splittedData =  data.split("\n");
    const randomIndex = Math.floor(Math.random()*splittedData.length)
    const quote = splittedData[randomIndex].split("|");
    this.author = quote[1].split("\r")[0].trim();
    return quote[0] + ".";

  }

  writeText(timeToWrite = -1): any {
    return new Promise<void>((resolve, reject) => {
      if (timeToWrite === -1) {
        const textLengthMultiplier = (this.fullText.split(" ").length)/ 15
        timeToWrite = (this.timeToWrite * textLengthMultiplier) / this.fullText.length;
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
            tl.to(this.jobsHeaderText.first.nativeElement, {
              duration: 0.6,
              color: 'white',
            });
            tl.to(this.jobsHeaderText.last.nativeElement, {
              duration: 0.5,
              color: 'white',
            })
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
      this.shownJob = job;
    };
  }
}
