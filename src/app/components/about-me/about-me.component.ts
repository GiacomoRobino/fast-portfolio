import { Component, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { JobCardComponent } from './job-card/job-card.component';
import { forwardRef } from '@angular/core';
import jobsConfig from '../../../assets/carreer/companies/companies.json';
import { job } from './job-card/model';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css'],
})
export class AboutMeComponent implements OnInit {
  @Input() initiated : boolean = false;
  @Output() initiatedChange : EventEmitter<any> = new EventEmitter();
  @ViewChildren(forwardRef(() => JobCardComponent)) jobCards : QueryList<JobCardComponent> = new QueryList()

  private httpClient: HttpClient;
  private opened = false;
  private fullText = '';
  public shownText: string = '';
  private timeToWrite: number = 400.0;
  private interruptWriting: boolean = false;
  private specialCaractersMultipliers: { [key: string]: number } = {
    '.': 500.0,
    ',': 200.0,
  };
  public jobCardsVisible = false;
  public jobs : job[] = jobsConfig;

  constructor(http: HttpClient) {
    this.httpClient = http;
  }

  ngOnInit(): void {

    
    this.httpClient
      .get('assets/copywrite/presentation.txt', { responseType: 'text' })
      .subscribe((data) => {
        if(this.initiated){
          this.shownText = data;
          this.animateJobCards(0)
        }
        else{
        this.initiated = true;
        this.initiatedChange.emit(true)
        this.fullText = data;
        this.writeText().then(()=>this.animateJobCards(1000))
        }
        
      });
  }

  clickOpen() {
    this.opened = !this.opened;
    console.log('click open about me');
  }

  clickClose() {
    return new Promise((resolve, reject) => {
      this.collapseText();
      resolve('foo');
    });
  }


  writeText(timeToWrite: number = -1, functionPassed: any = null): any{
    return new Promise<void>((resolve,reject) => {
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
      resolve()
    }
  })
  }

  collapseText() {
    this.shownText = '';
    this.interruptWriting = true;
  }

  animateJobCards(timer: number) {
    setTimeout(() => {
      this.jobCardsVisible = true;
      console.log(this.jobCards)
    }, timer);
  }

  removeLastLetter(s: string) {
    return s.substring(0, s.length - 1);
  }

  addOneLetter(destination: string, source: string) {
    return destination + source.charAt(destination.length);
  }
}
