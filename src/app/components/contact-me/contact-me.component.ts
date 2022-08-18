import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss']
})
export class ContactMeComponent implements OnInit{
  @Output() openContactMe = new EventEmitter<boolean>();
  private opened = false;
  text = ""
  public message = "";
  public textareaValue = '';

  ngOnInit(): void {
    this.text = "contact me!"
  }

  clickOpen() {
    this.opened = !this.opened;
    console.log("click open contact me")
    this.openContactMe.emit(this.opened);
  }

  clickClose() {
    return new Promise((resolve, reject) =>{
      this.text = "";
      console.log("closing contact me");
      resolve("foo")
    })
  }
}
