import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalStudentComponent } from './modal-student.component';

describe('ModalStudentComponent', () => {
  let component: ModalStudentComponent;
  let fixture: ComponentFixture<ModalStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalStudentComponent]
    });
    fixture = TestBed.createComponent(ModalStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
