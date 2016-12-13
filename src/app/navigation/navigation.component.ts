import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
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

  user: any;
  userName: string;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.isloggedOnSubscription = this.userService.isLoggedOnItem$
       .subscribe(isLoggedOn => {
         this.isLoggedOn = isLoggedOn;
         this.setUser();
        });
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.isloggedOnSubscription.unsubscribe();
  }

  setUser(){
    this.user = this.userService.user;
    if(this.user) {
      this.userName = this.user.name;
    }
    else {
      this.userName = "Not logged in"
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

  settings(){
    this.router.navigate(["settings"]);
  }

}
