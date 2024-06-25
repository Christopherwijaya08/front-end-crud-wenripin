import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private tokenKey = 'authToken';
  constructor() { }
  private token: string = null;

  setToken(token: string) {
    // this.token = token;
    localStorage.setItem(this.tokenKey, `${token}`);
  }

  getToken(): string {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken(){
    localStorage.removeItem(this.tokenKey);
    this.token = null;
  }
}
