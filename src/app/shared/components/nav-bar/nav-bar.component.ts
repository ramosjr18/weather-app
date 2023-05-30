import { Component, OnInit } from '@angular/core';
import { SharedSearchService } from 'src/app/shared-search.service.service';


@Component({
  selector: 'nav-bar-page',
  templateUrl: './nav-bar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {
  constructor(private sharedSearchService: SharedSearchService) {}

  ngOnInit(): void {}

  searchByCity(city: string) {
    this.sharedSearchService.searchByCity(city);
  }
}