/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Ng2UploaderModule } from 'ng2-uploader'
import { MapIteratorPipe } from '../shared';
import { APP_BASE_HREF } from '@angular/common';
import { UploadComponent } from './upload.component';
import { USERSERVICE, MockUserService } from '../services';
import { Router } from '@angular/router';

describe('UploadComponent', () => {
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadComponent, MapIteratorPipe ],
      imports: [Ng2UploaderModule],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/'},
        { provide: Router, useValue: null },
        { provide: USERSERVICE, useClass: MockUserService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
