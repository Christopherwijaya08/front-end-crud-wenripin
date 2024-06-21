import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  private token: string = null;

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }
}
