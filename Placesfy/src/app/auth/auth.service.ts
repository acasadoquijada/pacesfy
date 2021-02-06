import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userIsAuthenticated = true;

  private _userId = "ddd";
  constructor() { }

  login() {
    this.userIsAuthenticated = true;
  }

  logout() {
    this.userIsAuthenticated = false;
  }

  get userId() {
    return this._userId;
  }
}
