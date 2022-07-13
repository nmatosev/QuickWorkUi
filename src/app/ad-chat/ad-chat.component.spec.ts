import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdChatComponent } from './ad-chat.component';

describe('AdMessagesComponent', () => {
  let component: AdChatComponent;
  let fixture: ComponentFixture<AdChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
