import { Component, OnInit, Inject } from '@angular/core';
import { USERSERVICE, IUserService, LogonResult } from '../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
  private userService: IUserService;
  constructor( @Inject(USERSERVICE) userService: IUserService, private router: Router) {
    this.userService = userService;
  }

  ngOnInit() {
    this.userService.signinRedirectCallback().then((logonResult) => {
      if (logonResult.isLoggedOn) {
        if (logonResult.redirectRoute) {
          this.router.navigate([logonResult.redirectRoute]);
        }
        else {
          this.router.navigate(["upload"]);
        }
      }
    }).catch(function (e) {
      console.error(e);
    });
  }

}
