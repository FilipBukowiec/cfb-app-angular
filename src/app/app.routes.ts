import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AdminComponent } from './components/admin/admin.component';
import { NewsComponent } from './components/news/news.component';
import { MediaComponent } from './components/media/media.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { AboutComponent } from './components/about/about.component';
import { MainAppComponent } from './components/main-app/main-app.component';
import { GymScheduleComponent } from './components/gym-schedule/gym-schedule.component';

export const routes: Routes = [
  {
    path: 'homepage',
    component: HomepageComponent,
  },

  { path: 'start', component: MainAppComponent },

  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard],

    children: [
      {
        path: 'news',
        component: NewsComponent,
      },

      { path: 'gym-schedule', 
        component: GymScheduleComponent },

      {
        path: 'media',
        component: MediaComponent,
      },
    ],
  },

  {
    path: 'about',
    component: AboutComponent,
  },

  {
    path: '',
    redirectTo: '/homepage',
    pathMatch: 'full',
  },
];
