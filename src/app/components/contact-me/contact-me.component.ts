import { Component, OnInit, Output, EventEmitter, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss']
})
export class ContactMeComponent implements OnInit, AfterViewInit{
  @Output() openContactMe = new EventEmitter<boolean>();
  @ViewChild('mainContainer') mainContainer: any;
  private opened = false;
  text = ""
  public message = "";
  public textareaValue = '';

  ngOnInit(): void {
    this.text = "contact me!"
  }

  ngAfterViewInit(){
    const tl = gsap.timeline();
    tl.to(this.mainContainer.nativeElement, {
      duration: 3.5,
      opacity: 1,
    })
  }

  clickOpen() {
    this.opened = !this.opened;
    this.openContactMe.emit(this.opened);
  }

  clickClose() {
    return new Promise((resolve, reject) =>{
      const tl = gsap.timeline();
      tl.to(this.mainContainer.nativeElement, {
        duration: 0.5,
        opacity: 0,
      }).then(()=>{
      this.text = "";
      resolve("foo")
      
    })
  }
    )}
}

