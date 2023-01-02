import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-write-mail',
  templateUrl: './write-mail.component.html',
  styleUrls: ['./write-mail.component.scss']
})
export class WriteMailComponent {
  public mailForm = new UntypedFormGroup({
    mail : new UntypedFormControl('')})

  click(){
    console.log("click")
  }
}