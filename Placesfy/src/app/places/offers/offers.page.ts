import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { Place } from '../places.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  loadedOffers: Place[];

  constructor(private placesService: PlacesService, private router: Router) { }

  ngOnInit() {
    this.loadedOffers = this.placesService.places;
  }

  onEdit(offerId: string, slidingEl: IonItemSliding) {
    slidingEl.close();

//    this.router.navigate(['/', 'places', 'tabs', 'offers', offerId]);
    //"['/', 'places', 'tabs', 'offers', offer.id]"
  }

}
