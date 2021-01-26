import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, ModalController, NavController } from '@ionic/angular';
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
  constructor(
    private route:ActivatedRoute,
    private navCrtl: NavController,
    private placesService: PlacesService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController) {


    }

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
    this.actionSheetCtrl.create({
      header: "Choose an Action",
      buttons: [
        {
          text: "Select Date",
          handler: () => {
            this.openBookingModal("select");
          }
        },
        {
          text: "Random Date",
          handler: () => {
            this.openBookingModal("random");
          }
        },
        {
          text: "Cancel",
          role: "cancel"
        }
    ]
    }).then(actionSheetEl => {
      actionSheetEl.present();
    });
  
  }

  openBookingModal(mode: "select"| "random") {
    console.log(mode);
    this.modalCtrl.create({
      component: CreateBookingComponent,
      componentProps: {selectedPlace: this.place, selectedMode: mode}
    }).then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    }).then(resultData => {
      console.log(resultData.data, resultData.role);
    })
  }

}
