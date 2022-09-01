import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { filter } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceCheckService {

  constructor(private responsive: BreakpointObserver) {
  
  }

  isPhone(valid: boolean){
    return this.responsive.observe(Breakpoints.Handset).pipe(filter((element: any) => element.matches == valid))
  }
  
}