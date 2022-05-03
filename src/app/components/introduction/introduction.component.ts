import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})
export class IntroductionComponent implements OnInit {

  private httpClient: HttpClient;
  public text: string = "";
  public shownText : string = "";
  private timeToWrite : number = 400.0;
  private timeToCollapse : number = 0.1;
  private specialCaractersMultipliers : {[key: string] : number} = {"." : 500.0, "," : 200.0}

  constructor(http: HttpClient) {
    this.httpClient = http;
  }

  ngOnInit(): void {
    this.httpClient.get('assets/copywrite/presentation.txt', {responseType: 'text'})
        .subscribe(data => {this.text = data;
        this.writeText();});
  }

  expandText(){
    this.shownText = this.text;
  }

  collapseText(timeToCollapse : number = -1){
    if(timeToCollapse === -1){
      timeToCollapse = this.timeToCollapse/this.text.length;      
    }
    if(this.shownText.length > 0){
      this.shownText = this.removeLastLetter(this.shownText);
      setTimeout(() => {
        this.collapseText(timeToCollapse);
      }, timeToCollapse);
   }
  }

  removeLastLetter(s: string){
    return s.substring(0, s.length - 1);
  }

  addOneLetter(destination: string, source: string){
    return destination + source.charAt(destination.length);
  }

  writeText(timeToWrite : number = -1){
    if(timeToWrite === -1){
      timeToWrite = this.timeToWrite/this.text.length;
    }
    if(this.shownText.length < this.text.length){
      this.shownText = this.addOneLetter(this.shownText, this.text);
      if(this.specialCaractersMultipliers[this.shownText.slice(-1)]){
        timeToWrite = timeToWrite * this.specialCaractersMultipliers[this.shownText.slice(-1)];
        console.log("multiply", timeToWrite);
        
      }
      else if(this.specialCaractersMultipliers[this.shownText.slice(-2, -1)]){
        timeToWrite = timeToWrite / this.specialCaractersMultipliers[this.shownText.slice(-2)];
        console.log("divide", timeToWrite);
      }
      setTimeout(() => {
        this.writeText(timeToWrite);
      }, timeToWrite);
   }
  
  }

}
