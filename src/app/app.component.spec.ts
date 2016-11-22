/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import {APP_BASE_HREF} from '@angular/common';
import { AppRoutingModule } from './app.routing.module'
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { Ng2UploaderModule } from 'ng2-uploader'

import { MapIteratorPipe } from './shared';

describe('App: Web', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, HomeComponent, MapIteratorPipe
      ],
      imports: [ AppRoutingModule, Ng2BootstrapModule, Ng2UploaderModule ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    });
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
