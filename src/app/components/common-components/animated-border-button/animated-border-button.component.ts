import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-animated-border-button',
  templateUrl: './animated-border-button.component.html',
  styleUrls: ['./animated-border-button.component.scss']
})
export class AnimatedBorderButtonComponent {
  @Input("text") text = "";

}
