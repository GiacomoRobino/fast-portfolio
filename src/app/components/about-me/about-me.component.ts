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

  clickOpen() {
    this.opened = !this.opened;
    console.log("click open about me")
  }

  clickClose() {
    return new Promise((resolve, reject) =>{
      this.text = "";
      console.log("closing about me");
      resolve("foo")
    })
  }

}
