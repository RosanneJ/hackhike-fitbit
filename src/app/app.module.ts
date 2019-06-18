import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { OverviewComponent } from './overview/overview.component';
import { LifetimeActivityResolverService } from './resolver/lifetime-activity-resolver.service';
import { UserResolverService } from './resolver/user-resolver.service';
import { HeartrateComponent } from './heartrate/heartrate.component';
import { HeartrateResolverService } from './resolver/heartrate-resolver.service';
import { HeartrateGraphComponent } from './heartrate/heartrate-graph/heartrate-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    LoginComponent,
    HeartrateComponent,
    HeartrateGraphComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    HeartrateResolverService,
    LifetimeActivityResolverService,
    UserResolverService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
