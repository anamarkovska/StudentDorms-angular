import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuItemFormComponent } from './menu-item-form/menu-item-form.component';
import { MenuItemUpdateComponent } from './menu-item-update/menu-item-update.component';

const routes: Routes = [
  { path: 'menu/student-dorm/:id', component: MenuItemComponent },
  { path: 'menu', component: MenuItemComponent },
  { path: 'menu/create', component: MenuItemFormComponent},
  { path: 'menu/edit/:id', component: MenuItemUpdateComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
