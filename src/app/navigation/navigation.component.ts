import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { USERSERVICE, IUserService, User } from '../services';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {
  isLoggedOn: boolean = false;
  isloggedOnSubscription: Subscription;
  notLoggedIn: string = "Not logged in";
  user: any;
  userLabel: string = this.notLoggedIn;
  private userService: IUserService;
  constructor(@Inject(USERSERVICE) userService: IUserService, private router: Router) {
    this.userService = userService;
  }

  ngOnInit() {
    this.isloggedOnSubscription = this.userService.isLoggedOnItem$
      .subscribe(isLoggedOn => {
        this.userService.getUser().then((user) => this.setUser(user));
      });

    this.userService.getUser().then((user) => this.setUser(user));
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.isloggedOnSubscription.unsubscribe();
  }

  setUser(user: User) {
    this.user = user
    if (user) {
      this.userLabel = user.name;
      this.isLoggedOn = user.isLoggedOn;
    }
    else {
      this.userLabel = this.notLoggedIn;
      this.isLoggedOn = false;
    }
  }

  login() {
    this.userService.login()
  }

  logout() {
    this.userService.logout();
  }

  api() {
    this.userService.api();
  }

  settings() {
    this.router.navigate(["settings"]);
  }

}
