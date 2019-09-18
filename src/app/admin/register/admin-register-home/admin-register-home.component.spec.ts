import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegisterHomeComponent } from './admin-register-home.component';

describe('AdminRegisterHomeComponent', () => {
  let component: AdminRegisterHomeComponent;
  let fixture: ComponentFixture<AdminRegisterHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRegisterHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRegisterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
