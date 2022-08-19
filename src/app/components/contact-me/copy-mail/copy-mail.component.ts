import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-copy-mail',
  templateUrl: './copy-mail.component.html',
  styleUrls: ['./copy-mail.component.scss'],
})
export class CopyMailComponent {
  public mail = 'robinogiacomo@gmail.com';

  click(){
    console.log("ok")
  }
}
