import { Component } from '@angular/core';
import { MyWeatherService } from '../../../main/services/my-weather.service';

@Component({
  selector: 'shared-nav-bar',
  templateUrl: './nav-bar.component.html',
  styles: [],
})
export class NavBarComponent {
  constructor(public myWeatherService: MyWeatherService) {}

  timelineForOneDay: any = [];
  weatherNow: any;
  // * current time will return time and date of laptop:
  currentTime = new Date();
  // *holds city and location
  location: any;

  latitude?: number;
  longitude?: number;
  weatherData: any;

  fetched5dayWeatherData: any = [];


  ngOnInit(): void {
    // * checking if geolocation is possible by browser:
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log(`Latitude: ${this.latitude}, Longitude: ${this.longitude}`);

        this.myWeatherService
          // * passing in geo parameters:

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

    // this.myWeatherService.getWeatherForecast().subscribe((data) => {
    //   console.log('data from ngOnInit => ', data);
    //   this.getTodayForecast(data);
    // });
  }

  dateRange() {
    // * it will always return a range between 2 dates, that have a difference of 3 hours -1sec: 2:59
    const start = new Date();
    // ? error that i did not get:
    start.setHours(start.getHours() + start.getTimezoneOffset() / 60);
    // ? --------

    const to = new Date(start);
    to.setHours(to.getHours() + 2, to.getMinutes() + 59, to.getSeconds() + 59);
    return { start, to };
  }

  getTodayForecast(info: any) {
    this.location = info.city;
    // * we'll look through the list and slice the data so we can get just the first 8 elements:
    for (const forecast of info.list.slice(0, 8)) {
      console.log('forecast =>', forecast);
      // * here we are pushing specific info fro  list into timelineForOneDay:
      this.timelineForOneDay.push({
        time: forecast.dt_txt,
        temp: forecast.main.temp,
        icon: forecast.weather![0].icon,
        conditions: forecast.weather![0].main,
      });

      // * this const is assigned the dates provided to us by api, and then we'll change it to a timestamp:
      const apiDate = new Date(forecast.dt_txt).getTime();

      // * if our time(within our current computer time) is within 3 hours of the time provided by us by the api
      if (
        this.dateRange().start.getTime() <= apiDate &&
        this.dateRange().to.getTime() >= apiDate
      ) {
        // * if these two conditions satisfy, then we will assign data to property called weatherNow(line 13):
        this.weatherNow = forecast;
        console.log('weather now => ', this.weatherNow);
      }
    }
  }

  searchByCity(city: string) {
    console.log('capital being searched: ', city);

    this.myWeatherService.getWeatherByCityName(city).subscribe((data) => {
      this.weatherData = data;

      console.log('fetched info =>', data);
      // * in order to set values to "blank" again (because they where already populated on ng on init!!!):
      this.weatherNow = false;
      this.timelineForOneDay = [];
      this.fetched5dayWeatherData = [];

      this.getTodayForecast(this.weatherData);

      this.getFiveDayForecast(this.weatherData.list);
    });
  }

  getFiveDayForecast(info: any) {
    for (let i = 0; i < info.length; i = i + 8) {
      this.fetched5dayWeatherData.push(info[i]);
    }

    console.log(
      'five day forecast array with data => ',
      this.fetched5dayWeatherData
    );
  }
}

