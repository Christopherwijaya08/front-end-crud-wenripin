import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentCrudDataComponent } from './pages/student-crud-data/student-crud-data.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module';
import { ModalStudentComponent } from './components/modal-student/modal-student.component';

const routes: Routes = [
  {
    path: '',
    component: StudentCrudDataComponent
  }
]

@NgModule({
  declarations: [
    StudentCrudDataComponent,
    ModalStudentComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class StudentCrudModule { }
