import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-write-mail',
  templateUrl: './write-mail.component.html',
  styleUrls: ['./write-mail.component.scss']
})
export class WriteMailComponent {
  public mailForm = new FormGroup({
    mail : new FormControl('')})

  click(){
    console.log("click")
  }
}