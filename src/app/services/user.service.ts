import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
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


  constructor( @Inject(DOCUMENT) private document) {
    //TODO: can document be null?
    let baseUri = document.baseURI;

    let config = {
      authority: process.env.IdentityAuthority || "http://localhost:3004",
      client_id: "doc-stack-app",
      redirect_uri: `${baseUri}/callback`,
      response_type: "id_token token",
      scope: "openid profile doc-stack-app-api",
      post_logout_redirect_uri: `${baseUri}/home`,
    };

    this.userManager = new UserManager(config);
  }

  getHostAndPort(baseUri: string): string {
    let regexp = new RegExp('^https?://([^/]*)/?.*$');
    let regexResult = regexp.exec(baseUri);
    console.log(JSON.stringify(regexResult));
    return regexResult[1];
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
