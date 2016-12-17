import { NgModule, Injectable, Inject } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivatePermissionCheck, Permissions } from './permissions'

import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './callback/callback.component';
import { UploadComponent } from './upload/upload.component';
import { SettingsComponent } from './settings/settings.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'upload', component: UploadComponent, canActivate: [CanActivatePermissionCheck] },
  { path: 'callback', component: CallbackComponent },
  { path: 'admin', component: AdminComponent, canActivate: [CanActivatePermissionCheck], data: { roles: ["admin"] } },
  { path: 'settings', component: SettingsComponent, data: { roles: [] } },
  { path: 'about', loadChildren: './about/about.module#AboutModule' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [CanActivatePermissionCheck, Permissions]
})
export class AppRoutingModule { }
