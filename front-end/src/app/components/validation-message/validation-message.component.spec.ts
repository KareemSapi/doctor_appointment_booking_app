import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxValidationMessageComponent } from './validation-message.component';

describe('NgxValidationMessageComponent', () => {
  let component: NgxValidationMessageComponent;
  let fixture: ComponentFixture<NgxValidationMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxValidationMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxValidationMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
