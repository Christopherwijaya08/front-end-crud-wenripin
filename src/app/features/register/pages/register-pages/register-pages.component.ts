import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { RegisterModel } from '../../models/register.model';
import { DatePipe } from '@angular/common';
import { AlertService } from 'src/shared/services/alert/alert.service';

@Component({
  selector: 'app-register-pages',
  templateUrl: './register-pages.component.html',
  styleUrls: ['./register-pages.component.scss'],
})
export class RegisterPagesComponent implements OnInit {
  public birthDate: FormControl = new FormControl();
  public form: FormGroup;
  public isPasswordVisible: boolean = false;
  public isPasswordConfirmVisible: boolean = false;
  public submitted: boolean = false;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _registerService: RegisterService,
    private _datePipe: DatePipe,
    private _alertService: AlertService,
  ) {
    this.form = this._fb.group(new RegisterModel());
    this.addValidator();
  }

  addValidator() {
    this.f['email'].addValidators([Validators.required, Validators.email]);
    this.f['password'].addValidators(Validators.required);
    this.f['password_confirmation'].addValidators(Validators.required);
    this.f['username'].addValidators(Validators.required);
    this.f['birthDate'].addValidators(Validators.required);
  }

  get f() {
    return this.form.controls;
  }

  login() {
    this._router.navigateByUrl('login');
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  togglePasswordConfirmVisibility() {
    this.isPasswordConfirmVisible = !this.isPasswordConfirmVisible;
  }

  async register() {
    this.submitted = true;
    if (
      this.form.invalid ||
      this.f['password'].value !== this.f['password_confirmation'].value
    )
      return;

    let payload = this.form.getRawValue();
    const year = payload.birthDate.year;
    const month = payload.birthDate.month;
    const day = payload.birthDate.day;
    const isoString = new Date(year, month - 1, day).toISOString();

    payload.birthDate = isoString;

    console.log(payload);

    try {
      await this._registerService.Register(payload);
      await this._alertService.Global_Alert(null, 'success', 'Success', 'Register Anda Berhasil');
      this.login();
    } catch (error) {
      this._alertService.Global_Alert(null,'error', 'Error', error);
    } finally {
      this.submitted = false;
    }
  }

  ngOnInit(): void {}
}
