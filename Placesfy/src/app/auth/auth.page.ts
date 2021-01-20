import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(private authServivce: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLogin() {
    this.authServivce.login();
    this.router.navigateByUrl('/places/tabs/discover');
  }

}
