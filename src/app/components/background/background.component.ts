import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent {
  inputOpacity = 1
  @Input() inputColor !: string;
  @Input() linkRadius !: number

}
