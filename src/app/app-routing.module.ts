import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuItemFormComponent } from './menu-item-form/menu-item-form.component';
import { MenuItemUpdateComponent } from './menu-item-update/menu-item-update.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard';
import { AuthGuardLogin } from './auth-login-guard';
import { StudentDormListComponent } from './student-dorm-list/student-dorm-list.component';
import { ForumComponent } from './forum/forum.component';



const routes: Routes = [
  { path: 'menu/student-dorm/:id', component: MenuItemComponent, canActivate: [AuthGuard] },
  { path: 'menu', component: StudentDormListComponent, canActivate: [AuthGuard] },
  { path: '', component: StudentDormListComponent, canActivate: [AuthGuard] },
  { path: 'menu/create', component: MenuItemFormComponent, canActivate: [AuthGuard] },
  { path: 'menu/edit/:id', component: MenuItemUpdateComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuardLogin] },
  { path: 'forum/:id', component: ForumComponent, canActivate: [AuthGuard] },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
