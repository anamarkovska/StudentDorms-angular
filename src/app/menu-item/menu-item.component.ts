import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuCategory } from '../domain/menu-category';
import { MenuItem } from '../domain/menu-item';
import { MenuItemService } from '../menu.service';
import { StudentDorm } from '../domain/student-dorm';

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
  constructor(private menuItemService: MenuItemService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.studentDormId = +params.get('id')!!;
      this.loadMenuData();
    });
    this.menuItemService.getAllCategories().subscribe((categories: MenuCategory[]) => {
      this.menuCategories = categories;
    });
    this.menuItemService.getAllStudentDorms().subscribe((studentDorms: StudentDorm[]) => {
      this.studentDorms = studentDorms;
    });
  }

  loadMenuData(): void {
    this.menuItemService.getMenuItemsByStudentDorm(this.studentDormId!!)
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
} 
    // ngOnInit() {
    //   // this.getAllMenuItems();
    //   this.getMenuCategories();
    //   this.route.paramMap.subscribe(params=>{
    //     this.studentDormId=+params.get('id')!!;
    //   })
    //   this.loadMenuData()
    // }
  
    // loadMenuData(): void {
    //   const idNumber = +this.studentDormId!!;
    //   this.menuItemService.getAllMenuItems().subscribe((items: any[]) => {
    //     this.filteredMenuItems = items.filter(item => item.studentDorm.id === idNumber);
    //     console.log(idNumber)
    //   });
    // }
  
    // getAllMenuItems() {
    //   this.menuItemService.getAllMenuItems()
    //     .subscribe(
    //       (data: MenuItem[]) => {
    //         this.menuItems = data;
    //         console.log(this.menuItems)
    //       },
    //       (error: any) => {
    //         console.error('Error fetching menu items:', error);
    //       }
    //     );
    // }
  
    // getMenuCategories(){
    //   this.menuItemService.getAllCategories()
    //     .subscribe((menuCategories: MenuCategory[] | undefined) => {
    //       this.menuCategories = menuCategories;
    //       console.log(this.menuCategories)
    //     });
    // }
  
    // getMenuItemsByCategory(category: number): any {
    //   this.menuItemService.getMenuItemsByCategory(category)
    //     .subscribe((menuItems: MenuItem[]) => {
    //       this.menuItems = menuItems;
  
    //     });
    // }
  
  
  

