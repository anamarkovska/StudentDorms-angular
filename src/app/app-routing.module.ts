import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuItemComponent } from './menu-item/menu-item.component';

const routes: Routes = [
  { path: 'menu/student-dorm/:id', component: MenuItemComponent },
  { path: 'menu', component: MenuItemComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
