import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EventDetailComponent } from './pages/event-detail/event-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'event/:id', component: EventDetailComponent },
  { path: '**',redirectTo: ''}
];
