import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LifeTimeActivity } from '../api/model/LifeStyleActivity';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  userName: string;
  pictureUrl: string;
  lifetimeSteps: number;
  lifetimeFloors: number;
  lifetimeDistance: number;

  constructor(private route: ActivatedRoute) {
    const lifetimeActivity: LifeTimeActivity = this.route.snapshot.data.lifetimeActivity;

    this.lifetimeSteps = lifetimeActivity.steps;
    this.lifetimeFloors = lifetimeActivity.floors;
    this.lifetimeDistance = lifetimeActivity.distance;

    const user = this.route.snapshot.data.user;
    this.userName = user.fullName;
    this.pictureUrl = user.avatar;
  }

}
