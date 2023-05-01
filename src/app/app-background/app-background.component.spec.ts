import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBackgroundComponent } from './app-background.component';

describe('AppBackgroundComponent', () => {
  let component: AppBackgroundComponent;
  let fixture: ComponentFixture<AppBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppBackgroundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
