import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuItemFormComponent } from './menu-item-form/menu-item-form.component';
import { MenuItemUpdateComponent } from './menu-item-update/menu-item-update.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard';
import { AuthGuardLogin } from './auth-login-guard';


const routes: Routes = [
  { path: 'menu/student-dorm/:id', component: MenuItemComponent, canActivate: [AuthGuard] },
  { path: 'menu/student-dorm', redirectTo: 'menu/student-dorm/1', pathMatch: 'full'}, // default route
  { path: 'menu', component: MenuItemComponent, canActivate: [AuthGuard] },
  { path: '', component: MenuItemComponent, canActivate: [AuthGuard] },
  { path: 'menu/create', component: MenuItemFormComponent, canActivate: [AuthGuard]},
  { path: 'menu/edit/:id', component: MenuItemUpdateComponent, canActivate: [AuthGuard]},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent, canActivate: [AuthGuardLogin]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
