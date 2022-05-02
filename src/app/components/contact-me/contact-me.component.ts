import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.css']
})
export class ContactMeComponent implements OnInit {
  @Output() openContactMe = new EventEmitter<boolean>();
  private opened = false;
  constructor() { }

  ngOnInit(): void {
  }

  clickOpenContactMe() {
    this.opened = !this.opened;
    this.openContactMe.emit(this.opened);
  }

}
