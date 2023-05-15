import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { StudentDorm } from '../domain/student-dorm';
import { Router } from '@angular/router';
import { MenuItemService } from '../menu.service';

@Component({
  selector: 'app-student-dorm-list',
  templateUrl: './student-dorm-list.component.html',
  styleUrls: ['./student-dorm-list.component.css']
})
export class StudentDormListComponent {
  studentDorms: StudentDorm[] = []
  ngOnInit() {
    this.menuService.getAllStudentDorms().subscribe((studentDorms: StudentDorm[]) => {
      this.studentDorms = studentDorms;
    });
  }
  constructor(private router: Router, private menuService: MenuItemService) { }

  onSelect(dorm: StudentDorm) {
    this.router.navigate(['/menu/student-dorm', dorm.id]);
  }
}
