import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { IUserService, User } from './user.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class MockUserService implements IUserService {
  private user: User;
  protected isLoggedOnSource = new ReplaySubject<boolean>(1);
  isLoggedOnItem$ = this.isLoggedOnSource.asObservable();

  constructor(private router: Router) { }

  getUser(): Promise<User> {
    return Promise.resolve(this.user);
  }

  login(): Promise<any> {
    this.user = { "name": "fritz", "isLoggedOn": true, "roles": [] };
    return this.router.navigate(["callback"]);
  }

  signinRedirectCallback(): Promise<boolean> {
    this.changeLoggedOnState(true);
    return Promise.resolve(true);
  }

  changeLoggedOnState(loggedOn: boolean) {
    this.isLoggedOnSource.next(loggedOn);
  }

  api() {
    console.log("unspupported in mock");
  }

  logout(): Promise<any> {
    this.user = null;
    this.changeLoggedOnState(false);

    return Promise.resolve(true);
  }


}
