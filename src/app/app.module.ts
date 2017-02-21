import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { AlertModule } from 'ng2-bootstrap';
import { AppRoutingModule } from './app.routing.module'

//import { UPLOAD_DIRECTIVES } from 'ng2-uploader/ng2-uploader';
import { Ng2UploaderModule } from 'ng2-uploader'
import { MapIteratorPipe } from './shared';

import '../styles.scss';
import { NavigationComponent } from './navigation/navigation.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './callback/callback.component';
import { UploadComponent } from './upload/upload.component';
import { SettingsComponent } from './settings/settings.component';
import { AdminComponent } from './admin/admin.component';

//services
import { USERSERVICE, MockUserService, UserService } from './services';
import { NotEnoughRightsComponent } from './not-enough-rights/not-enough-rights.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MapIteratorPipe,
    NavigationComponent,
    CallbackComponent,
    UploadComponent,
    SettingsComponent,
    AdminComponent,
    NotEnoughRightsComponent
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
  providers: [
    { provide: USERSERVICE, useClass: UserService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
