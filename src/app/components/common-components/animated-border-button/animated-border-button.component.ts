import { Component, Output, Input, EventEmitter, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { gsap, Power4 } from 'gsap';

@Component({
  selector: 'app-animated-border-button',
  templateUrl: './animated-border-button.component.html',
  styleUrls: ['./animated-border-button.component.scss']
})
export class AnimatedBorderButtonComponent implements AfterViewInit {
  @Output() click = new EventEmitter();
  @ViewChild("rectangle") rectangle : any;
  @ViewChild("content") content : any;


  ngAfterViewInit(){
    const tl = gsap.timeline();
    tl.to(this.rectangle.nativeElement, {
      duration: 1,
      strokeOpacity: 1,
    })

    tl.to(this.rectangle.nativeElement, {
      duration: 1,
      color: "white",
    })
  }

  public handleClick() {
    
    this.click.emit();
}
}
