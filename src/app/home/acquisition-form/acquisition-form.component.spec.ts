import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquisitionFormComponent } from './acquisition-form.component';

describe('AcquisitionFormComponent', () => {
  let component: AcquisitionFormComponent;
  let fixture: ComponentFixture<AcquisitionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcquisitionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcquisitionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
