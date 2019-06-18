import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OverviewComponent } from './overview/overview.component';
import { LifetimeActivityResolverService } from './resolver/lifetime-activity-resolver.service';
import { UserResolverService } from './resolver/user-resolver.service';
import { HeartrateResolverService } from './resolver/heartrate-resolver.service';
import { HeartrateComponent } from './heartrate/heartrate.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'overview',
    component: OverviewComponent,
    resolve: { lifetimeActivity: LifetimeActivityResolverService, user: UserResolverService }
  },
  {
    path: 'activitiesHeartIntraday',
    component: HeartrateComponent,
    resolve: { heartRate: HeartrateResolverService }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
