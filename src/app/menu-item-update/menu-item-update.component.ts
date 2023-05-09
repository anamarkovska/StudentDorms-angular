import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from '../domain/menu-item';
import { MenuItemService } from '../menu.service';
import { menuItemDto } from '../domain/menuItemDto';
import { MenuCategory } from '../domain/menu-category';
import { StudentDorm } from '../domain/student-dorm';

@Component({
  selector: 'app-menu-item-update',
  templateUrl: './menu-item-update.component.html',
  styleUrls: ['./menu-item-update.component.css']
})
export class MenuItemUpdateComponent implements OnInit {
  menuItemForm: FormGroup;
  menuItem: MenuItem | undefined;
  submitted = false;
  categories: MenuCategory[] = [];
  dorms: StudentDorm[] = [];
  id: number | undefined;
  studentDormId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private menuItemService: MenuItemService,
    private router: Router,
    private route: ActivatedRoute,
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
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!!;
    });
    // const id = this.route.snapshot.paramMap.get('id');
    if(this.id) {
      this.menuItemService.getMenuItemById(Number(this.id)).subscribe((menuItem: MenuItem) => {
        this.menuItem = menuItem;
        this.menuItemForm = this.formBuilder.group({
          name: [menuItem.name, Validators.required],
          categoryId: [menuItem.category.id, Validators.required],
          studentDormId: [menuItem.studentDorm.id, Validators.required],
          date: [menuItem.date, Validators.required],
          startTime: [menuItem.startTime, Validators.required],
          endTime: [menuItem.endTime, Validators.required]
        });
      });
      this.menuItemService.getAllCategories().subscribe(categories => {
        this.categories = categories;
      });

      this.menuItemService.getAllStudentDorms().subscribe(dorms => {
        this.dorms = dorms;
      });
    } else {
      this.router.navigate(['/menu']);
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.menuItemForm?.invalid) {
      return;
    }
    const menuItem = this.menuItemForm.value as menuItemDto
    if (this.menuItem && typeof this.menuItem.id === 'number') {
      menuItem.id = this.menuItem.id;
    }

    this.menuItemService.updateMenuItem(menuItem.id, menuItem).subscribe(() => {
      console.log('Menu item updated successfully!');
      this.router.navigate(['/menu','student-dorm',menuItem.studentDormId])
    }, error => {
      console.error(error);
    });
  }

  onCancel(): void {
    this.router.navigate(['/menu']);
  }

}
