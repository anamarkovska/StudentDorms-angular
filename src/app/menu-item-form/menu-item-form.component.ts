import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuCategory } from '../domain/menu-category';
import { StudentDorm } from '../domain/student-dorm';
import { MenuItemService } from '../menu.service';
import { MenuItem } from '../domain/menu-item';
import { menuItemDto } from '../domain/menuItemDto';

@Component({
  selector: 'app-menu-item-form',
  templateUrl: './menu-item-form.component.html',
  styleUrls: ['./menu-item-form.component.css']
})
export class MenuItemFormComponent implements OnInit {
  menuItemForm: FormGroup;
  categories: MenuCategory[] = [];
  dorms: StudentDorm[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private menuItemService: MenuItemService
  ) {
    this.menuItemForm = this.formBuilder.group({
      name: ['', Validators.required],
      categoryId: [null, Validators.required],
      studentDormId: [null, Validators.required],
      date: [new Date(), Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.menuItemForm = this.formBuilder.group({
      name: ['', Validators.required],
      categoryId: [null, Validators.required],
      studentDormId: [null, Validators.required],
      date: [new Date(), Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });

    this.menuItemService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });

    this.menuItemService.getAllStudentDorms().subscribe(dorms => {
      this.dorms = dorms;
    });
  }

  onSubmit(): void {
    if (this.menuItemForm) {
      const menuItem = this.menuItemForm.value as menuItemDto;
      menuItem.categoryId = Number(menuItem.categoryId);
      menuItem.studentDormId = Number(menuItem.studentDormId);

      console.log(JSON.stringify(this.menuItemForm.value))
      console.log(menuItem.studentDormId)
      console.log(typeof menuItem.studentDormId);

      this.menuItemService.createMenuItem(menuItem).subscribe(() => {
        // Handle success
        console.log('Menu item created!');
      }, error => {
        // Handle error
        console.error(error);
      });
    }
  }
  
}