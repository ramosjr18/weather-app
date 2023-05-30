import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainModule } from './main/main.module';
import { SharedModule } from './shared/shared.module';
import { WeatherInfoMainPageComponent } from './main/pages/weather-info-main-page/weather-info-main-page.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, MainModule, SharedModule],
  providers: [WeatherInfoMainPageComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
