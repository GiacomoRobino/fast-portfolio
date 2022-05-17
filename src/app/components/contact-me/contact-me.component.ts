import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.css']
})
export class ContactMeComponent implements OnInit{
  @Output() openContactMe = new EventEmitter<boolean>();
  private opened = false;
  text = ""
  constructor() { }

  ngOnInit(): void {
    this.text = "contact me!"
  }
  clickOpenContactMe() {
    this.opened = !this.opened;
    this.openContactMe.emit(this.opened);
  }

  clickClose() {
    return new Promise((resolve, reject) =>{
      this.text = "";
      resolve("foo")
    })
  }

}
