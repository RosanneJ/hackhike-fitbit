import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { FitbitService } from '../api/fitbit.service';
import { Heartrate } from '../api/model/Heartrate';

@Injectable()
export class HeartrateResolverService implements Resolve<any> {
  constructor(private fitbitService: FitbitService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Heartrate> {
    return this.fitbitService.getLatestHeartrate();
  }

}
