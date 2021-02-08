import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Place } from './places.model';
import { take, map, tap, delay, switchMap } from "rxjs/operators"
import { HttpClient } from '@angular/common/http';
<<<<<<< Updated upstream
=======
import { PlaceLocation } from './location.model';
import { environment } from "../../environments/environment"
>>>>>>> Stashed changes

interface PlaceData {
  availableFrom: string,
  availableTo: string,
  description: string,
  imageUrl: string,
  price: number,
  title: string,
<<<<<<< Updated upstream
  userId: string
=======
  userId: string,
  location: PlaceLocation
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
    return this.http.get<PlaceData>()
=======
    return this.http.get<PlaceData>(`${environment.firebaseURL}offered-places/${placeId}.json`)
>>>>>>> Stashed changes
    .pipe(map(placeData => {
      return new Place(
        placeId, 
        placeData.title,
        placeData.description, 
        placeData.imageUrl, 
        placeData.price, 
        new Date(placeData.availableFrom), 
        new Date(placeData.availableTo), 
<<<<<<< Updated upstream
        placeData.userId)
=======
        placeData.userId,
        placeData.location)
>>>>>>> Stashed changes
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
    dateTo: Date,
    location: PlaceLocation) {

      let generatedId :string

      let generatedId :string

      const newPlace = new Place(
        Math.random().toString(),
        title,
        description,
        "https://media.guestofaguest.com/t_article_content/gofg-media/2018/08/1/51322/df.jpg",
        price,
        dateFrom,
        dateTo,
        this.authService.userId,
        location
      );

      return this.http.post<{name: string}>(`${environment.firebaseURL}offered-places.json`, {...newPlace, id: null})
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

<<<<<<< Updated upstream
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

=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        oldPlace.userId);
        
        return this.http.put(``,
=======
        oldPlace.userId,
        oldPlace.location
        );
        
        return this.http.put(`${environment.firebaseURL}offered-places/${placeId}.json`,
>>>>>>> Stashed changes
        {...updatedPlaces[updatedPlaceIndex], id:null})
      }),
      tap(() => {
        this._places.next(updatedPlaces);
      })
    )
  }

  constructor(private authService: AuthService, private http: HttpClient) {}

  fetchPlaces() {
<<<<<<< Updated upstream
    return this.http.get<{[key: string] : PlaceData }>("")
=======
    return this.http.get<{[key: string] : PlaceData }>(`${environment.firebaseURL}offered-places.json`)
>>>>>>> Stashed changes
    .pipe(map(resData => {
      const places = [];  
      
      for(const key in resData) {
        if(resData.hasOwnProperty(key)) {
<<<<<<< Updated upstream
          places.push(new Place(key, resData[key].title,resData[key].description,resData[key].imageUrl,resData[key].price, new Date(resData[key].availableFrom),new Date(resData[key].availableTo), resData[key].userId));
=======
          places.push(new Place(
            key,
            resData[key].title,
            resData[key].description,
            resData[key].imageUrl,
            resData[key].price,
            new Date(resData[key].availableFrom),
            new Date(resData[key].availableTo), 
            resData[key].userId,
            resData[key].location
          ));
>>>>>>> Stashed changes
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
