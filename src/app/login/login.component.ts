import { Component, OnInit } from '@angular/core';
import { FitbitService } from '../api/fitbit.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loggedIn: boolean;

  constructor(private fitbitService: FitbitService) {
  }

  ngOnInit() {
    this.fitbitService.getUser()
      .subscribe(() => {
          this.loggedIn = true;
        },
        () => {
          this.loggedIn = false;
        });
  }

}
