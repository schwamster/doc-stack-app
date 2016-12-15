import { Component, OnInit, Inject } from '@angular/core';
import { USERSERVICE, IUserService } from '../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
  private userService: IUserService;
  constructor(@Inject(USERSERVICE) userService: IUserService, private router: Router) {
    this.userService = userService;
   }

  ngOnInit() {
    this.userService.signinRedirectCallback().then((isLoggedOn) => {
      if(isLoggedOn) {
        this.router.navigate(["upload"]);
      }
    }).catch(function (e) {
      console.error(e);
    });
  }

}
