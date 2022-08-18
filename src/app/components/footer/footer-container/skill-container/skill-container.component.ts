import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-skill-container',
  templateUrl: './skill-container.component.html',
  styleUrls: ['./skill-container.component.scss']
})
export class SkillContainerComponent {
  @Input() skill = "";

  getSkillSource(): string {
    return "assets/scalableVectorGraphics/skills/" + this.skill + ".svg";
  }

}
