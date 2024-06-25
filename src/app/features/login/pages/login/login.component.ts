import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/features/register/services/register.service';
import { AlertService } from 'src/shared/services/alert/alert.service';
import { TokenService } from 'src/shared/services/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public form: FormGroup;
  public submitted: boolean = false;
  public isPasswordVisible: boolean = false;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _registerSerivce: RegisterService,
    private _alertService: AlertService,
    private _tokenService: TokenService
  ) {
    this.form = this._fb.group({
      email: null,
      password: null,
    });
    this.addValidator();
  }

  addValidator() {
    this.f['email'].addValidators([Validators.required, Validators.email]);
    this.f['password'].addValidators(Validators.required);
  }

  togglePasswordVisible() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  get f() {
    return this.form.controls;
  }

  register(){
    this._router.navigateByUrl('register');
  }

  async login() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.getRawValue());
    try {
      await this._registerSerivce.Login(this.form.getRawValue()).then((res) => {
        this._tokenService.setToken(res.token);
      });
      await this._alertService.Global_Alert(
        null,
        'success',
        'Success',
        'Login Anda Berhasil'
      );
      this._router.navigateByUrl('home');
    } catch (error) {
      this._alertService.Global_Alert(null, 'error', 'Error', error);
    } finally {
      this.submitted = false;
    }
  }
}
