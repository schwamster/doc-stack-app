/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NotEnoughRightsComponent } from './not-enough-rights.component';

describe('NotEnoughRightsComponent', () => {
  let component: NotEnoughRightsComponent;
  let fixture: ComponentFixture<NotEnoughRightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotEnoughRightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotEnoughRightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
