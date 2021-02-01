import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Place } from './places.model';
import { take, map, tap, delay } from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})



export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([
    new Place(
      "p1",
      "Manhattan Mansion",
      "In the heart of NY",
      "https://imgs.6sqft.com/wp-content/uploads/2014/06/21042533/Carnegie-Mansion-nyc.jpg",
      149.99,
      new Date("2019-01-01"),
      new Date("2019-01-11"),
      "abc"
      ),
      new Place(
        "p2",
        "Brooklyn Mansion",
        "In the heart of Brooklyn",
        "https://media.guestofaguest.com/t_article_content/gofg-media/2018/08/1/51322/df.jpg",
        169.99,
        new Date("2020-01-01"),
        new Date("2020-11-11"),
        "abc"
        ),
        new Place(
        "p3",
        "Seattle Mansion",
        "In the heart of Seattle",
        "https://static3.mansionglobal.com/production/media/article-images/5d1480cd59b9f72926e4c09548aa1824/large_S1-IX886_NINEEL_M_20210115101306.jpg?width=620&height=413",
        200.99,
        new Date("2020-03-15"),
        new Date("2020-05-11"),
        "bcf"
        ),
  ]);


  get places() {
    return this._places.asObservable();
  }

  getPlace(placeId: string) {
    return this.places.pipe(take(1), map(places => {
      return {...places.find(p => p.id === placeId)};
    }));
  }

  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date) {

      const newPlace = new Place(
        Math.random().toString(),
        title,
        description,
        "https://media.guestofaguest.com/t_article_content/gofg-media/2018/08/1/51322/df.jpg",
        price,
        dateFrom,
        dateTo,
        this.authService.userId
      );

      return this.places.pipe(take(1), delay(1000), tap(places => {
        this._places.next(places.concat(newPlace));
      }));
  }

  updatePlace(placeId: string, title: string, description: string) {
    return this.places.pipe(take(1), delay(1000), tap(places => {
      const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
      const updatedPlaces = [...places];
      const oldPlace = updatedPlaces[updatedPlaceIndex];
      updatedPlaces[updatedPlaceIndex] = new Place(oldPlace.id, title, description, oldPlace.imageUrl, oldPlace.price, oldPlace.availableFrom, oldPlace.availableTo, oldPlace.userId);
      this._places.next(updatedPlaces);
    }));
  }

  constructor(private authService: AuthService) { }
}
