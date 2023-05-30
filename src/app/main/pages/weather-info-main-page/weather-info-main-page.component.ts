import { Component, OnInit } from '@angular/core';
import { MyWeatherService } from '../../services/my-weather.service';

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
  HumidityDesc!: string;

  // ! CONSTRUCTOR:
  constructor(
    public myWeatherService: MyWeatherService
  ) { }

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
    for (let i = 0; i < info.length; i = i + 8) {
      this.fetched5dayWeatherData.push(info[i]);
    }

    console.log(
      'five day forecast array with data => ',
      this.fetched5dayWeatherData
    );
  }

  getHumidityDesc() {
    const humidity = this.weatherNow.main.humidity;
    const messageElement = document.getElementById('humidity');
    if (messageElement) {
      if (humidity < 30) {
        messageElement.textContent = 'Humidity is low.';
      } else if (humidity >= 30 && humidity <= 70) {
        messageElement.textContent = 'Humidity is moderate.';
      } else {
        messageElement.textContent = 'Humidity is high.';
      }
    }
  }

  getWindDesc() {
    const wind = this.weatherNow.wind.speed;
    const messageElement = document.getElementById('wind');
    if (messageElement) {
      if (wind < 10) {
        messageElement.textContent = 'Wind is calm.';
      } else if (wind >= 10 && wind <= 20) {
        messageElement.textContent = 'Wind is light.';
      } else {
        messageElement.textContent = 'Wind is strong.';
      }
    }
  }

  getFeelDesc() {
    const feels = this.weatherNow.main.feels_like;
    const messageElement = document.getElementById('feels');
    if (messageElement) {
      if (feels < 10) {
        messageElement.textContent = 'Feels very cold.';
      } else if (feels >= 10 && feels < 20) {
        messageElement.textContent = 'Feels cool.';
      } else if (feels >= 20 && feels < 30) {
        messageElement.textContent = 'Feels warm.';
      } else {
        messageElement.textContent = 'Feels hot.';
      }
    }
  }

  getVisibilityDesc() {
    const visibility = this.weatherNow.visibility;
    const messageElement = document.getElementById('visibility');
    if (messageElement) {
      if (visibility < 1) {
        messageElement.textContent = 'Visibility is very low.';
      } else if (visibility >= 1 && visibility < 5) {
        messageElement.textContent = 'Visibility is low.';
      } else if (visibility >= 5 && visibility < 10) {
        messageElement.textContent = 'Visibility is moderate.';
      } else {
        messageElement.textContent = 'Visibility is high.';
      }

    }
  }
}

