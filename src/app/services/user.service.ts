import { Injectable } from '@angular/core';
import { UserManager, User as OidcUser } from 'oidc-client'
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { OpaqueToken } from '@angular/core';
import 'rxjs/add/operator/toPromise';

export class User {
  isLoggedOn: boolean = false;
  name: string = "not logged in";
  roles: string[] = [];
}

export let USERSERVICE = new OpaqueToken('user.service');

export interface IUserService {
  getUser(): Promise<User>;
  isLoggedOnItem$: Observable<boolean>;
  login(): Promise<any>;
  logout(): Promise<any>;
  api();
  signinRedirectCallback(): Promise<boolean>;
}

@Injectable()
export class UserService implements IUserService {

  private userManager: UserManager;
  private isLoggedOnSource = new ReplaySubject<boolean>(1);
  isLoggedOnItem$ = this.isLoggedOnSource.asObservable();

  //todo: config needs to come from outside
  config = {
    authority: "http://localhost:5000",
    client_id: "doc-stack-app",
    redirect_uri: "http://localhost:4200/callback",
    response_type: "id_token token",
    scope: "openid profile doc-stack-app-api",
    post_logout_redirect_uri: "http://localhost:4200/home",
  };

  constructor() {
    this.userManager = new UserManager(this.config);
  }

  getUser(): Promise<User> {
    return this.userManager.getUser().then((user) => {
      if (user) {
        let internalUser = new User();
        internalUser.name = user.profile.name;
        internalUser.isLoggedOn = true;
        return internalUser;
      }
      else {
        return null;
      }
    });

  }

  login(): Promise<any> {
    return this.userManager.signinRedirect();
  }

  signinRedirectCallback(): Promise<boolean> {
    return this.userManager.signinRedirectCallback().then(() => {
      return this.getUser().then((user) => {
        if (!user || !user.isLoggedOn) {
          this.changeLoggedOnState(false);
          return false;
        }
        this.changeLoggedOnState(true);
        return true;
      });
    });;
  }

  changeLoggedOnState(loggedOn: boolean) {
    this.isLoggedOnSource.next(loggedOn);
  }

  api() {
    //todo: replace with http!
    this.userManager.getUser().then(function (user) {
      var url = "http://localhost:5001/identity";

      var xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.onload = function () {
        console.log(xhr.status, JSON.parse(xhr.responseText));
      }
      xhr.setRequestHeader("Authorization", "Bearer " + user.access_token);
      xhr.send();
    });
  }

  logout(): Promise<any> {
    return this.userManager.signoutRedirect().then(() => {
      this.changeLoggedOnState(false);
    });
  }


}
