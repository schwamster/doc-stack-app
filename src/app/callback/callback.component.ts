import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.signinRedirectCallback().then((user) => {
      console.log(user);
      // window.location = "index.html";
    }).catch(function (e) {
      console.error(e);
    });
  }

}
