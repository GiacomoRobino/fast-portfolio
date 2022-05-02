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

  constructor(http: HttpClient) {
    this.httpClient = http;
  }

  ngOnInit(): void {
    this.httpClient.get('assets/copywrite/presentation.txt', {responseType: 'text'})
        .subscribe(data => {this.text = data; this.shownText = this.text;});
  }

  expandText(){
    this.shownText = this.text;
  }

  collapseText(){
    this.shownText = "";
  }

}
