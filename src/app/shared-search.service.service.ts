import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedSearchService {
  private searchSubject = new Subject<string>();

  searchByCity(city: string) {
    this.searchSubject.next(city);
  }

  getSearchObservable() {
    return this.searchSubject.asObservable();
  }
}