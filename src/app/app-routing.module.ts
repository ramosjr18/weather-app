import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './main/pages/about-page/about-page.component';
import { ContactPageComponent } from './main/pages/contact-page/contact-page.component';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { TeamComponent } from './main/pages/team-page/team.component';
import { TechComponent } from './main/pages/tech/tech.component';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
  },
  {
    path: 'about-page',
    component: AboutPageComponent,
  },
  {
    path: 'team',
    component: TeamComponent,
  },
  {
    path: 'contact-page',
    component: ContactPageComponent,
  },
  {
    path: 'app-tech-page',
    component: TechComponent,
  },
  {
    path: '404',
    component: Error404PageComponent,
  },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
