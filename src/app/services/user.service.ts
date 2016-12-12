import { Injectable } from '@angular/core';
import { UserManager, User } from 'oidc-client'

@Injectable()
export class UserService {

  userManager: UserManager;

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
        return user;
      }
      else {
        return null;
      }
    });
  }

  login(): Promise<any>{
    return this.userManager.signinRedirect();
  }

  signinRedirectCallback(): Promise<User> {
    return this.userManager.signinRedirectCallback().then((user) => {
      if (user) {
        return user;
      }
      else {
        return null;
      }
    });;
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
    return this.userManager.signoutRedirect();
  }


}
