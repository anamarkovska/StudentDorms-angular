import { Component, OnInit } from '@angular/core';
import { StudentDorm } from '../interface/student-dorm.model';
import { MenuItemService } from '../service/menu-item.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  studentDorms: StudentDorm[] = [];

  constructor(private menuItemService: MenuItemService, private route: ActivatedRoute) { }

  id: string | undefined;

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

}
