import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDormListComponent } from './student-dorm-list.component';

describe('StudentDormListComponent', () => {
  let component: StudentDormListComponent;
  let fixture: ComponentFixture<StudentDormListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDormListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentDormListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
