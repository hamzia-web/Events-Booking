import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FreeEventsComponent} from "./events/components/free-events/free-events.component";
import {ProEventsComponent} from "./events/components/pro-events/pro-events.component";
import {UploadEventsComponent} from "./events/components/upload-events/upload-events.component";
import {LoginComponent} from "./users/components/login/login.component";
import {RegisterComponent} from "./users/components/register/register.component";
import {HomeComponent} from "./root/components/home/home.component";
import {AuthGuard} from "./root/guards/auth.guard";

const routes: Routes = [
  { path: '' , component: HomeComponent},
  { path: 'events/free-events' , component: FreeEventsComponent},
  { path: 'events/pro-events' , component: ProEventsComponent, canActivate: [AuthGuard]},
  { path: 'events/upload-events' , component: UploadEventsComponent, canActivate: [AuthGuard]},
  { path: 'users/login' , component: LoginComponent},
  { path: 'users/register' , component: RegisterComponent},
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'events', loadChildren: () => import('./events/events.module').then(m => m.EventsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
