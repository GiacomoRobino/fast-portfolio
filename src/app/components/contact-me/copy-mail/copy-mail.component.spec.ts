import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyMailComponent } from './copy-mail.component';

describe('CopyMailComponent', () => {
  let component: CopyMailComponent;
  let fixture: ComponentFixture<CopyMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopyMailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
