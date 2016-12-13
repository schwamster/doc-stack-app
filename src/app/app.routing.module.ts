import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/observable';

import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './callback/callback.component';
import { UploadComponent } from './upload/upload.component';
import { SettingsComponent } from './settings/settings.component';
import { UserService, User } from './services/user.service';
import { AdminComponent } from './admin/admin.component';

class Permissions {
  canActivate(userService: UserService, roles: string[]): boolean {
    if (!userService.isLoggedOn) {
      return false;
    }
    let user = userService.user;
    console.log(` checking route for ${user.name}, req: ${JSON.stringify(roles)}, ex: ${JSON.stringify(user.roles)}`);

    for (let i = 0; i < roles.length; i++) {
      let roleToCheck = roles[i];
      if (!user.roles.find(r => r === roleToCheck)) {
        return false;
      }
    }

    return true;
  }
}

@Injectable()
class CanActivatePermissionCheck implements CanActivate {
  constructor(private permissions: Permissions, private userService: UserService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let roles: string[] = [];
    if (route.data && route.data["roles"]) {
      roles = route.data["roles"];
    }
    return this.permissions.canActivate(this.userService, roles);
  }
}

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