import { Injectable } from '@angular/core';
import { FitbitService } from '../api/fitbit.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../api/model/User';

@Injectable()
export class UserResolverService implements Resolve<any> {
  constructor(private fitbitService: FitbitService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    return this.fitbitService.getUser().pipe();
  }

}
