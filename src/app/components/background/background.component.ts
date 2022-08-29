import {Component, Input, OnInit, ViewChild} from '@angular/core';


@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent {
  inputOpacity = 0.9
  @Input() inputColor !: string;
  @Input() linkRadius !: number;
  @ViewChild("canvas") canvas : any;

  setParticles(particles : number){
    this.canvas.setParticles(particles)
  }
}
