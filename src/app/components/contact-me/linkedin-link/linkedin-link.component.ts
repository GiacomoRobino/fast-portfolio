import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-linkedin-link',
  templateUrl: './linkedin-link.component.html',
  styleUrls: ['./linkedin-link.component.scss']
})
export class LinkedinLinkComponent {
  click(){
    window.open("https://www.linkedin.com/in/giacomo-robino-4196ba62/")
  }

}
