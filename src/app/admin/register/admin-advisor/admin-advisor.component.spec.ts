import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdvisorComponent } from './admin-advisor.component';

describe('AdminAdvisorComponent', () => {
  let component: AdminAdvisorComponent;
  let fixture: ComponentFixture<AdminAdvisorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAdvisorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAdvisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
