import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {

  @Output() openAboutMe = new EventEmitter<boolean>();

  private opened = false;

  constructor() { }

  ngOnInit(): void {
  }

  clickOpenContactMe() {
    this.opened = !this.opened;
    this.openAboutMe.emit(this.opened);
  }

}
