import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MenuItemFormComponent } from './menu-item-form/menu-item-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuItemUpdateComponent } from './menu-item-update/menu-item-update.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './security/AuthInterceptor';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { AppBackgroundComponent } from './app-background/app-background.component';
import { EducationComponent } from './education/education.component';
import { StudentDormListComponent } from './student-dorm-list/student-dorm-list.component';
import { Location } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MenuItemComponent,
    MenuItemFormComponent,
    MenuItemUpdateComponent,
    RegisterComponent,
    LoginComponent,
    AppBackgroundComponent,
    EducationComponent,
    StudentDormListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },Location
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
