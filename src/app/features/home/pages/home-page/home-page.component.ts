import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/features/register/services/register.service';
import { AlertService } from 'src/shared/services/alert/alert.service';
import { TokenService } from 'src/shared/services/token/token.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  public username: string;
  public now: string;
  public isoStringDate = new Date().toISOString();

  constructor(
    private _tokenService: TokenService,
    private _registerService: RegisterService,
    private _alertService: AlertService,
    private _router: Router,
    private _datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getDetailUser();
    console.log(this.token);
    this.now = this._datePipe.transform(
      this.isoStringDate,
      'yyyy-MM-dd HH:mm:ss'
    );
  }

  get token() {
    return this._tokenService.getToken();
  }

  // getRightNowTime() {
  //   const date = new Date();
  //   const hours = this.padZero(date.getHours());
  //   const minutes = this.padZero(date.getMinutes());
  //   const seconds = this.padZero(date.getSeconds());
  //   this.now = `${hours}:${minutes}:${seconds}`;
  //   console.log(this.now);
  // }

  // padZero(num: number): string {
  //   return num < 10 ? '0' + num : num.toString();
  // }

  async logout() {
    try {
      await this._registerService.logout(this.now, this.token);
      await this._alertService.Global_Alert(null,'success','Success', 'Logout Berhasil');
      this._router.navigateByUrl('login');
    } catch (error) {
      this._alertService.Global_Alert(null, 'error', 'Error', error);
    }
  }

  async getDetailUser() {
    try {
      await this._registerService.GetDetailOfUser(this.token).then((res) => {
        this.username = res.data.username;
        console.log(this.username);
      });
    } catch (error) {
      await this._alertService.Global_Alert(null, 'error', 'Error', error);
      this._router.navigateByUrl('login');
    }
  }
}
