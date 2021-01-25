import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  isLoading = false;

  constructor(private authServivce: AuthService, private router: Router, private loadingController: LoadingController) { }

  ngOnInit() {
  }

  onLogin() {
    this.isLoading = true;

    this.authServivce.login();
    this.loadingController.create({
      keyboardClose: true,
      message: "Logging in..."
    }).then(loadingEl => {
      loadingEl.present();
      setTimeout(() => {
        this.isLoading = false;
        this.loadingController.dismiss();
        this.router.navigateByUrl('/places/tabs/discover');

      }, 1000);
    });

  }

}
