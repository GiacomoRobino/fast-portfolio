import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {
  text = "";

  private opened = false;

  constructor() { }

  ngOnInit(): void {
    this.text = "About me"
  }

  clickClose() {
    return new Promise((resolve, reject) =>{
      this.text = "";
      resolve("foo")
    })
  }

}
