import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivityHeartIntraDay, Heartrate } from '../api/model/Heartrate';

@Component({
  selector: 'app-heartrate',
  templateUrl: './heartrate.component.html',
  styleUrls: ['./heartrate.component.scss']
})
export class HeartrateComponent implements OnInit {
  heartRate: Heartrate;
  today: string;
  actvitiesIntraday: ActivityHeartIntraDay;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.heartRate = this.route.snapshot.data.heartRate;
    this.actvitiesIntraday = this.heartRate.activitiesHeartIntraday;
    this.today = this.formatDate(new Date(this.heartRate.activitiesHeartDay[0].dateTime));
  }

  private formatDate(date) {
    const monthNames = [
      'January', 'February', 'March',
      'April', 'May', 'June', 'July',
      'August', 'September', 'October',
      'November', 'December'
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

}
