import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RegisterPagesComponent } from './pages/register-pages/register-pages.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: RegisterPagesComponent
  }
]

@NgModule({
  declarations: [
    RegisterPagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgbModule,
  ],
  providers: [
    DatePipe
  ]
})
export class RegisterModule { }
