import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentDorm } from '../domain/student-dorm';
import { MenuItemService } from '../menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  studentDorms: StudentDorm[] = [];

  constructor(private menuItemService: MenuItemService, private route: ActivatedRoute, private router: Router) { }

  selectedDorm: string | undefined;

  ngOnInit() {
    this.getAllStudentDorms();
  }

  getAllStudentDorms() {
    this.menuItemService.getAllStudentDorms()
      .subscribe(
        (data: StudentDorm[]) => {
          this.studentDorms = data;
          console.log(this.studentDorms);
        },
        (error: any) => {
          console.error('Error fetching student dorms:', error);
        }
      );
  }

  onDormSelected() {
    if (this.selectedDorm) {
      this.router.navigate(['/menu/student-dorm', this.selectedDorm]);
    }
  }
}
