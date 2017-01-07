import { NgModule, Injectable, Inject } from '@angular/core';
import { Routes, RouterModule, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { USERSERVICE, IUserService, User } from './services';
import { Observable } from 'rxjs/Observable';

export class Permissions {
  canActivate(userService: IUserService, roles: string[], routeUrl: string): Promise<boolean> {
    return userService.getUser().then((user) => {
      if (!user || !user.isLoggedOn) {
        this.redirectToLogon(routeUrl, userService);
        return false;
      }
      console.log(` checking route for ${user.name}, req: ${JSON.stringify(roles)}, ex: ${JSON.stringify(user.roles)}`);
      for (let i = 0; i < roles.length; i++) {
        let roleToCheck = roles[i];
        if (!user.roles.find(r => r === roleToCheck)) {
          console.log(`Route ${routeUrl} forbidden. Redirecting to login page`);
          userService.logout(routeUrl);  
          //this.redirectToLogon(routeUrl, userService);
          return false;
        }
      }
      return true;
    })
  }

  redirectToLogon(redirectUrl: string, userService: IUserService) {
    console.log(`Route ${redirectUrl} forbidden for unauthorized access. Redirecting to login page`);
    userService.login(redirectUrl);
  }

}

@Injectable()
export class CanActivatePermissionCheck implements CanActivate {
  private userService: IUserService;
  constructor(private permissions: Permissions, @Inject(USERSERVICE) userService: IUserService) {
    this.userService = userService;
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let roles: string[] = [];
    if (route.data && route.data["roles"]) {
      roles = route.data["roles"];
    }
    return this.permissions.canActivate(this.userService, roles, route.url.toString());
  }
}