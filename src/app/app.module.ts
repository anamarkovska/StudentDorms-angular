import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MenuItemFormComponent } from './menu-item-form/menu-item-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuItemUpdateComponent } from './menu-item-update/menu-item-update.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MenuItemComponent,
    MenuItemFormComponent,
    MenuItemUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
