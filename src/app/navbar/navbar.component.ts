import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentDorm } from '../domain/student-dorm';
import { MenuItemService } from '../menu.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  studentDorms: StudentDorm[] = [];

  constructor(private menuItemService: MenuItemService, private route: ActivatedRoute, private router: Router,private authService: UserService) { }

  selectedDorm: string | undefined;

  getAuthService(): UserService {
    return this.authService;
  }
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
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
