import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdMessagesDetailsComponent } from './ad-messages-details.component';

describe('AdMessagesDetailsComponent', () => {
  let component: AdMessagesDetailsComponent;
  let fixture: ComponentFixture<AdMessagesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdMessagesDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdMessagesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
