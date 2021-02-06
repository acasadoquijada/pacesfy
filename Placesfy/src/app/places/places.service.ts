import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Place } from './places.model';
import { take, map, tap, delay, switchMap } from "rxjs/operators"
import { HttpClient } from '@angular/common/http';

interface PlaceData {
  availableFrom: string,
  availableTo: string,
  description: string,
  imageUrl: string,
  price: number,
  title: string,
  userId: string
}


@Injectable({
  providedIn: 'root'
})



export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([]);


  get places() {
    return this._places.asObservable();
  }

  getPlace(placeId: string) {

    return this.http.get<PlaceData>()
    .pipe(map(placeData => {
      return new Place(
        placeId, 
        placeData.title,
        placeData.description, 
        placeData.imageUrl, 
        placeData.price, 
        new Date(placeData.availableFrom), 
        new Date(placeData.availableTo), 
        placeData.userId)
    }))
    
    // return this.places.pipe(take(1), map(places => {
    //   return {...places.find(p => p.id === placeId)};
    // }));
  }

  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date) {

      let generatedId :string

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

      return this.http.post<{name: string}>(, {...newPlace, id: null})
      .pipe(
        switchMap(resData => {
          generatedId = resData.name;
          return this.places;
        }),
        take(1),
        tap(places => {
          newPlace.id = generatedId;
          this._places.next(places.concat(newPlace));
        })
      );

  }

  updatePlace(placeId: string, title: string, description: string) {
 
    let updatedPlaces: Place[];

    return this.places.pipe(
      take(1), 
      switchMap(places => {
        if(!places || places.length <= 0) {
          return this.fetchPlaces();
        } else {
          return of(places);
        }
    }),
    switchMap(places => {
      const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
      const updatedPlaces = [...places];
      const oldPlace = updatedPlaces[updatedPlaceIndex];
      console.log(oldPlace);
      updatedPlaces[updatedPlaceIndex] = new Place(
        oldPlace.id,
        title,
        description,
        oldPlace.imageUrl,
        oldPlace.price, 
        oldPlace.availableFrom, 
        oldPlace.availableTo,
        oldPlace.userId);
        
        return this.http.put(``,
        {...updatedPlaces[updatedPlaceIndex], id:null})
      }),
      tap(() => {
        this._places.next(updatedPlaces);
      })
    )
  }

  constructor(private authService: AuthService, private http: HttpClient) {}

  fetchPlaces() {
    return this.http.get<{[key: string] : PlaceData }>("")
    .pipe(map(resData => {
      const places = [];  
      
      for(const key in resData) {
        if(resData.hasOwnProperty(key)) {
          places.push(new Place(key, resData[key].title,resData[key].description,resData[key].imageUrl,resData[key].price, new Date(resData[key].availableFrom),new Date(resData[key].availableTo), resData[key].userId));
        }
      }
      return places;
    }),
    tap(places => {
      this._places.next(places);
    })
    )
  }
}
