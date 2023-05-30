import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mapbox-map',
  templateUrl: './mapbox-map.component.html',
  styleUrls: ['./mapbox-map.component.css']
})
export class MapboxMapComponent implements OnInit {
  ngOnInit(): void {
    const LONGITUDE = -73.985;
    const LATITUDE = 40.748;
    const ZOOM_LEVEL = 12;
    
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [LONGITUDE, LATITUDE],
      zoom: ZOOM_LEVEL
    });

    map.addControl(new mapboxgl.NavigationControl());
  }
}
