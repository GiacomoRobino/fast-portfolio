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
  public message = "";
  public textareaValue = '';
  
  constructor() { }

  ngOnInit(): void {
    this.text = "contact me!"
  }
  doTextareaValueChange(ev: any) {
    try {
      this.textareaValue = ev.target.value;
    } catch(e) {
      console.info('could not set textarea-value');
    }
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
  sendMessage() {
    console.log("sending message");
  }

}
