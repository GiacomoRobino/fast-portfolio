import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-direct-message',
  templateUrl: './direct-message.component.html',
  styleUrls: ['./direct-message.component.scss']
})
export class DirectMessageComponent {
  public message = "";
  public textareaValue = '';
  
  doTextareaValueChange(ev: any) {
    try {
      this.textareaValue = ev.target.value;
    } catch(e) {
      console.info('could not set textarea-value');
    }
  }
  
  sendMessage() {
    console.log("sending message");
  }
}
