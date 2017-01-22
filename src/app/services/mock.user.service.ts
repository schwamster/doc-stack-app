import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import { IUserService, User, LogonResult } from './user.service';
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

  login(redirect_url?: string): Promise<any> {
    this.user = { "name": "fritz", "isLoggedOn": true, "roles": [], "access_token": "" };
    return this.router.navigate(["callback"]);
  }

  signinRedirectCallback(): Promise<LogonResult> {
    this.changeLoggedOnState(true);
    return Promise.resolve({ isLoggedOn: true, redirectRoute:""});
  }

  changeLoggedOnState(loggedOn: boolean) {
    this.isLoggedOnSource.next(loggedOn);
  }

  api() {
    console.log("unspupported in mock");
  }

  logout(redirect_url?: string): Promise<any> {
    this.user = null;
    this.changeLoggedOnState(false);

    return Promise.resolve(true);
  }


}
