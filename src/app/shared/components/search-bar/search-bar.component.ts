import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-bar',
  templateUrl: './search-bar.component.html',
  styles: [],
})
export class SearchBarComponent {
  @Input()
  public barPlaceholder: string = '';
  @Output()
  public onValue = new EventEmitter<string>();

  valueEmitter(keyword: string): void {
    this.onValue.emit(keyword);
  }
}
