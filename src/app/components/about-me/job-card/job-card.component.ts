import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { job } from './model';
import { gsap, Power4 } from 'gsap';
import {DeviceCheckService} from '../../../services/device-check.service'

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss'],
})
export class JobCardComponent {
  @Input() job!: job;
  @Input() folder = "";
  @Output() updateJob = new EventEmitter();
  @Output() leaveJob = new EventEmitter();
  @ViewChild('image') image: any;
  public isNotPhoneCheck = this.deviceCheckService.isPhone(false)

  constructor(public deviceCheckService: DeviceCheckService){}
  showImage(index: number) {
    return new Promise<any>((resolve) => {
      setTimeout(() => {
        const tl = gsap.timeline();
        tl.to(this.image.nativeElement, {
          duration: 0.8,
          opacity: 1,
          ease: Power4.easeIn,
        }).then(resolve);
      }, index * 800);
    });
  }

  showJob(){
    this.updateJob.emit(this.job);
  }

  hideJob(){
    this.leaveJob.emit();
  }

  redirect(link: any){
    this.isNotPhoneCheck.subscribe(()=> 
    window.open(link))
  }
}
