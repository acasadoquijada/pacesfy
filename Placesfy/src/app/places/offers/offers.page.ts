import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Place } from '../places.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {

  loadedOffers: Place[];
  isLoading = false;
  private placesSub: Subscription;

  constructor(private placesService: PlacesService, private router: Router) { }

  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe(places =>  {
      this.loadedOffers = places
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.placesService.fetchPlaces().subscribe(() => {
      this.isLoading = false;
    });
  }

  onEdit(offerId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit', offerId]);
  }

  ngOnDestroy() {
    if(this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }

}
