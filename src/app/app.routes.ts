import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AdminComponent } from './components/admin/admin.component';
import { MediaComponent } from './components/media/media.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { AboutComponent } from './components/about/about.component';
import { MainAppComponent } from './components/main-app/main-app.component';
import { AdminGymScheduleComponent } from './components/admin-gym-schedule/admin-gym-schedule.component';
import { NewsComponent } from './components/news/news.component';
import { GymScheduleComponent } from './components/gym-schedule/gym-schedule.component';
import { AdminNewsComponent } from './components/admin-news/admin-news.component';

export const routes: Routes = [
  {
    path: 'homepage',
    component: HomepageComponent,
  },

  { path: 'start', component: MainAppComponent },


  {
    path: 'news',
    component: NewsComponent,
  },

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
        path: 'admin-news',
        component: AdminNewsComponent,
      },

      {
        path: 'admin-gym-schedule',
        component: AdminGymScheduleComponent,
      },

      {
        path: 'media',
        component: MediaComponent,
      },
    ],
  },

  {
    path: 'gym-schedule',
    component: GymScheduleComponent,
  }
  ,
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
