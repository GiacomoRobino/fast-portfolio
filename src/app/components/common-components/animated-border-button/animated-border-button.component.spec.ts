import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedBorderButtonComponent } from './animated-border-button.component';

describe('AnimatedBorderButtonComponent', () => {
  let component: AnimatedBorderButtonComponent;
  let fixture: ComponentFixture<AnimatedBorderButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimatedBorderButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedBorderButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
