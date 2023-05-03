import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NightLifeComponent } from './night-life.component';

describe('NightLifeComponent', () => {
  let component: NightLifeComponent;
  let fixture: ComponentFixture<NightLifeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NightLifeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NightLifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
