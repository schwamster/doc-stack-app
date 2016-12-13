import { Injectable } from '@angular/core';
import { UserManager, User as OidcUser } from 'oidc-client'
import { ReplaySubject } from 'rxjs/ReplaySubject';

export class User {
    name: string;
    roles: string[] = [];
}

@Injectable()
export class UserService {

  userManager: UserManager;
  private isLoggedOnSource = new ReplaySubject<boolean>(1);
  user: User;
  isLoggedOnItem$ = this.isLoggedOnSource.asObservable();
  isLoggedOn = false;

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
    this.setUser();
  }

  private setUser() {
    return this.userManager.getUser().then((user) => {
      if (user) {
        let internalUser = new User();
        internalUser.name = user.profile.name
        this.user = internalUser;
        this.changeLoggedOnState(true);
      }
      else {
        this.user = null;
        this.changeLoggedOnState(false);
      }
    });
  }

  login(): Promise<any> {
    return this.userManager.signinRedirect();
  }

  signinRedirectCallback(): Promise<User> {
    return this.userManager.signinRedirectCallback().then((user) => {
      return this.setUser();
    });;
  }

  changeLoggedOnState(loggedOn: boolean) {
    this.isLoggedOn = loggedOn;
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
    return this.userManager.signoutRedirect().then(()=>{
      this.user = null;
      this.changeLoggedOnState(false);
    });
  }


}
