import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuCategory } from '../domain/menu-category';
import { MenuItem } from '../domain/menu-item';
import { MenuItemService } from '../menu.service';
import { StudentDorm } from '../domain/student-dorm';
import { UserService } from '../user.service';
import { UserDto } from '../domain/user-dto';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {
  menuItems: MenuItem[] = [];
  menuCategories: MenuCategory[] = [];
  studentDormId: number | undefined;
  studentDorms : StudentDorm[] = []
  selectedDormId: number = 1;
  isAdmin:boolean=false;
  authenticatedUser: UserDto | undefined;

  constructor(private menuItemService: MenuItemService, private route: ActivatedRoute, private userService:UserService) {}
  onDormClick(dormId: number): void {
    this.selectedDormId = dormId;
    this.loadMenuData();
  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.selectedDormId = +params.get('id')!!;
      this.loadMenuData();

    });
    this.menuItemService.getAllCategories().subscribe((categories: MenuCategory[]) => {
      this.menuCategories = categories;
    });
    this.menuItemService.getAllStudentDorms().subscribe((studentDorms: StudentDorm[]) => {
      this.studentDorms = studentDorms;
    });
    this.userService.getAuthenticatedUser().subscribe(user => {
      this.authenticatedUser = user;
      this.checkAuthorization();
    });

  }

  loadMenuData(): void {
    this.menuItemService.getMenuItemsByStudentDorm(this.selectedDormId!!)
      .subscribe((items: MenuItem[]) => {
        this.menuItems = items;
      });
     }


deleteMenuItem(id: number): void {
  this.menuItemService.deleteMenuItem(id)
    .subscribe(() => {
      // remove the deleted item from the array of menu items displayed on the page
      this.menuItems = this.menuItems.filter(item => item.id !== id);
    });
}


checkAuthorization() {
  const userId = this.authenticatedUser!!.id; // Assuming authenticatedUser has an 'id' property
  this.userService.checkIfUserIsAdmin(userId!!).subscribe(isAdmin => {
    this.isAdmin = isAdmin;
    console.log(isAdmin)
  });
}
}




