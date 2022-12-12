import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppConfig } from './app.configuration';
import { CoreModule } from './core/core.module';
import { PublicModule } from './modules/public/public.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
import { LogicModule } from './logic/logic.module';
import { AuthModule } from './modules/auth/auth.module';
import { MatMenuModule } from '@angular/material/menu';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PublicModule,
    AuthModule,
    CoreModule,
    SharedModule,
    LogicModule,
    MatMenuModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule, // ToastrModule added
  ],
  providers: [
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
