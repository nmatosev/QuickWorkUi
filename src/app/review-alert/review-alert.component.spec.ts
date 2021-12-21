import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewAlertComponent } from './review-alert.component';

describe('ReviewAlertComponent', () => {
  let component: ReviewAlertComponent;
  let fixture: ComponentFixture<ReviewAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
