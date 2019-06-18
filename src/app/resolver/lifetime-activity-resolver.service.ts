import { Injectable } from '@angular/core';
import { FitbitService } from '../api/fitbit.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LifeTimeActivity } from '../api/model/LifeStyleActivity';

@Injectable()
export class LifetimeActivityResolverService implements Resolve<any> {
  constructor(private fitbitService: FitbitService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LifeTimeActivity> {
    return this.fitbitService.getLifetimeActivity().pipe();
  }

}
