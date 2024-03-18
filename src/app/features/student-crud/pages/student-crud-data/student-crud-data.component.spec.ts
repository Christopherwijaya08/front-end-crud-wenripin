import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCrudDataComponent } from './student-crud-data.component';

describe('StudentCrudDataComponent', () => {
  let component: StudentCrudDataComponent;
  let fixture: ComponentFixture<StudentCrudDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentCrudDataComponent]
    });
    fixture = TestBed.createComponent(StudentCrudDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
