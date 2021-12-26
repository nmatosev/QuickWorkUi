import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdMessagesComponent } from './ad-messages.component';

describe('AdMessagesComponent', () => {
  let component: AdMessagesComponent;
  let fixture: ComponentFixture<AdMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdMessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
