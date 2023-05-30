import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { NavbarComponent } from './components/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SearchBarComponent, Error404PageComponent, NavbarComponent],
  exports: [SearchBarComponent, NavbarComponent],
  imports: [CommonModule, RouterModule],
})
export class SharedModule {}
