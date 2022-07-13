import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-animated-border-button',
  templateUrl: './animated-border-button.component.html',
  styleUrls: ['./animated-border-button.component.scss']
})
export class AnimatedBorderButtonComponent {
  @Output() click = new EventEmitter();

  public handleClick() {
    this.click.emit();
}
}
