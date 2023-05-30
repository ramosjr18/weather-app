import { Component, OnInit } from '@angular/core';
import { MyWeatherService } from '../../services/my-weather.service';
import { SharedSearchService } from 'src/app/shared-search.service.service';

@Component({
  selector: 'app-weather-info-main-page',
  templateUrl: './weather-info-main-page.component.html',
  styles: [],
})
export class WeatherInfoMainPageComponent implements OnInit {
  // ! ATTRIBUTES:
  timelineForOneDay: any = [];
  weatherNow: any;
  currentTime = new Date();
  location: any;
  latitude?: number;
  longitude?: number;
  weatherData: any;
  fetched5dayWeatherData: any = [];

  // ! CONSTRUCTOR:
  constructor(
    public myWeatherService: MyWeatherService,
    private sharedSearchService: SharedSearchService
  ) {}

  // ! ON INIT:
  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log(`Latitude: ${this.latitude}, Longitude: ${this.longitude}`);

        this.myWeatherService
          .getWeatherByGeoLocation(this.latitude, this.longitude)
          .subscribe((data) => {
            console.log('data from ngOnInit => ', data);
            this.weatherData = data;
            this.getTodayForecast(this.weatherData);
            this.getFiveDayForecast(this.weatherData.list);
          });
      });
    } else {
      console.log('This browser does not support geolocation.');
    }
  }

  // ! METHODS:
  dateRange() {
    const start = new Date();
    start.setHours(start.getHours() + start.getTimezoneOffset() / 60);
    const to = new Date(start);
    to.setHours(to.getHours() + 2, to.getMinutes() + 59, to.getSeconds() + 59);
    return { start, to };
  }

  getTodayForecast(info: any) {
    this.location = info.city;
    for (const forecast of info.list.slice(0, 7)) {
      console.log('forecast =>', forecast);
      this.timelineForOneDay.push({
        time: forecast.dt_txt,
        temp: forecast.main.temp,
        icon: forecast.weather![0].icon,
        conditions: forecast.weather![0].main,
      });

      const apiDate = new Date(forecast.dt_txt).getTime();

      if (
        this.dateRange().start.getTime() <= apiDate &&
        this.dateRange().to.getTime() >= apiDate
      ) {
        this.weatherNow = forecast;
        console.log('weather now => ', this.weatherNow);
      }
    }
  }

  getFiveDayForecast(info: any) {
    for (let i = 0; i < info.length; i = i + 6) {
      this.fetched5dayWeatherData.push(info[i]);
    }

    console.log(
      'five day forecast array with data => ',
      this.fetched5dayWeatherData
    );
  }
}
