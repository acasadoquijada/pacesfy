import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';
import { Place } from '../../places.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {

  place: Place;
  constructor(private route:ActivatedRoute, private navCrtl: NavController, private placesService: PlacesService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has("placeId")) {
        this.navCrtl.navigateBack("/places/tabs/offers");
        return;
      }

      this.place = this.placesService.getPlace(paramMap.get("placeId"));
      console.log(paramMap.get("placeId"));
    });
  }

  onBookPlace() {
    this.modalCtrl.create({
      component: CreateBookingComponent,
      componentProps: {selectedPlace: this.place}
    }).then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    }).then(resultData => {
      console.log(resultData.data, resultData.role);
    })
    // this.navCrtl.navigateBack("/places/tabs/discover");
  
  }

}
