import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../interface/menu-item.model';
import { MenuItemService } from '../service/menu-item.service';
import { MenuCategory } from '../interface/menu-category.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {
  menuItems: MenuItem[] = [];
  menuCategories: MenuCategory[] | undefined;
  filteredMenuItems: MenuItem[] = [];
  id:string | undefined

  constructor(private menuItemService: MenuItemService, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.getAllMenuItems();
    this.getMenuCategories();
    this.route.paramMap.subscribe(params=>{
      this.id=params.get('id')!!;
    })
    this.loadMenuData()
  }

  loadMenuData(): void {
    const idNumber = +this.id!!;
    this.menuItemService.getAllMenuItems().subscribe(items => {
      this.filteredMenuItems = items.filter(item => item.studentDormId === idNumber);
      console.log(idNumber)
    });
  }

  getAllMenuItems() {
    this.menuItemService.getAllMenuItems()
      .subscribe(
        (data: MenuItem[]) => {
          this.menuItems = data;
          console.log(this.menuItems)
        },
        (error: any) => {
          console.error('Error fetching menu items:', error);
        }
      );
  }

  getMenuCategories(){
    this.menuItemService.getAllCategories()
      .subscribe(menuCategories => {
        this.menuCategories = menuCategories;
        console.log(this.menuCategories)
      });
  }

  getMenuItemsByCategory(category: number): any {
    this.menuItemService.getMenuItemsByCategory(category)
      .subscribe(menuItems => {
        this.menuItems = menuItems;

      });
  }


}
