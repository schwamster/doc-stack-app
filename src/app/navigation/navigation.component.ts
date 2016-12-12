import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  user = "Not logged in";
  constructor(private userService: UserService) { }

  ngOnInit() {
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

}
