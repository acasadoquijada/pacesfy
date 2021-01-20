import { Injectable } from '@angular/core';
import { Place } from './places.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places: Place[] = [
    new Place(
      "p1",
      "Manhattan Mansion",
      "In the heart of NY",
      "https://imgs.6sqft.com/wp-content/uploads/2014/06/21042533/Carnegie-Mansion-nyc.jpg",
      149.99),
      new Place(
        "p2",
        "Brooklyn Mansion",
        "In the heart of Brooklyn",
        "https://media.guestofaguest.com/t_article_content/gofg-media/2018/08/1/51322/df.jpg",
        169.99),
        new Place(
        "p3",
        "Seattle Mansion",
        "In the heart of Seattle",
        "https://static3.mansionglobal.com/production/media/article-images/5d1480cd59b9f72926e4c09548aa1824/large_S1-IX886_NINEEL_M_20210115101306.jpg?width=620&height=413",
        200.99),
  ];

  get places() {
    return [...this._places];
  }

  getPlace(placeId: string) {
    console.log(this._places);
    console.log(placeId);
    return {...this._places.find(p => p.id === placeId)};
  }

  constructor() { }
}
