import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';
import { AppRoutingModule } from './app.routing.module'

//import { UPLOAD_DIRECTIVES } from 'ng2-uploader/ng2-uploader';
import { Ng2UploaderModule } from 'ng2-uploader'
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { MapIteratorPipe } from './shared';

import '../styles.scss';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MapIteratorPipe
  ],
  imports: [
    Ng2UploaderModule,
    Ng2BootstrapModule,
    AlertModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
